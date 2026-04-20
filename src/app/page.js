"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { translations } from "@/lib/translations";

export default function HomePage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "it";
  const t = translations[lang];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 md:p-12">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {t.heroTitle1} <span className="text-slate-200">{t.heroTitle2}</span>
        </h1>

        <p className="mt-4 max-w-2xl text-slate-200">{t.heroText}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/tesi?lang=${lang}`}
            className="no-underline rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            {t.goToList}
          </Link>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { title: t.cardBrowseTitle, text: t.cardBrowseText },
            { title: t.cardApplyTitle, text: t.cardApplyText },
            { title: t.cardProposeTitle, text: t.cardProposeText }
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
            >
              <div className="text-sm font-semibold">{x.title}</div>
              <div className="mt-1 text-sm text-slate-300">{x.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}