export async function generatePng(
  element: HTMLElement,
  scale: number = 2
): Promise<Blob> {
  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(element, {
    scale,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  });
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to generate PNG"));
      },
      "image/png",
      1.0
    );
  });
}

export function downloadPng(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
