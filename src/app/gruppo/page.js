"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const membri = [
  {
    nome: "Alberto Pavan",
    titolo: "Prof.",
    istituzione: "Politecnico di Milano",
    descrizione: {
        it: "Ricerca nell'ambito della digitalizzazione del settore delle costruzioni, BIM, gestione informativa e processi digitali.",
        en: "Research in construction digitalization, BIM, information management and digital processes.",
    },
    links: {
      polimi: "https://www.dabc.polimi.it/it/personale/alberto.pavan",
      orcid: "https://orcid.org/0000-0003-0884-4075",
      scholar: "https://scholar.google.com/citations?user=l44MbZ0AAAAJ&hl=en",
      researchgate: "https://www.researchgate.net/profile/Alberto-Pavan-2",
    },
  },
  {
    nome: "Claudio Mirarchi",
    titolo: "Prof.",
    istituzione: "Politecnico di Milano",
    descrizione: {
        it: "Ricerca nell'ambito della digitalizzazione del settore delle costruzioni, BIM, gestione informativa e processi digitali.",
        en: "Research in construction digitalization, BIM, information management and digital processes.",
    },
    links: {
      polimi: "https://www.dabc.polimi.it/it/personale/claudio.mirarchi",
      orcid: "https://orcid.org/0000-0002-9288-8662",
      scholar: "https://scholar.google.com/citations?user=dIgTzVYAAAAJ&hl=it",
      researchgate: "https://www.researchgate.net/profile/Claudio-Mirarchi",
    },
  },
  {
    nome: "Jacopo Cassandro",
    titolo: "Dr.-Ing.",
    istituzione: "Politecnico di Milano",
    descrizione: {
        it: "Ricerca nell'ambito della digitalizzazione del settore delle costruzioni, BIM, gestione informativa e processi digitali.",
        en: "Research in construction digitalization, BIM, information management and digital processes.",
    },
    links: {
      polimi: "",
      orcid: "https://orcid.org/0000-0002-1487-8178",
      scholar: "https://scholar.google.com/citations?user=QfmJ_qIAAAAJ&hl=it",
      researchgate: "https://www.researchgate.net/profile/Jacopo-Cassandro",
    },
  },
];

export default function GruppoPage() {
  const [lang, setLang] = useState("it");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLang(params.get("lang") === "en" ? "en" : "it");
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href={`/?lang=${lang}`}
        className="text-sm text-slate-400 hover:text-white"
      >
        ← {lang === "en" ? "Back to home" : "Torna alla home"}
      </Link>

      <div className="mt-6">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          {lang === "en" ? "Research group" : "Gruppo di ricerca"}
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {lang === "en"
            ? "People and research profiles"
            : "Persone e profili di ricerca"}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          {lang === "en"
            ? "The thesis opportunities published on this website are developed within the research activities of the group at Politecnico di Milano."
            : "Le proposte di tesi pubblicate su questo sito si inseriscono nelle attività di ricerca del gruppo presso il Politecnico di Milano."}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {membri.map((membro) => {
          const links = Object.entries(membro.links).filter(
            ([, url]) => url
          );

          return (
            <div
              key={membro.nome}
              className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-lg font-semibold text-white">
                {membro.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="mt-5 text-xs text-slate-400">
                {membro.titolo}
              </div>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {membro.nome}
              </h2>

              <div className="mt-1 text-sm text-slate-400">
                {membro.istituzione}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                {membro.descrizione[lang]}
              </p>

              {links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {links.map(([tipo, url]) => (
                    <a
                      key={tipo}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                    >
                      {tipo === "polimi"
                        ? "Profilo Polimi"
                        : tipo === "orcid"
                          ? "ORCID"
                          : tipo === "scholar"
                            ? "Google Scholar"
                            : "ResearchGate"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        {lang === "en"
          ? "For information about a specific thesis opportunity, please use the contact details provided in the corresponding thesis page."
          : "Per informazioni relative a una specifica proposta di tesi, utilizzare i contatti indicati nella relativa scheda."}
      </div>
    </div>
  );
}