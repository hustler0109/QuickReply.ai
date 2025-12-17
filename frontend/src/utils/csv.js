export const exportToCSV = (rows, filename) => {
  if (!rows?.length) return;

  const headers = Object.keys(rows[0]).join(",");
  const values = rows.map(r => Object.values(r).join(","));
  const csv = [headers, ...values].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};
