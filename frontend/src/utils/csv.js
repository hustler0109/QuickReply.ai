// export const exportToCSV = (rows, filename) => {
//   if (!rows?.length) return;

//   const headers = Object.keys(rows[0]).join(",");
//   const values = rows.map(r => Object.values(r).join(","));
//   const csv = [headers, ...values].join("\n");

//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
// };

/* Convert ENUM_LIKE_TEXT → Human Readable */
const formatLabel = (value) => {
  if (!value) return "";
  return value.replaceAll("_", " ");
};

/* Escape values safely for CSV (commas, quotes, newlines) */
const escapeCSV = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export const exportToCSV = (rows, filename = "library.csv") => {
  if (!rows || rows.length === 0) return;

  /* Fixed column order */
  const headers = [
    "Paper Title",
    "First Author",
    "Research Domain",
    "Reading Stage",
    "Citation Count",
    "Impact Score",
    "Date Added",
  ];

  const csvRows = rows.map((r) => [
    escapeCSV(r.paperTitle),
    escapeCSV(r.firstAuthor),
    escapeCSV(formatLabel(r.researchDomain)),
    escapeCSV(formatLabel(r.readingStage)),
    escapeCSV(r.citationCount),
    escapeCSV(formatLabel(r.impactScore)),
    escapeCSV(
      r.dateAdded ? new Date(r.dateAdded).toLocaleDateString() : ""
    ),
  ]);

  const csvContent = [
    headers.join(","),
    ...csvRows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
