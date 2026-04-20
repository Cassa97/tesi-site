"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [lang, setLang] = useState("it");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLang(params.get("lang") === "en" ? "en" : "it");
  }, []);

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-400">
        © {new Date().getFullYear()} —{" "}
        {lang === "en"
          ? "Thesis Opportunities. Public for students."
          : "Proposte di Tesi. Pubblico per studenti."}
      </div>
    </footer>
  );
}