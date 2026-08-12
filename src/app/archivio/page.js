"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import tesiArchiviate from "@/data/tesiArchiviate.json";

function tr(value, lang = "it") {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.it || "";
}

function formatDate(value, lang = "it") {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function ArchivioPage() {
  const [lang, setLang] = useState("it");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLang(params.get("lang") === "en" ? "en" : "it");
  }, []);

  const archivio = useMemo(() => {
    return [...tesiArchiviate].sort((a, b) => {
      const dataA = a.dataFine || a.dataInizio || "";
      const dataB = b.dataFine || b.dataInizio || "";

      return dataB.localeCompare(dataA);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href={`/?lang=${lang}`}
        className="text-sm text-slate-300 transition-colors hover:text-white"
      >
        ← {lang === "en" ? "Back to home" : "Torna alla home"}
      </Link>

      <div className="mt-8">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          {lang === "en" ? "Archive" : "Archivio"}
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {lang === "en" ? "Completed theses" : "Tesi svolte"}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          {lang === "en"
            ? "Archive of completed thesis projects developed within the research activities of the group."
            : "Archivio delle tesi concluse sviluppate nell'ambito delle attività di ricerca del gruppo."}
        </p>
      </div>

      {archivio.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {archivio.map((tesi) => {
            const titolo = tr(tesi.titolo, lang);
            const abstract = tr(tesi.abstract, lang);
            const area = tr(tesi.area, lang);

            const docenti = Array.isArray(tesi.docenti)
              ? tesi.docenti
              : [];

            const links = tesi.links || {};

            return (
              <div
                key={tesi.id}
                className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">
                      {tesi.anno && `${tesi.anno}`}
                      {tesi.anno && area && " • "}
                      {area}
                    </div>

                    <h2 className="mt-1 text-xl font-semibold leading-snug text-white">
                      {titolo}
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                    {tesi.id}
                  </div>
                </div>

                {tesi.studente?.nome && (
                  <div className="mt-4">
                    <div className="text-xs text-slate-400">
                      {lang === "en" ? "Student" : "Studente"}
                    </div>

                    <div className="mt-1 text-sm font-semibold text-slate-200">
                      {tesi.studente.nome}
                    </div>
                  </div>
                )}

                {(tesi.dataInizio || tesi.dataFine) && (
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
                    {tesi.dataInizio && (
                      <div>
                        {lang === "en" ? "Started" : "Inizio"}:{" "}
                        <span className="text-slate-300">
                          {formatDate(tesi.dataInizio, lang)}
                        </span>
                      </div>
                    )}

                    {tesi.dataFine && (
                      <div>
                        {lang === "en" ? "Completed" : "Conclusione"}:{" "}
                        <span className="text-slate-300">
                          {formatDate(tesi.dataFine, lang)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {abstract && (
                  <div className="mt-5">
                    <div className="text-sm font-semibold text-white">
                      Abstract
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {abstract}
                    </p>
                  </div>
                )}

                {(tesi.tags || []).length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tesi.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {docenti.length > 0 && (
                  <div className="mt-5 text-xs text-slate-400">
                    <span>
                      {lang === "en" ? "Supervisors" : "Relatori"}:{" "}
                    </span>

                    {docenti.map((docente, index) => (
                      <span key={docente.email || docente.nome}>
                        {index > 0 && " • "}
                        {docente.nome}
                      </span>
                    ))}
                  </div>
                )}

                {(links.tesi ||
                  links.repository ||
                  links.pubblicazione ||
                  links.dataset) && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {links.tesi && (
                      <a
                        href={links.tesi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        {lang === "en" ? "Thesis" : "Tesi"}
                      </a>
                    )}

                    {links.repository && (
                      <a
                        href={links.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        Repository
                      </a>
                    )}

                    {links.pubblicazione && (
                      <a
                        href={links.pubblicazione}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        {lang === "en" ? "Publication" : "Pubblicazione"}
                      </a>
                    )}

                    {links.dataset && (
                      <a
                        href={links.dataset}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        Dataset
                      </a>
                    )}
                  </div>
                )}

                {tesi.origine === "studente" && (
                  <div className="mt-5 text-xs text-slate-500">
                    {lang === "en"
                      ? "Student-proposed thesis"
                      : "Tesi proposta dallo studente"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          {lang === "en"
            ? "No completed theses are currently available in the archive."
            : "Al momento non sono presenti tesi concluse nell'archivio."}
        </div>
      )}
    </div>
  );
}