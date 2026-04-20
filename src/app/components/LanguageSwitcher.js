"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get("lang") || "it";

  function changeLang(lang) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
      <button
        onClick={() => changeLang("it")}
        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
          currentLang === "it"
            ? "bg-white text-slate-950"
            : "text-slate-200 hover:bg-white/10"
        }`}
      >
        IT
      </button>

      <button
        onClick={() => changeLang("en")}
        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
          currentLang === "en"
            ? "bg-white text-slate-950"
            : "text-slate-200 hover:bg-white/10"
        }`}
      >
        EN
      </button>
    </div>
  );
}