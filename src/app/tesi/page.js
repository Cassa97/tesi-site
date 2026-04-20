"use client";

import { useMemo, useState, useEffect } from "react";
import { getAllTesi, getUniqueAree, buildMailto } from "@/lib/tesi";

function tr(value, lang = "it") {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.it || "";
}

function trList(value, lang = "it") {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[lang] || value.it || [];
}

export default function TesiListPage() {
  const [lang, setLang] = useState("it");
  const [q, setQ] = useState("");
  const [area, setArea] = useState("Tutte");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentLang = params.get("lang") === "en" ? "en" : "it";
    setLang(currentLang);
    setArea(currentLang === "en" ? "All" : "Tutte");
  }, []);

  const all = getAllTesi();
  const aree = getUniqueAree(lang);
  const defaultArea = lang === "en" ? "All" : "Tutte";

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return all.filter((t) => {
      const titolo = tr(t.titolo, lang);
      const areaValue = tr(t.area, lang);
      const livello = tr(t.livello, lang);
      const descrizioneBreve = tr(t.descrizioneBreve, lang);
      const descrizioneCompleta = tr(t.descrizioneCompleta, lang);
      const modalita = tr(t.modalita, lang);
      const requisiti = trList(t.requisiti, lang);

      const matchArea = area === defaultArea || areaValue === area;

      const blob = [
        titolo,
        areaValue,
        livello,
        descrizioneBreve,
        descrizioneCompleta,
        modalita,
        ...(t.tags || []),
        ...requisiti
      ]
        .join(" ")
        .toLowerCase();

      const matchQuery = !query || blob.includes(query);
      return matchArea && matchQuery;
    });
  }, [all, q, area, lang, defaultArea]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {lang === "en" ? "Thesis opportunities" : "Proposte di tesi"}
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            {lang === "en"
              ? "Filter and search. To apply, use “Apply via email”."
              : "Filtra e cerca. Per candidarti, usa “Candidati via email”."}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full md:w-80">
            <label className="text-xs text-slate-400">
              {lang === "en" ? "Search" : "Ricerca"}
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={
                lang === "en"
                  ? "e.g. NLP, Web, Python, Next.js..."
                  : "es. NLP, Web, Python, Next.js..."
              }
              className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/20"
            />
          </div>

          <div className="w-full md:w-56">
            <label className="text-xs text-slate-400">Area</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
            >
              {aree.map((a) => (
                <option key={a} value={a} className="bg-slate-900">
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((t) => {
          const titolo = tr(t.titolo, lang);
          const areaValue = tr(t.area, lang);
          const livello = tr(t.livello, lang);
          const descrizioneBreve = tr(t.descrizioneBreve, lang);
          const descrizioneCompleta = tr(t.descrizioneCompleta, lang);
          const modalita = tr(t.modalita, lang);
          const requisiti = trList(t.requisiti, lang);

          return (
            <div
              key={t.id}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">
                    {areaValue} • {livello}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold leading-snug">{titolo}</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                  ID: {t.id}
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-200">
                {descrizioneCompleta || descrizioneBreve}
              </p>

              {requisiti.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-semibold text-white">
                    {lang === "en" ? "Requirements" : "Requisiti"}
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                    {requisiti.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {modalita && (
                <div className="mt-4">
                  <div className="text-sm font-semibold text-white">
                    {lang === "en" ? "Mode" : "Modalità"}
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{modalita}</p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {(t.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <a
                  href={buildMailto(t, lang)}
                  className="no-underline rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                >
                  {lang === "en" ? "Apply via email" : "Candidati via email"}
                </a>
              </div>

              <div className="mt-4 text-xs text-slate-400">
                {lang === "en" ? "Contact" : "Contatto"}: {t.docenteNome} — {t.docenteEmail}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          {lang === "en"
            ? "No results. Try changing search or filter."
            : "Nessun risultato. Prova a cambiare ricerca o filtro."}
        </div>
      )}
    </div>
  );
}