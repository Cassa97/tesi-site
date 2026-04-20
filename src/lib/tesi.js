import tesi from "@/data/tesi.json";

function tr(value, lang = "it") {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.it || "";
}

export function getAllTesi() {
  return [...tesi].sort((a, b) =>
    tr(a.titolo).localeCompare(tr(b.titolo))
  );
}

export function getTesiById(id) {
  return getAllTesi().find((t) => t.id === id);
}

export function getUniqueAree(lang = "it") {
  const first = lang === "en" ? "All" : "Tutte";
  const aree = new Set(getAllTesi().map((t) => tr(t.area, lang)));
  return [first, ...Array.from(aree).sort((a, b) => a.localeCompare(b))];
}

export function buildMailto(tesiItem) {
  const subject = `Candidatura tesi: ${tesiItem.titolo}`;
  const body = [
    `### ITALIANO ###`,
    ``,
    `Gentile ${tesiItem.docenteNome},`,
    ``,
    `mi chiamo [NOME COGNOME] e vorrei candidarmi alla tesi:`,
    `"${tesiItem.titolo}" (ID: ${tesiItem.id}).`,
    ``,
    `Dati:`,
    `- Corso di studi: [...]`,
    `- Anno: [...]`,
    `- Matricola (se richiesta): [...]`,
    `- Media/CFU (opzionale): [...]`,
    ``,
    `Materiale:`,
    `- CV allegato oppure link: [...]`,
    `- Eventuali progetti rilevanti: [...]`,
    ``,
    `Disponibilità per un colloquio: [...]`,
    ``,
    `Grazie,`,
    `[NOME COGNOME]`,
    ``,
    `_________________________________________________________`,
    ``,
    `### ENGLISH ###`,
    ``,
    `Dear ${tesiItem.docenteNome},`,
    ``,
    `My name is [NAME LASTNAME] and I would like to apply for the thesis:`,
    `"${tesiItem.titolo}" (ID: ${tesiItem.id}).`,
    ``,
    `Data:`,
    `- Course of study: [...]`,
    `- Year: [...]`,
    `- Matriculation number (if required): [...]`,
    `- GPA/CFU (optional): [...]`,
    ``,
    `Materials:`,
    `- CV attached or link: [...]`,
    `- Relevant projects: [...]`,
    ``,
    `Availability for a colloquium: [...]`,
    ``,
    `Thank you,`,
    `[NAME LASTNAME]`
  ].join("\n");

  return `mailto:${encodeURIComponent(tesiItem.docenteEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}