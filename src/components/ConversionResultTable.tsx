import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Layers,
  Download,
  FileSpreadsheet,
  Info,
  BookMarked,
  Search,
  Check,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { ConversionResultItem, ConversionSummaryStats, StudentInfo, Course2026, GRADE_WEIGHTS } from '../types';
import { getRemaining2026Courses } from '../utils/conversionEngine';

interface ConversionResultTableProps {
  results: ConversionResultItem[];
  stats: ConversionSummaryStats;
  studentInfo: StudentInfo;
  onOpenPdfModal: () => void;
}

export const ConversionResultTable: React.FC<ConversionResultTableProps> = ({
  results,
  stats,
  studentInfo,
  onOpenPdfModal
}) => {
  const [activeTab, setActiveTab] = useState<'conversion' | 'remaining'>('conversion');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchRemaining, setSearchRemaining] = useState<string>('');

  const remainingCourses: Course2026[] = getRemaining2026Courses(results);

  const filteredResults = results.filter(item => {
    if (filterStatus === 'converted') {
      return item.status === 'converted_1to1' || item.status === 'converted_1toMany';
    }
    if (filterStatus === 'unconverted') {
      return item.status === 'unconverted';
    }
    if (filterStatus === 'multimatch') {
      return item.status === 'converted_1toMany';
    }
    return true;
  });

  const filteredRemaining = remainingCourses.filter(item => {
    if (!searchRemaining.trim()) return true;
    const query = searchRemaining.toLowerCase();
    return (
      item.nama_baru.toLowerCase().includes(query) ||
      item.kode_baru.toLowerCase().includes(query) ||
      item.sem_baru.toLowerCase().includes(query)
    );
  });

  // Calculate IPK Delta
  const ipkDelta = stats.ipkSetelahKonversi - stats.ipkSebelumKonversi;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8">
      {/* Main Header & PDF Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Hasil Otomatis
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Hasil Evaluasi, Pemetaan & Perhitungan IPK (2022 → 2026)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lihat hasil perbandingan IPK sebelum/setelah konversi, hasil pemetaan MK lama, dan rekapitulasi MK 2026 yang belum diambil.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPdfModal}
          disabled={results.length === 0}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" /> Unduh Dokumen PDF
        </button>
      </div>

      {/* KPI Stats Summary Cards with Highlighted IPK */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 py-6">
        {/* Card 1: IPK Sebelum Konversi (2022) */}
        <div className="p-3.5 rounded-xl bg-blue-50/90 border border-blue-200 shadow-sm">
          <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1 flex items-center justify-between">
            IPK 2022
            <span className="text-[10px] bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded">Sebelum</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-blue-900">
              {stats.ipkSebelumKonversi.toFixed(2)}
            </span>
            <span className="text-xs text-blue-700 font-semibold">/ 4.00</span>
          </div>
          <span className="text-[10px] text-blue-700 block mt-0.5">
            Dari {stats.totalInputSks} SKS 2022
          </span>
        </div>

        {/* Card 2: IPK Setelah Konversi (2026) */}
        <div className="p-3.5 rounded-xl bg-indigo-50/90 border border-indigo-200 shadow-sm">
          <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center justify-between">
            IPK 2026
            <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded">Setelah</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-indigo-900">
              {stats.ipkSetelahKonversi.toFixed(2)}
            </span>
            <span className="text-xs text-indigo-700 font-semibold">/ 4.00</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-[10px] font-bold">
            {ipkDelta > 0 ? (
              <span className="text-emerald-700 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +{ipkDelta.toFixed(2)}
              </span>
            ) : ipkDelta < 0 ? (
              <span className="text-rose-700 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> {ipkDelta.toFixed(2)}
              </span>
            ) : (
              <span className="text-slate-600 flex items-center gap-0.5">
                <Minus className="w-3 h-3" /> Tetap
              </span>
            )}
            <span className="text-slate-500 font-normal">vs Kurikulum 2022</span>
          </div>
        </div>

        {/* Card 3: Total Input SKS */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total SKS 2022
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{stats.totalInputSks}</span>
            <span className="text-xs text-slate-500">SKS ({stats.totalInputCourses} MK)</span>
          </div>
        </div>

        {/* Card 4: Total Converted SKS */}
        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            SKS Diakui 2026
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-emerald-700">{stats.totalConvertedSks}</span>
            <span className="text-xs text-emerald-600 font-medium">SKS Converted</span>
          </div>
        </div>

        {/* Card 5: Total Lost SKS */}
        <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/80">
          <div className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider mb-1">
            SKS Hilang
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-rose-700">{stats.totalUnconvertedSks}</span>
            <span className="text-xs text-rose-600 font-medium">Tidak Dikonversi</span>
          </div>
        </div>

        {/* Card 6: SKS 2026 Belum Diambil */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80">
          <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-1">
            SKS 2026 Belum Diambil
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-amber-700">{stats.totalRemainingSks2026}</span>
            <span className="text-xs text-amber-600 font-medium">SKS ({stats.totalRemainingCourses2026} MK)</span>
          </div>
        </div>
      </div>

      {/* Main View Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('conversion')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'conversion'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Tabel Hasil Pemetaan & Nilai Konversi
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800">
            {results.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('remaining')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'remaining'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookMarked className="w-4 h-4" /> Rekapitulasi MK 2026 Belum Diambil
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800">
            {remainingCourses.length} MK
          </span>
        </button>
      </div>

      {/* TAB 1: CONVERSION RESULTS */}
      {activeTab === 'conversion' && (
        <>
          {/* Sub-Filters for Conversion Table */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Hasil ({results.length})
              </button>
              <button
                onClick={() => setFilterStatus('converted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === 'converted' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Terkonversi ({results.filter(r => r.status === 'converted_1to1' || r.status === 'converted_1toMany').length})
              </button>
              <button
                onClick={() => setFilterStatus('unconverted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === 'unconverted' ? 'bg-white text-rose-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SKS Hilang ({results.filter(r => r.status === 'unconverted').length})
              </button>
              <button
                onClick={() => setFilterStatus('multimatch')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === 'multimatch' ? 'bg-white text-blue-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Multi-Match ({results.filter(r => r.status === 'converted_1toMany').length})
              </button>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              Menampilkan {filteredResults.length} dari {results.length} baris
            </span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 border border-slate-200 rounded-xl bg-slate-50">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-700">Tabel Hasil Belum Tersedia</p>
              <p className="text-xs text-slate-500 mt-1">
                Silakan masukkan mata kuliah pada form di atas atau muat contoh transkrip.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th colSpan={4} className="py-3 px-4 bg-slate-900 text-blue-400 border-r border-slate-800">
                      Kurikulum Lama (2022)
                    </th>
                    <th colSpan={5} className="py-3 px-4 bg-slate-950 text-indigo-400">
                      Hasil Konversi Kurikulum Baru (2026)
                    </th>
                  </tr>
                  <tr className="bg-slate-800 text-slate-300 text-[11px] border-t border-slate-700">
                    <th className="py-2.5 px-3 w-28">Kode MK</th>
                    <th className="py-2.5 px-4">Nama Mata Kuliah</th>
                    <th className="py-2.5 px-3 text-center w-14">SKS</th>
                    <th className="py-2.5 px-3 text-center w-20 border-r border-slate-700">Nilai</th>

                    <th className="py-2.5 px-3 w-28">Kode Baru</th>
                    <th className="py-2.5 px-4">Mata Kuliah Konversi</th>
                    <th className="py-2.5 px-3 text-center w-14">SKS</th>
                    <th className="py-2.5 px-3 text-center w-20">Nilai</th>
                    <th className="py-2.5 px-4 text-center w-44">Status Konversi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filteredResults.map((item, idx) => {
                    const isUnconverted = item.status === 'unconverted';
                    const isMulti = item.status === 'converted_1toMany';
                    const isNotInCat = item.status === 'not_in_catalog';

                    let rowBgClass = 'hover:bg-slate-50';
                    if (isUnconverted) rowBgClass = 'bg-rose-50/40 hover:bg-rose-50/80';
                    if (isMulti) rowBgClass = 'bg-indigo-50/40 hover:bg-indigo-50/80';
                    if (isNotInCat) rowBgClass = 'bg-amber-50/40 hover:bg-amber-50/80';

                    return (
                      <tr key={item.id} className={`${rowBgClass} transition-colors`}>
                        {/* 2022 Columns */}
                        <td className="py-3 px-3 font-mono font-bold text-slate-500">{item.kodeLama}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{item.namaLama}</td>
                        <td className="py-3 px-3 text-center font-extrabold text-slate-700">
                          {item.sksLama}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold border-r border-slate-200">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-black text-xs">
                            {item.nilaiLama} ({item.bobotLama.toFixed(2)})
                          </span>
                        </td>

                        {/* 2026 Columns */}
                        <td className="py-3 px-3 font-mono font-bold text-indigo-600">
                          {item.kodeBaru || '-'}
                        </td>
                        <td className="py-3 px-4">
                          {item.namaBaru ? (
                            <div>
                              <span className="font-bold text-slate-900">{item.namaBaru}</span>
                              {item.semBaru && (
                                <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                  Sem {item.semBaru}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">Tidak ada padanan</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold text-indigo-700">
                          {item.sksBaru > 0 ? item.sksBaru : '-'}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold">
                          {item.nilaiBaru ? (
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded font-black text-xs">
                              {item.nilaiBaru} ({item.bobotBaru?.toFixed(2)})
                            </span>
                          ) : (
                            <span className="text-slate-400 font-normal">-</span>
                          )}
                        </td>

                        {/* Status Badge Column */}
                        <td className="py-3 px-4 text-center">
                          {item.status === 'converted_1to1' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Terkonversi (1:1)
                            </span>
                          )}

                          {item.status === 'converted_1toMany' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                              <Layers className="w-3.5 h-3.5 text-indigo-600" /> Opsi Konversi (1:Banyak)
                            </span>
                          )}

                          {item.status === 'unconverted' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Tidak Dikonversi
                            </span>
                          )}

                          {item.status === 'not_in_catalog' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> Konsultasi Prodi
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* TAB 2: REMAINING 2026 COURSES RECAPITULATION */}
      {activeTab === 'remaining' && (
        <>
          {/* MK Pilihan Info Banner */}
          <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-950 font-bold">Informasi Mata Kuliah Pilihan:</strong>
              Dari seluruh daftar mata kuliah pilihan (MK Pilihan) Kurikulum 2026, mahasiswa <strong>hanya wajib mengambil 3 mata kuliah pilihan saja (total 9 SKS)</strong> untuk memenuhi syarat kelulusan.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari nama atau kode MK 2026..."
                value={searchRemaining}
                onChange={e => setSearchRemaining(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Menampilkan <span className="font-bold text-slate-900">{filteredRemaining.length}</span> MK belum diambil (Total {stats.totalRemainingSks2026} SKS)
            </div>
          </div>

          {filteredRemaining.length === 0 ? (
            <div className="text-center py-12 border border-slate-200 rounded-xl bg-emerald-50/50">
              <Check className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-800">Seluruh Mata Kuliah Telah Terpenuhi!</p>
              <p className="text-xs text-slate-500 mt-1">
                Tidak ada mata kuliah Kurikulum 2026 yang tersisa dari hasil konversi ini.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-900 text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4 w-32">Kode MK (2026)</th>
                    <th className="py-3 px-4">Nama Mata Kuliah Kurikulum 2026</th>
                    <th className="py-3 px-4 text-center w-24">SKS</th>
                    <th className="py-3 px-4 text-center w-28">Semester</th>
                    <th className="py-3 px-4 text-center w-36">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRemaining.map((item, idx) => (
                    <tr key={item.kode_baru} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-800">{item.kode_baru}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{item.nama_baru}</td>
                      <td className="py-3 px-4 text-center font-extrabold text-slate-700">
                        <span className="inline-block px-2.5 py-0.5 bg-slate-100 rounded-full">
                          {item.sks_baru} SKS
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-slate-600">
                        Semester {item.sem_baru}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Belum Diambil
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Info Footnote */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 block mb-1">Catatan Aturan Pemetaan & Skala Penilaian:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>
              <strong className="text-slate-800">Skala Penilaian IPK:</strong> A (4.00), A/B (3.50), B (3.00), B/C (2.50), C (2.00), C/D (1.50), D (1.00), E (0.00).
            </li>
            <li>
              <strong className="text-slate-800">Perhitungan IPK:</strong> IPK 2022 dihitung dari seluruh MK diinput. IPK 2026 dihitung dari MK yang berhasil dikonversi (MK tidak dikonversi/SKS hilang tidak dimasukkan dalam IPK 2026).
            </li>
            <li>
              <strong className="text-slate-800">1 MK Lama → 2 MK Baru:</strong> Nilai & bobot dari 1 MK lama ditransfer ke kedua MK baru hasil pemecahan.
            </li>
            <li>
              <strong className="text-slate-800">PLP = </strong> PLP 1 diakui menjadi PLP 4 SKS di Kurikulum 2026.
            </li>
            <li>
              <strong className="text-slate-800">Mata Kuliah Pilihan:</strong> Mahasiswa <strong>hanya perlu mengambil 3 mata kuliah pilihan saja</strong> (total 9 SKS) dari seluruh daftar MK Pilihan untuk syarat kelulusan.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
