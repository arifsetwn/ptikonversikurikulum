import React, { useState } from 'react';
import { X, Download, Printer, GraduationCap, ShieldAlert, Loader2 } from 'lucide-react';
import { ConversionResultItem, ConversionSummaryStats, StudentInfo } from '../types';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import { getRemaining2026Courses } from '../utils/conversionEngine';
import logoPti from '../img/logo_pti.png';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  results: ConversionResultItem[];
  stats: ConversionSummaryStats;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  results,
  stats
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const formattedDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const remainingCourses = getRemaining2026Courses(results);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    const safeNim = studentInfo.nim ? studentInfo.nim.replace(/[^a-zA-Z0-9]/g, '_') : 'Mahasiswa';
    const filename = `Konversi_Kurikulum_${safeNim}.pdf`;

    await generatePdfFromElement('pdf-document-content', filename);
    setIsGenerating(false);
  };

  const handlePrintWindow = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold">Pratinjau & Unduh Dokumen PDF</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="text-xs text-slate-600">
            Pastikan Nama & NIM sudah benar sebelum mengunduh dokumen.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintWindow}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" /> Cetak (Print)
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menyiapkan PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Document Area */}
        <div className="p-6 md:p-8 bg-white overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div
            id="pdf-document-content"
            style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#e2e8f0' }}
            className="p-8 border shadow-sm rounded-lg print-container"
          >
            {/* Kop Header */}
            <div style={{ borderBottom: '2px solid #0f172a' }} className="pb-4 mb-6 flex items-center justify-center gap-4">
              <img
                src={logoPti}
                alt="Logo PTI"
                className="w-16 h-16 object-contain shrink-0"
              />
              <div className="text-left">
                <h2 style={{ color: '#0f172a' }} className="text-lg font-black uppercase tracking-wide">
                  PROGRAM STUDI PENDIDIKAN TEKNIK INFORMATIKA
                </h2>
                <h1 style={{ color: '#1e3a8a' }} className="text-base font-extrabold mt-0.5">
                  HASIL SIMULASI KONVERSI KURIKULUM & EVALUASI IPK (2022 → 2026)
                </h1>
                <p style={{ color: '#64748b' }} className="text-[11px] mt-0.5">
                  Dokumen Evaluasi Pemenuhan, IPK & Rekapitulasi SKS Kurikulum
                </p>
              </div>
            </div>

            {/* Identitas Box */}
            <div
              style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
              className="p-4 rounded-lg border mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs"
            >
              <div>
                <span style={{ color: '#64748b' }} className="font-semibold uppercase tracking-wider block text-[10px]">
                  Nama Mahasiswa
                </span>
                <span style={{ color: '#0f172a' }} className="font-bold text-sm">
                  {studentInfo.nama.trim() || '— (Belum Diisi)'}
                </span>
              </div>
              <div>
                <span style={{ color: '#64748b' }} className="font-semibold uppercase tracking-wider block text-[10px]">
                  NIM (Nomor Induk Mahasiswa)
                </span>
                <span style={{ color: '#0f172a' }} className="font-mono font-bold text-sm">
                  {studentInfo.nim.trim() || '— (Belum Diisi)'}
                </span>
              </div>
              <div>
                <span style={{ color: '#64748b' }} className="font-semibold uppercase tracking-wider block text-[10px]">
                  Tanggal Simulasi
                </span>
                <span style={{ color: '#0f172a' }} className="font-bold text-sm">{formattedDate}</span>
              </div>
            </div>

            {/* Ringkasan Statistik & IPK Box */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              <div style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }} className="p-2 rounded border text-center col-span-2 sm:col-span-1">
                <span style={{ color: '#1e40af' }} className="text-[9px] uppercase font-bold block">IPK 2022</span>
                <span style={{ color: '#1e3a8a' }} className="text-base font-black">{stats.ipkSebelumKonversi.toFixed(2)}</span>
              </div>
              <div style={{ backgroundColor: '#e0e7ff', borderColor: '#c7d2fe' }} className="p-2 rounded border text-center col-span-2 sm:col-span-1">
                <span style={{ color: '#3730a3' }} className="text-[9px] uppercase font-bold block">IPK 2026</span>
                <span style={{ color: '#312e81' }} className="text-base font-black">{stats.ipkSetelahKonversi.toFixed(2)}</span>
              </div>
              <div style={{ backgroundColor: '#f1f5f9', borderColor: '#cbd5e1' }} className="p-2 rounded border text-center">
                <span style={{ color: '#64748b' }} className="text-[9px] uppercase font-bold block">SKS 2022</span>
                <span style={{ color: '#0f172a' }} className="text-sm font-extrabold">{stats.totalInputSks} SKS</span>
              </div>
              <div style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }} className="p-2 rounded border text-center">
                <span style={{ color: '#065f46' }} className="text-[9px] uppercase font-bold block">SKS Diakui</span>
                <span style={{ color: '#047857' }} className="text-sm font-extrabold">{stats.totalConvertedSks} SKS</span>
              </div>
              <div style={{ backgroundColor: '#fff1f2', borderColor: '#fecdd3' }} className="p-2 rounded border text-center">
                <span style={{ color: '#9f1239' }} className="text-[9px] uppercase font-bold block">SKS Hilang</span>
                <span style={{ color: '#be123c' }} className="text-sm font-extrabold">{stats.totalUnconvertedSks} SKS</span>
              </div>
              <div style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }} className="p-2 rounded border text-center">
                <span style={{ color: '#92400e' }} className="text-[9px] uppercase font-bold block">Sisa 2026</span>
                <span style={{ color: '#b45309' }} className="text-sm font-extrabold">{stats.totalRemainingSks2026} SKS</span>
              </div>
            </div>

            {/* SEKSI 1: TABEL HASIL KONVERSI */}
            <h3 style={{ color: '#0f172a' }} className="text-xs font-black uppercase tracking-wider mb-2">
              I. Hasil Pemetaan Konversi Mata Kuliah & Nilai (2022 → 2026)
            </h3>
            <table style={{ borderColor: '#cbd5e1' }} className="w-full text-left text-[10px] border-collapse border mb-6">
              <thead>
                <tr style={{ backgroundColor: '#0f172a', color: '#ffffff' }} className="font-bold uppercase">
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 text-center w-6">No</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 w-20">Kode 2022</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5">Mata Kuliah (2022)</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 text-center w-8">SKS</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 text-center w-14">Nilai</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 w-20">Kode 2026</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5">Mata Kuliah Konversi (2026)</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 text-center w-8">SKS</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 text-center w-14">Nilai</th>
                  <th style={{ borderColor: '#475569' }} className="border p-1.5 text-center w-20">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, idx) => {
                  const isUnconverted = item.status === 'unconverted';
                  return (
                    <tr
                      key={item.id}
                      style={{
                        backgroundColor: isUnconverted ? '#fff1f2' : '#ffffff',
                        borderBottom: '1px solid #e2e8f0'
                      }}
                    >
                      <td style={{ borderColor: '#cbd5e1', color: '#64748b' }} className="border p-1 text-center font-semibold">
                        {idx + 1}
                      </td>
                      <td style={{ borderColor: '#cbd5e1', color: '#475569' }} className="border p-1 font-mono">{item.kodeLama}</td>
                      <td style={{ borderColor: '#cbd5e1', color: '#0f172a' }} className="border p-1 font-bold">{item.namaLama}</td>
                      <td style={{ borderColor: '#cbd5e1', color: '#334155' }} className="border p-1 text-center font-bold">
                        {item.sksLama}
                      </td>
                      <td style={{ borderColor: '#cbd5e1', color: '#1e3a8a' }} className="border p-1 text-center font-extrabold">
                        {item.nilaiLama} ({item.bobotLama.toFixed(2)})
                      </td>
                      <td style={{ borderColor: '#cbd5e1', color: '#4338ca' }} className="border p-1 font-mono font-semibold">
                        {item.kodeBaru || '-'}
                      </td>
                      <td style={{ borderColor: '#cbd5e1' }} className="border p-1">
                        {item.namaBaru ? (
                          <span style={{ color: '#0f172a' }} className="font-bold">
                            {item.namaBaru}
                            {item.semBaru?.toLowerCase().includes('pilihan') && (
                              <span style={{ color: '#6b21a8', backgroundColor: '#f3e8ff', border: '1px solid #d8b4fe' }} className="ml-1 px-1 py-0.2 rounded text-[8px] font-black">
                                (MK Pilihan)
                              </span>
                            )}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }} className="italic">Tidak ada padanan</span>
                        )}
                      </td>
                      <td style={{ borderColor: '#cbd5e1', color: '#3730a3' }} className="border p-1 text-center font-bold">
                        {item.sksBaru > 0 ? item.sksBaru : '-'}
                      </td>
                      <td style={{ borderColor: '#cbd5e1', color: '#312e81' }} className="border p-1 text-center font-extrabold">
                        {item.nilaiBaru ? `${item.nilaiBaru} (${item.bobotBaru?.toFixed(2)})` : '-'}
                      </td>
                      <td style={{ borderColor: '#cbd5e1' }} className="border p-1 text-center font-bold text-[9px]">
                        {item.status === 'converted_1to1' && <span style={{ color: '#047857' }}>Terkonversi (1:1)</span>}
                        {item.status === 'converted_1toMany' && <span style={{ color: '#4338ca' }}>Opsi Konversi</span>}
                        {item.status === 'unconverted' && <span style={{ color: '#be123c' }} className="font-black">SKS Hilang</span>}
                        {item.status === 'not_in_catalog' && <span style={{ color: '#b45309' }}>Konsultasi</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* SEKSI 2: TABEL MK 2026 BELUM DIAMBIL */}
            <div className="mt-8 pt-4 border-t border-slate-300">
              <h3 style={{ color: '#92400e' }} className="text-xs font-black uppercase tracking-wider mb-1">
                II. Rekapitulasi Mata Kuliah Kurikulum 2026 yang Belum Diambil ({remainingCourses.length} MK • {stats.totalRemainingSks2026} SKS)
              </h3>
              <p style={{ color: '#b45309' }} className="text-[9px] font-semibold mb-2">
                * Catatan MK Pilihan: Mahasiswa hanya perlu mengambil 3 mata kuliah pilihan saja (total 9 SKS) dari daftar MK Pilihan untuk kelulusan.
              </p>
              {remainingCourses.length === 0 ? (
                <p style={{ color: '#047857' }} className="text-[11px] font-bold p-3 bg-emerald-50 rounded border border-emerald-200">
                  Seluruh mata kuliah Kurikulum 2026 telah terpenuhi!
                </p>
              ) : (
                <table style={{ borderColor: '#cbd5e1' }} className="w-full text-left text-[10px] border-collapse border mb-6">
                  <thead>
                    <tr style={{ backgroundColor: '#78350f', color: '#ffffff' }} className="font-bold uppercase">
                      <th style={{ borderColor: '#92400e' }} className="border p-1.5 text-center w-6">No</th>
                      <th style={{ borderColor: '#92400e' }} className="border p-1.5 w-24">Kode MK (2026)</th>
                      <th style={{ borderColor: '#92400e' }} className="border p-1.5">Nama Mata Kuliah Kurikulum 2026</th>
                      <th style={{ borderColor: '#92400e' }} className="border p-1.5 text-center w-12">SKS</th>
                      <th style={{ borderColor: '#92400e' }} className="border p-1.5 text-center w-20">Semester</th>
                      <th style={{ borderColor: '#92400e' }} className="border p-1.5 text-center w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remainingCourses.map((item, idx) => (
                      <tr key={item.kode_baru} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ borderColor: '#cbd5e1', color: '#64748b' }} className="border p-1 text-center font-semibold">
                          {idx + 1}
                        </td>
                        <td style={{ borderColor: '#cbd5e1', color: '#78350f' }} className="border p-1 font-mono font-bold">{item.kode_baru}</td>
                        <td style={{ borderColor: '#cbd5e1', color: '#0f172a' }} className="border p-1 font-bold">{item.nama_baru}</td>
                        <td style={{ borderColor: '#cbd5e1', color: '#334155' }} className="border p-1 text-center font-bold">
                          {item.sks_baru}
                        </td>
                        <td style={{ borderColor: '#cbd5e1', color: '#475569' }} className="border p-1 text-center font-semibold">
                          Semester {item.sem_baru}
                        </td>
                        <td style={{ borderColor: '#cbd5e1' }} className="border p-1 text-center font-bold text-[9px]">
                          <span style={{ color: '#b45309' }}>Belum Diambil</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Disclaimer Resmi & Skala Penilaian */}
            <div
              style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#475569' }}
              className="border rounded p-3 text-[9px] flex items-start gap-2 mt-6"
            >
              <ShieldAlert style={{ color: '#d97706' }} className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong style={{ color: '#0f172a' }} className="block text-[10px]">CATATAN AKADEMIK & SKALA PENILAIAN IPK:</strong>
                1. <strong>Skala Penilaian IPK:</strong> A (4.00), A/B (3.50), B (3.00), B/C (2.50), C (2.00), C/D (1.50), D (1.00), E (0.00).<br />
                2. <strong>Perhitungan IPK:</strong> IPK 2022 dihitung dari seluruh MK diinput. IPK 2026 dihitung dari MK yang berhasil dikonversi ke Kurikulum 2026.<br />
                3. <strong>MK Pilihan:</strong> Mahasiswa hanya perlu mengambil 3 mata kuliah pilihan (total 9 SKS) untuk kelulusan.<br />
                4. Dokumen ini merupakan hasil simulasi mandiri berbasis tabel pemetaan resmi prodi Teknik Informatika untuk konsultasi Dosen PA/Prodi dan bukan pengganti transkrip resmi BAAK.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
