import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SavedScene, SceneChannelPatch } from '../types';

interface StageRiderMetadata {
  bandName?: string;
  venueName?: string;
  date?: string;
  engineerName?: string;
  engineerContact?: string;
  notes?: string;
}

export const generateStageRiderPdf = (
  scene: SavedScene,
  channels: SceneChannelPatch[],
  metadata: StageRiderMetadata = {}
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [40, 40, 40]; // Modern neutral dark accent
  const darkColor = [20, 20, 20];
  const grayColor = [100, 100, 100];

  // Header Banner
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, 210, 32, 'F');

  // Accent Line
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 32, 210, 2, 'F');

  // Title & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('BEHRINGER WING COMPACT — STAGE & INPUT RIDER', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`SCÉNA: ${scene.name.toUpperCase()}  |  ${scene.details?.targetEnsemble || 'LIVE SHOW'}`, 14, 22);

  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text(`Generováno z Behringer WING Digital Toolkit  |  Datum: ${metadata.date || new Date().toLocaleDateString('cs-CZ')}`, 14, 28);

  // Metadata Box
  let yPos = 40;
  doc.setFontSize(9);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACE O VYSTOUPENÍ & ZVUKAŘI:', 14, yPos);

  yPos += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`• Kapela / Interpret: ${metadata.bandName || scene.name}`, 14, yPos);
  doc.text(`• Místo / Venue: ${metadata.venueName || 'Sál / Festival Stage'}`, 110, yPos);

  yPos += 4.5;
  doc.text(`• FOH / Monitor Zvukař: ${metadata.engineerName || 'Pódiový inženýr'}`, 14, yPos);
  doc.text(`• Kontakt: ${metadata.engineerContact || 'foh@audio-production.cz'}`, 110, yPos);

  if (metadata.notes || scene.description) {
    yPos += 4.5;
    doc.setFont('helvetica', 'italic');
    doc.text(`• Poznámky k zapojení: ${metadata.notes || scene.description}`, 14, yPos);
    doc.setFont('helvetica', 'normal');
  }

  yPos += 7;

  // Table 1: Input Channel Patch Sheet
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`1. PÓDIOVÝ SEZNAM VSTUPŮ (INPUT PATCH SHEET — ${channels.length} KANÁLŮ)`, 14, yPos);

  yPos += 2;

  const tableRows = channels.map(ch => [
    ch.chNum.toString(),
    ch.name,
    ch.sourceInput,
    `+${ch.gainDb} dB`,
    ch.phantom48V ? 'ANO (+48V)' : '—',
    ch.phaseInvert ? '180°' : '0°',
    ch.gateOn ? ch.gateModel : 'Bypass',
    ch.eqModel,
    ch.compOn ? ch.compModel : 'Bypass',
    ch.dcaGroup ? `DCA ${ch.dcaGroup}` : '—',
    ch.faderDb <= -60 ? '-oo' : `${ch.faderDb > 0 ? '+' : ''}${ch.faderDb} dB`
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['CH', 'Nástroj / Popis', 'Vstupní konektor', 'Gain', '48V', 'Fáze', 'Gate', 'EQ Model', 'Kompresor', 'DCA', 'Fader']],
    body: tableRows,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 1.5,
      textColor: [30, 30, 30],
      lineColor: [220, 220, 220],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [20, 20, 20],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 7.5
    },
    columnStyles: {
      0: { halign: 'center', fontStyle: 'bold', cellWidth: 10 },
      1: { fontStyle: 'bold', cellWidth: 32 },
      2: { cellWidth: 26 },
      3: { halign: 'center', cellWidth: 14 },
      4: { halign: 'center', cellWidth: 12 },
      5: { halign: 'center', cellWidth: 10 },
      6: { cellWidth: 20 },
      7: { cellWidth: 24 },
      8: { cellWidth: 22 },
      9: { halign: 'center', cellWidth: 12 },
      10: { halign: 'center', cellWidth: 14 }
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    },
    margin: { left: 14, right: 14 }
  });

  // Next Section: Monitor & Aux Buses (IEM)
  const finalY = (doc as any).lastAutoTable?.finalY || 160;
  let nextY = finalY + 8;

  // If table went too close to bottom, add new page
  if (nextY > 235) {
    doc.addPage();
    nextY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('2. ODPOSLECHOVÉ SBĚRNICE & MONITORING (IEM / WEDGES)', 14, nextY);

  nextY += 2;

  const busRows = (scene.buses || []).slice(0, 12).map(b => [
    `Bus ${b.busNum}`,
    b.name,
    b.role,
    `${b.faderDb > 0 ? '+' : ''}${b.faderDb} dB`
  ]);

  autoTable(doc, {
    startY: nextY,
    head: [['Sběrnice', 'Název odposlechu', 'Typ / Cíl', 'Výstupní úroveň']],
    body: busRows,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 1.5,
      textColor: [30, 30, 30]
    },
    headStyles: {
      fillColor: [20, 20, 20],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5
    },
    margin: { left: 14, right: 14 }
  });

  // Footer Note
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(
      `Behringer WING Stage Rider — Strana ${i} z ${pageCount} — Vyžaduje mixážní pult Behringer WING / WING Compact (FW 3.0+)`,
      14,
      290
    );
  }

  // Save the PDF
  const filename = `WING_Stage_Rider_${scene.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(filename);
};
