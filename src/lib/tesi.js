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

  return [
    first,
    ...Array.from(aree).sort((a, b) => a.localeCompare(b)),
  ];
}

export function buildMailto(tesiItem, lang = "it") {
  // Titolo corretto nella lingua selezionata
  const titolo = tr(tesiItem.titolo, lang);

  // Supporta sia il nuovo formato con più docenti
  // sia il vecchio formato con un solo docente
  const docenti =
    Array.isArray(tesiItem.docenti) && tesiItem.docenti.length > 0
      ? tesiItem.docenti
      : tesiItem.docenteNome
        ? [
            {
              nome: tesiItem.docenteNome,
              email: tesiItem.docenteEmail,
            },
          ]
        : [];

  // Tutte le email dei docenti
  const emails = docenti
    .map((docente) => docente.email)
    .filter(Boolean);

  // Tutti i nomi dei docenti
  const nomi = docenti
    .map((docente) => docente.nome)
    .filter(Boolean);

  const nomiItaliano =
    nomi.length > 0
      ? nomi.join(" e ")
      : "Docenti";

  const nomiInglese =
    nomi.length > 0
      ? nomi.join(" and ")
      : "Professors";

  const subject = `Candidatura tesi: ${titolo}`;

  const body = [
    `### ITALIANO ###`,
    ``,
    `Gentili ${nomiItaliano},`,
    ``,
    `mi chiamo [NOME COGNOME] e vorrei candidarmi alla tesi:`,
    `"${titolo}" (ID: ${tesiItem.id}).`,
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
    `Dear ${nomiInglese},`,
    ``,
    `My name is [NAME LASTNAME] and I would like to apply for the thesis:`,
    `"${titolo}" (ID: ${tesiItem.id}).`,
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
    `[NAME LASTNAME]`,
  ].join("\n");

  return `mailto:${emails.join(",")}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}