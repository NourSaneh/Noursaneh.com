import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex max-w-full flex-wrap items-center gap-2 self-start rounded-2xl border-[3px] border-ink bg-white py-2 pr-2 pl-5 shadow-pop">
      <a href={`mailto:${email}`} className="px-1 py-2 text-[22px] font-extrabold break-all no-underline hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-[10px] px-4.5 text-[15px] font-bold text-white transition-colors ${
          copied ? "bg-live" : "bg-ink"
        }`}
      >
        {copied ? (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
        <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}
