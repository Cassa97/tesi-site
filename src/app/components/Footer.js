"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [lang, setLang] = useState("it");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLang(params.get("lang") === "en" ? "en" : "it");
  }, []);

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        
        <div>
          © {new Date().getFullYear()} —{" "}
          {lang === "en"
            ? "Thesis Opportunities · Politecnico di Milano · All rights reserved."
            : "Proposte di Tesi · Politecnico di Milano · Tutti i diritti riservati."}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={`/gruppo?lang=${lang}`}
            className="transition-colors hover:text-white"
          >
            {lang === "en" ? "Research Group" : "Gruppo di ricerca"}
          </Link>

          <Link
            href={`/archivio?lang=${lang}`}
            className="transition-colors hover:text-white"
          >
            {lang === "en" ? "Completed theses" : "Tesi svolte"}
          </Link>

          <a
            href="https://github.com/Cassa97/tesi-site/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            {lang === "en" ? "License" : "Licenza"}
          </a>
        </div>

      </div>
    </footer>
  );
}