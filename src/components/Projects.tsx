import { useState } from "react";
import { clientWork, filters, projects, type Category, type Project } from "@/data/projects";

type Filter = "all" | Category;

const Chip = ({ children }: { children: string }) => (
  <span className="rounded-full border-2 border-ink px-2.5 py-1 font-mono text-[13px]">{children}</span>
);

function Badge({ badge }: { badge: NonNullable<Project["badge"]> }) {
  return (
    <span className={`inline-block rounded-lg border-2 border-ink px-2.5 py-1 font-mono text-xs text-ink ${badge.className}`}>
      {badge.label}
    </span>
  );
}

function Featured({ p }: { p: Project }) {
  return (
    <article className="card flex flex-wrap overflow-hidden bg-white shadow-pop-lg">
      <div className={`flex min-w-0 flex-[999_1_560px] items-center justify-center border-ink p-5 sm:p-8 max-[1000px]:border-b-[3px] min-[1001px]:border-r-[3px] ${p.media.color}`}>
        <div className="w-full overflow-hidden rounded-xl border-[2.5px] border-ink bg-white">
          <div className="flex items-center gap-1.5 border-b-[2.5px] border-ink bg-cream px-3 py-2.5">
            <span aria-hidden="true" className="block size-2.5 rounded-full border-2 border-ink bg-coral" />
            <span aria-hidden="true" className="block size-2.5 rounded-full border-2 border-ink bg-sun" />
            <span aria-hidden="true" className="block size-2.5 rounded-full border-2 border-ink bg-mint" />
            <span className="ml-2 font-mono text-[13px]">{p.media.domain}</span>
          </div>
          {p.media.image ? (
            <img src={p.media.image} alt={`${p.title} screenshot`} loading="lazy" className="block h-[340px] w-full object-cover object-top" />
          ) : (
            <div className="flex h-[260px] items-center justify-center p-6 text-center text-[17px] font-bold sm:h-[340px]">{p.media.placeholder}</div>
          )}
        </div>
      </div>
      <div className="relative flex min-w-0 flex-[1_1_400px] flex-col gap-4 p-6 sm:p-9">
        {p.badge && (
          <div className="self-start">
            <Badge badge={p.badge} />
          </div>
        )}
        <h3 className="m-0 text-[44px] leading-none font-extrabold tracking-[-0.02em]">{p.title}</h3>
        <p className="m-0 text-lg leading-normal">{p.summary}</p>
        {p.highlights && (
          <ul className="m-0 list-disc pl-5 text-base leading-relaxed">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener" className="btn-pop bg-cobalt px-5 py-3 text-base text-white">
              Live site ↗
            </a>
          )}
          {p.caseStudy && (
            <a href={p.caseStudy} className="btn-pop bg-white px-5 py-3 text-base">
              Case study →
            </a>
          )}
          {p.code && (
            <a href={p.code} className="px-1 py-3 text-base font-bold">
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Card({ p }: { p: Project }) {
  const dark = p.dark;
  return (
    <article
      className={`card flex min-w-0 flex-[1_1_320px] flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${
        dark ? "bg-ink text-cream shadow-[6px_6px_0_var(--color-cobalt)]" : "bg-white shadow-pop"
      }`}
    >
      <div className={`relative flex h-[200px] items-center justify-center border-b-[3px] border-ink p-6 text-center text-base font-bold ${p.media.color}`}>
        {dark ? (
          <div className="rounded-[16px_16px_16px_4px] border-[2.5px] border-ink bg-white px-3.5 py-2.5 text-[15px] font-bold text-ink shadow-pop-sm">
            {p.media.placeholder}
          </div>
        ) : p.media.image ? (
          <img src={p.media.image} alt={`${p.title} screenshot`} loading="lazy" className="absolute inset-0 size-full object-cover" />
        ) : (
          p.media.placeholder
        )}
        {p.badge && (
          <span className="absolute top-3.5 right-3.5">
            <Badge badge={p.badge} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="m-0 text-[28px] font-extrabold">{p.title}</h3>
        <p className="m-0 flex-1 text-base leading-normal">{p.summary}</p>
        <p className="m-0 font-mono text-[13px]">{p.stack.join(" · ")}</p>
        {p.url || p.code ? (
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener" className="text-base font-extrabold">
                Live site ↗
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener" className="text-base font-extrabold">
                Code ↗
              </a>
            )}
          </div>
        ) : (
          <a href={p.caseStudy ?? "#"} className={`text-base font-extrabold ${dark ? "text-cream!" : ""}`}>
            {dark ? "Try it →" : "View project →"}
          </a>
        )}
      </div>
    </article>
  );
}

function ClientWork() {
  return (
    <div className="card flex flex-wrap items-center justify-between gap-6 bg-sun px-6 py-7 shadow-pop sm:px-8">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
        <p className="m-0 font-mono text-[13px]">{clientWork.label}</p>
        <p className="m-0 text-[26px] leading-tight font-extrabold">{clientWork.title}</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {clientWork.logos.map((logo, i) => (
          <span key={i} className="rounded-[10px] border-2 border-ink bg-white px-4.5 py-3.5 text-sm font-bold">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((p) => filter === "all" || p.categories.includes(filter as Category));
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);
  const showClient = filter === "all" || filter === "client";

  return (
    <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="sticker -rotate-3 self-start bg-sun">02 — Projects</span>
          <h2 className="m-0 text-[clamp(48px,7vw,72px)] leading-none font-extrabold tracking-[-0.03em]">Things I've built.</h2>
          <p className="m-0 max-w-[560px] text-[19px] leading-normal">
            Real products I design, code and ship end to end — from database to the last hover state.
          </p>
        </div>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 rounded-[28px] border-[2.5px] border-ink bg-white p-1.5">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`cursor-pointer rounded-full px-4.5 py-2.5 text-base font-bold transition-colors ${
                  active ? "bg-ink text-cream" : "bg-transparent text-ink hover:bg-cream"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {featured && <Featured p={featured} />}
      {rest.length > 0 && (
        <div className="flex flex-wrap gap-7">
          {rest.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      )}
      {showClient && <ClientWork />}
    </div>
  );
}
