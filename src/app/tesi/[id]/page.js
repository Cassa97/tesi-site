import Link from "next/link";
import { getAllTesi, getTesiById, buildMailto } from "@/lib/tesi";
import { translations } from "@/lib/translations";

export function generateStaticParams() {
  return getAllTesi().map((t) => ({ id: t.id }));
}

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

export default async function TesiDetailPage({ params }) {
  const resolvedParams = await params;

  // per static export teniamo una lingua fissa qui
  const lang = "it";
  const tText = translations[lang];

  const t = getTesiById(resolvedParams.id);

  if (!t) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold">{tText.thesisNotFound}</div>
        <p className="mt-2 text-sm text-slate-300">{tText.thesisNotFoundText}</p>
        <Link
          href="/tesi"
          className="mt-4 inline-block no-underline rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          {tText.backToList}
        </Link>
      </div>
    );
  }

  const areaValue = tr(t.area, lang);
  const livello = tr(t.livello, lang);
  const titolo = tr(t.titolo, lang);
  const descrizione = tr(t.descrizioneCompleta, lang) || tr(t.descrizioneBreve, lang);
  const requisiti = trList(t.requisiti, lang);
  const modalita = tr(t.modalita, lang);

  return (
    <div>
      <Link
        href="/tesi"
        className="no-underline text-sm text-slate-300 hover:text-white"
      >
        {tText.backToList}
      </Link>

      <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs text-slate-400">
              {areaValue} • {livello} • ID: {t.id}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              {titolo}
            </h1>
          </div>

          <a
            href={buildMailto(t, lang)}
            className="no-underline rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            {tText.applyEmail}
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-sm font-semibold text-white">{tText.description}</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-slate-200">
              {descrizione}
            </p>

            <h2 className="mt-6 text-sm font-semibold text-white">{tText.requirements}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
              {requisiti.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            {modalita && (
              <>
                <h2 className="mt-6 text-sm font-semibold text-white">{tText.mode}</h2>
                <p className="mt-2 text-sm text-slate-200">{modalita}</p>
              </>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <h2 className="text-sm font-semibold text-white">{tText.contacts}</h2>
            <div className="mt-3 text-sm text-slate-200">
              <div className="text-slate-300">{tText.teacher}</div>
              <div className="font-semibold">{t.docenteNome}</div>
              <div className="mt-1 text-slate-300">{tText.email}</div>
              <div className="break-all">{t.docenteEmail}</div>
            </div>

            <div className="mt-5">
              <div className="text-xs text-slate-400">{tText.tags}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(t.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-400">{tText.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
}