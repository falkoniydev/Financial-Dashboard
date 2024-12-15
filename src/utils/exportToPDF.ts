import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (data: any[], filename: string) => {
  const doc = new jsPDF();

  // PDFning sarlavhasi
  doc.text('Tranzaksiya Hisoboti', 14, 15);

  // Ma'lumotlarni jadval shakliga tayyorlash
  const tableColumn = ['ID', 'Miqdor', 'Kategoriya', 'Turi', 'Sana'];
  const tableRows: any[] = [];

  data.forEach((txn) => {
    const rowData = [
      txn.id,
      txn.amount,
      txn.category,
      txn.type === 'income' ? 'Daromad' : 'Xarajat',
      new Date(txn.date).toLocaleDateString(),
    ];
    tableRows.push(rowData);
  });

  // Jadvalni qo‘shish
  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
  });

  // PDF faylni yuklab olish
  doc.save(`${filename}.pdf`);
};
