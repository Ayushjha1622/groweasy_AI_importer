import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ImportSummary } from "@/types/import";

export function generatePDFReport(result: ImportSummary, filename: string) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GrowEasy Import Report", 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    autoTable(doc, {
        startY: 40,
        head: [["Total", "Imported", "Skipped", "Success Rate"]],
        body: [
            [
                result.total.toString(),
                result.imported.toString(),
                result.skipped.toString(),
                `${result.successRate}%`
            ]
        ],
        theme: 'striped',
        headStyles: { fillColor: [17, 24, 39] } // slate-900
    });

    doc.save(filename);
}
