import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
        style={{ fontFamily: "var(--font-serif)" }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-2xl font-bold mt-10 mb-3"
        style={{ fontFamily: "var(--font-serif)" }}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-lg font-semibold mt-6 mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
        {...props}
      />
    ),
    p: (props) => (
      <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink-muted)" }} {...props} />
    ),
    ul: (props) => (
      <ul className="text-base leading-relaxed mb-4 pl-6 list-disc space-y-1" style={{ color: "var(--ink-muted)" }} {...props} />
    ),
    ol: (props) => (
      <ol className="text-base leading-relaxed mb-4 pl-6 list-decimal space-y-1" style={{ color: "var(--ink-muted)" }} {...props} />
    ),
    a: (props) => (
      <a style={{ color: "var(--cycle-accent)" }} {...props} />
    ),
    strong: (props) => (
      <strong style={{ color: "var(--ink)" }} {...props} />
    ),
    table: (props) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse" {...props} />
      </div>
    ),
    th: (props) => (
      <th className="text-left p-2 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--ink)" }} {...props} />
    ),
    td: (props) => (
      <td className="p-2 border-b" style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }} {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="pl-4 border-l-2 italic mb-4" style={{ borderColor: "var(--cycle-accent)", color: "var(--ink-muted)" }} {...props} />
    ),
    hr: () => (
      <hr className="my-8" style={{ borderColor: "var(--border)" }} />
    ),
    ...components,
  };
}
