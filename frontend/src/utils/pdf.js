// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export const exportTablePDF = (title, columns, rows) => {
//   const doc = new jsPDF();
//   doc.text(title, 14, 16);

//   doc.autoTable({
//     startY: 20,
//     head: [columns],
//     body: rows.map(r => columns.map(c => r[c] ?? "")),
//   });

//   doc.save(`${title}.pdf`);
// };


import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatEnum } from "./enumMapper";

/**
 * Export table data to PDF
 * @param {string} title - PDF title
 * @param {Array<{ key: string, label: string }>} columns
 * @param {Array<Object>} rows
 */
export const exportTablePDF = (title, columns, rows) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "A4",
  });

  /* ---------- TITLE ---------- */
  doc.setFontSize(16);
  doc.text(title, 40, 40);

  /* ---------- TABLE ---------- */
  doc.autoTable({
    startY: 60,
    head: [columns.map(c => c.label)],
    body: rows.map(row =>
      columns.map(c => {
        const value = row[c.key];
        return typeof value === "string" ? formatEnum(value) : value ?? "";
      })
    ),
    styles: {
      fontSize: 9,
      cellPadding: 6,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [37, 99, 235], // blue-600
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { left: 40, right: 40 },
    didDrawPage: (data) => {
      doc.setFontSize(9);
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        data.settings.margin.left,
        doc.internal.pageSize.height - 20
      );
    },
  });

  /* ---------- SAVE ---------- */
  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};
