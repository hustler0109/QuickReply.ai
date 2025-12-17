import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportTablePDF = (title, columns, rows) => {
  const doc = new jsPDF();
  doc.text(title, 14, 16);

  doc.autoTable({
    startY: 20,
    head: [columns],
    body: rows.map(r => columns.map(c => r[c] ?? "")),
  });

  doc.save(`${title}.pdf`);
};
