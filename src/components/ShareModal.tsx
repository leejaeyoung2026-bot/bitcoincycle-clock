"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { CyclePhase } from "@/types/cycle";
import { generatePng, downloadPng } from "@/lib/generate-png";
import { formatCycleTime, getPhaseLabel } from "@/lib/cycle-engine";
import ClockCard from "./ClockCard";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayInCycle: number;
  totalDays: number;
  phase: CyclePhase;
  progress: number;
  price: number | null;
  indicators: { key: string; value: number; label: string }[];
}

function getTodayFilename(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `bitcoincycle-clock-${yyyy}-${mm}-${dd}.png`;
}

type DownloadState = "idle" | "loading" | "done" | "error";
type CopyState = "idle" | "copied";

export default function ShareModal({
  isOpen,
  onClose,
  dayInCycle,
  totalDays,
  phase,
  progress,
  price,
  indicators,
}: ShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const clockTime = formatCycleTime(progress);
  const phaseLabel = getPhaseLabel(phase);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Reset transient states when modal opens
  useEffect(() => {
    if (isOpen) {
      setDownloadState("idle");
      setCopyState("idle");
    }
  }, [isOpen]);

  async function handleDownload() {
    if (downloadState === "loading") return;
    const el = cardRef.current;
    if (!el) return;

    setDownloadState("loading");
    try {
      const blob = await generatePng(el, 2);
      downloadPng(blob, getTodayFilename());
      setDownloadState("done");
      setTimeout(() => setDownloadState("idle"), 2500);
    } catch {
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 2500);
    }
  }

  function handleCopyLink() {
    const url = typeof window !== "undefined" ? window.location.href : "https://cycle.vibed-lab.com";
    navigator.clipboard.writeText(url).then(() => {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1500);
    });
  }

  function handleShareX() {
    const shareUrl = "https://cycle.vibed-lab.com";
    const text = `Bitcoin Cycle Clock: ${clockTime} out of 12:00 — Day ${dayInCycle} of ~${totalDays.toLocaleString()} (${phaseLabel}) 🕐\n\nCheck where we are in the cycle:`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  }

  if (!isOpen) return null;

  const downloadLabel =
    downloadState === "loading"
      ? "Generating..."
      : downloadState === "done"
      ? "Downloaded!"
      : downloadState === "error"
      ? "Failed — try again"
      : "Download PNG";

  const copyLabel = copyState === "copied" ? "✓ Copied!" : "Copy Link";

  return (
    <>
      {/* Offscreen ClockCard for capture — always rendered when modal is open */}
      <ClockCard
        ref={cardRef}
        dayInCycle={dayInCycle}
        totalDays={totalDays}
        phase={phase}
        price={price}
        indicators={indicators}
        clockTime={clockTime}
      />

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="modal-backdrop"
        aria-modal="true"
        role="dialog"
        aria-label="Share dialog"
      >
        {/* Modal card — stop click propagation so backdrop click doesn't close it */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal-panel"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close share dialog"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink-muted)",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14 4L4 14M4 4l10 10"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Title */}
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Share This Moment
          </h2>

          {/* Subtitle */}
          <p
            style={{
              margin: "0 0 24px",
              fontSize: "13px",
              color: "var(--ink-muted)",
              lineHeight: 1.5,
            }}
          >
            {clockTime} out of 12:00 &mdash; {phaseLabel}
          </p>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Download PNG */}
            <button
              onClick={handleDownload}
              disabled={downloadState === "loading"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "12px 20px",
                borderRadius: "var(--radius-md)",
                border: "none",
                background:
                  downloadState === "done"
                    ? "var(--gauge-cold)"
                    : downloadState === "error"
                    ? "var(--gauge-extreme)"
                    : "var(--accent)",
                color: downloadState === "done" || downloadState === "error" ? "#fff" : "#0D1117",
                fontSize: "14px",
                fontWeight: 600,
                cursor: downloadState === "loading" ? "wait" : "pointer",
                opacity: downloadState === "loading" ? 0.75 : 1,
                transition: "background 0.2s, opacity 0.2s",
                fontFamily: "var(--font-sans)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 2v8m0 0L5 7m3 3l3-3M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {downloadLabel}
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                minWidth: "140px",
                padding: "12px 20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                background: copyState === "copied" ? "var(--bg-inset)" : "transparent",
                color: copyState === "copied" ? "var(--ink)" : "var(--ink)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
                fontFamily: "var(--font-sans)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.5 9.5a3.5 3.5 0 0 0 4.95 0l2-2a3.5 3.5 0 0 0-4.95-4.95l-1 1"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 6.5a3.5 3.5 0 0 0-4.95 0l-2 2a3.5 3.5 0 0 0 4.95 4.95l1-1"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
              {copyLabel}
            </button>

            {/* Share on X */}
            <button
              onClick={handleShareX}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "12px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#0F0F0F",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {/* X (Twitter) logo */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8.89 6.36 14.3.5h-1.28L8.32 5.53 4.6.5H.5l5.68 8.26L.5 14.5h1.28l4.97-5.78 3.96 5.78H14.5L8.89 6.36Zm-1.76 2.05-.58-.82L2.2 1.45h1.98l3.71 5.3.57.82 4.82 6.88H11.3L7.13 8.41Z" />
              </svg>
              Share on X
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
