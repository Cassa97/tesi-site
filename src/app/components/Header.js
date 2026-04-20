"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function buildProposalMailto(lang = "it") {
  const subject =
    lang === "en" ? "Thesis proposal" : "Proposta tesi";

  const body =
    lang === "en"
      ? [
          "Dear Prof. [LAST NAME],",
          "",
          "I would like to propose a possible topic for a master's thesis.",
          "",
          "- Type: [8 or 4] points",
          "- Preliminary title or idea: [...]",
          "- Brief description of the proposal: [...]",
          "- Motivation / interests: [...]",
          "- Relevant skills: [...]",
          "",
          "Information:",
          "- Degree programme: [...]",
          "- GPA/credits (optional): [...]",
          "",
          "Materials:",
          "- CV attached or link: [...]",
          "- Relevant projects: [...]",
          "",
          "Availability for a meeting: [...]",
          "",
          "Thanks,",
          "[FIRST NAME LAST NAME]"
        ].join("\n")
      : [
          "Gentile Prof. [COGNOME],",
          "",
          "vorrei proporle un possibile tema di tesi di laurea magistrale.",
          "",
          "- Tipologia: [8 o 4] punti",
          "- Titolo o idea preliminare: [...]",
          "- Breve descrizione della proposta: [...]",
          "- Motivazione / interessi: [...]",
          "- Eventuali competenze rilevanti: [...]",
          "",
          "Dati:",
          "- Corso di studi: [...]",
          "- Media/CFU (opzionale): [...]",
          "",
          "Materiale:",
          "- CV allegato oppure link: [...]",
          "- Eventuali progetti rilevanti: [...]",
          "",
          "Disponibilità per un colloquio: [...]",
          "",
          "Grazie,",
          "[NOME COGNOME]"
        ].join("\n");

  return `mailto:jacopo.cassandro@polimi.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Header() {
  const [lang, setLang] = useState("it");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLang(params.get("lang") === "en" ? "en" : "it");
  }, []);

  const homeHref = `/tesi-site/?lang=${lang}`;
  const thesisHref = `/tesi-site/tesi?lang=${lang}`;

  const siteTitle =
    lang === "en" ? "Thesis Opportunities" : "Proposte di Tesi";

  const siteSubtitle =
    lang === "en" ? "public catalog" : "catalogo pubblico";

  const thesisLabel =
    lang === "en" ? "Thesis list" : "Lista tesi";

  const proposeLabel =
    lang === "en" ? "Propose your topic" : "Proponi il tuo tema";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={homeHref} className="no-underline">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400" />
            <div>
              <div className="text-sm font-semibold leading-tight">
                {siteTitle}
              </div>
              <div className="text-xs text-slate-300">{siteSubtitle}</div>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-3 text-sm">
            <Link
              className="no-underline text-slate-200 hover:text-white"
              href={thesisHref}
            >
              {thesisLabel}
            </Link>

            <a
              href={buildProposalMailto(lang)}
              className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200 hover:bg-white/10 hover:text-white"
            >
              {proposeLabel}
            </a>
          </nav>

          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            <a
              href="/tesi-site/?lang=it"
              className={`rounded-lg px-3 py-1 text-xs font-semibold no-underline ${
                lang === "it"
                  ? "bg-white text-slate-950"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              IT
            </a>

            <a
              href="/tesi-site/?lang=en"
              className={`rounded-lg px-3 py-1 text-xs font-semibold no-underline ${
                lang === "en"
                  ? "bg-white text-slate-950"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              EN
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}