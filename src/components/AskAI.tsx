import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { localAnswer } from "@/data/assistant";

type Message = { from: "bot" | "me"; text: string };

const suggestions = ["What have you built?", "Your stack?", "Are you available?"];
const endpoint = (import.meta.env.PUBLIC_ASK_ENDPOINT as string | undefined) ?? "/api/ask";

/** Asks the live AI (/api/ask); falls back to offline answers if it's unavailable or out of quota. */
async function ask(question: string, history: Message[]): Promise<string> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        // Skip the canned greeting; send recent turns so follow-ups make sense.
        history: history.slice(1).map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text })),
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { answer?: string };
      if (data.answer) return data.answer;
    }
  } catch {
    /* fall through to the offline answer */
  }
  // Small delay so the offline reply feels conversational.
  await new Promise((r) => setTimeout(r, 450 + Math.random() * 400));
  return localAnswer(question);
}

export default function AskAI() {
  const inputId = useId();
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm trained on Nour's work. Ask me about projects, skills or availability." },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Grow the box with the text so long questions stay fully visible.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || thinking) return;
    setDraft("");
    const history = messages;
    setMessages((m) => [...m, { from: "me", text: question }]);
    setThinking(true);
    const answer = await ask(question, history);
    setMessages((m) => [...m, { from: "bot", text: answer }]);
    setThinking(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(draft);
  }

  const asked = new Set(messages.filter((m) => m.from === "me").map((m) => m.text));
  const remaining = suggestions.filter((s) => !asked.has(s)).slice(0, 2);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border-[2.5px] border-ink bg-white p-4 shadow-[5px_5px_0_var(--color-cobalt)]">
      <div className="flex items-center justify-between gap-2">
        <p className="m-0 text-lg font-extrabold">Ask my AI anything</p>
        <span className="flex items-center gap-1.5 font-mono text-xs">
          <span aria-hidden="true" className="block size-2 animate-pulse rounded-full bg-live" />
          live
        </span>
      </div>

      <div ref={logRef} role="log" aria-live="polite" className="flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
        {messages.map((m, i) =>
          m.from === "bot" ? (
            <p
              key={i}
              className="m-0 max-w-[92%] self-start rounded-[12px_12px_12px_4px] border-2 border-ink bg-cream px-2.5 py-2 text-sm leading-snug"
            >
              {m.text}
            </p>
          ) : (
            <p
              key={i}
              className="m-0 max-w-[85%] self-end rounded-[12px_12px_4px_12px] border-2 border-ink bg-sun px-2.5 py-2 text-sm font-semibold leading-snug"
            >
              {m.text}
            </p>
          ),
        )}
        {thinking && (
          <p className="m-0 self-start rounded-[12px_12px_12px_4px] border-2 border-ink bg-cream px-3 py-2 font-mono text-sm">
            <span className="sr-only">Thinking</span>
            <span aria-hidden="true" className="inline-flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce [animation-delay:120ms]">•</span>
              <span className="animate-bounce [animation-delay:240ms]">•</span>
            </span>
          </p>
        )}
      </div>

      {remaining.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {remaining.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              disabled={thinking}
              className={`cursor-pointer rounded-full border-2 border-ink px-2.5 py-1.5 text-[13px] font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60 ${
                i === 0 ? "bg-sun" : "bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex gap-1.5 rounded-xl border-2 border-ink p-1">
        <label htmlFor={inputId} className="sr-only">
          Your question
        </label>
        <textarea
          ref={inputRef}
          id={inputId}
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends, Shift+Enter adds a new line.
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void send(draft);
            }
          }}
          placeholder="Type a question…"
          autoComplete="off"
          className="max-h-32 min-w-0 flex-1 resize-none self-center bg-transparent p-2 text-sm leading-snug break-words outline-none"
        />
        <button
          type="submit"
          aria-label="Send question"
          disabled={thinking || !draft.trim()}
          className="flex h-10 w-11 shrink-0 self-end cursor-pointer items-center justify-center rounded-lg bg-ink text-white transition-opacity disabled:opacity-50"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}
