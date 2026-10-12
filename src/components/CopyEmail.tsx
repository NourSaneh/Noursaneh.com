import { useEffect, useState } from "react";
import { getEmail } from "@/data/site";

export default function CopyEmail() {
  // Empty during server render, so the address never appears in the HTML source.
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setEmail(getEmail()), []);

  async function copy() {
    if (!email) return;
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
      {email ? (
        <a href={`mailto:${email}`} className="px-1 py-2 text-[22px] font-extrabold break-all no-underline hover:underline">
          {email}
        </a>
      ) : (
        <span className="px-1 py-2 text-[22px] font-extrabold">Email me ✉</span>
      )}
      <button
        type="button"
        onClick={copy}
        disabled={!email}
        className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-[10px] px-4.5 text-[15px] font-bold text-white transition-colors disabled:opacity-60 ${
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
