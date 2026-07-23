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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8 card-hover-glow">
      {/* Main Header & PDF Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200">
                Langkah Final
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Hasil Evaluasi, Pemetaan & Perhitungan IPK (2022 → 2026)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Rincian IPK sebelum/setelah konversi, pemetaan mata kuliah diakui dan sisa MK 2026.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPdfModal}
          disabled={results.length === 0}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" /> Unduh Dokumen PDF
        </button>
      </div>

      {/* KPI Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 py-6">
        {/* Card 1: IPK Sebelum Konversi (2022) */}
        <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider mb-1 flex items-center justify-between">
            IPK 2022
            <span className="text-[9px] bg-blue-200/80 text-blue-950 px-1.5 py-0.5 rounded font-black">2022</span>
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black text-blue-950 tracking-tight">
              {stats.ipkSebelumKonversi.toFixed(2)}
            </span>
            <span className="text-xs text-blue-700 font-bold">/ 4.00</span>
          </div>
          <span className="text-[10px] text-blue-700 font-semibold block">
            {stats.totalInputSks} SKS ({stats.totalInputCourses} MK)
          </span>
        </div>

        {/* Card 2: IPK Setelah Konversi (2026) */}
        <div className="p-4 rounded-2xl bg-indigo-50/90 border border-indigo-200 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] font-extrabold text-indigo-900 uppercase tracking-wider mb-1 flex items-center justify-between">
            IPK 2026
            <span className="text-[9px] bg-indigo-200/80 text-indigo-950 px-1.5 py-0.5 rounded font-black">2026</span>
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black text-indigo-950 tracking-tight">
              {stats.ipkSetelahKonversi.toFixed(2)}
            </span>
            <span className="text-xs text-indigo-700 font-bold">/ 4.00</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold">
            {ipkDelta > 0 ? (
              <span className="text-emerald-700 font-black flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +{ipkDelta.toFixed(2)}
              </span>
            ) : ipkDelta < 0 ? (
              <span className="text-rose-700 font-black flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> {ipkDelta.toFixed(2)}
              </span>
            ) : (
              <span className="text-slate-600 font-black flex items-center gap-0.5">
                <Minus className="w-3 h-3" /> Tetap
              </span>
            )}
            <span className="text-slate-500 font-semibold">vs 2022</span>
          </div>
        </div>

        {/* Card 3: Total Input SKS */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Total SKS 2022
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black text-slate-900">{stats.totalInputSks}</span>
            <span className="text-xs text-slate-500 font-bold">SKS</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block">
            {stats.totalInputCourses} Mata Kuliah
          </span>
        </div>

        {/* Card 4: Total Converted SKS */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
            SKS Diakui 2026
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black text-emerald-800">{stats.totalConvertedSks}</span>
            <span className="text-xs text-emerald-700 font-bold">SKS</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold block">
            Terkonversi ke 2026
          </span>
        </div>

        {/* Card 5: Total Lost SKS */}
        <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider mb-1">
            SKS Hilang
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black text-rose-800">{stats.totalUnconvertedSks}</span>
            <span className="text-xs text-rose-700 font-bold">SKS</span>
          </div>
          <span className="text-[10px] text-rose-700 font-semibold block">
            Tidak Diakui di 2026
          </span>
        </div>

        {/* Card 6: SKS 2026 Belum Diambil */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">
            SKS Belum Diambil
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black text-amber-800">{stats.totalRemainingSks2026}</span>
            <span className="text-xs text-amber-700 font-bold">SKS</span>
          </div>
          <span className="text-[10px] text-amber-700 font-semibold block">
            Target Lulus 145 SKS
          </span>
        </div>
      </div>

      {/* Main View Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('conversion')}
          className={`pb-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${activeTab === 'conversion'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Tabel Hasil Pemetaan & Nilai Konversi
          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-900 font-black">
            {results.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('remaining')}
          className={`pb-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${activeTab === 'remaining'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <BookMarked className="w-4 h-4" /> Rekapitulasi MK 2026 Belum Diambil
          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-black">
            {remainingCourses.length} MK
          </span>
        </button>
      </div>

      {/* TAB 1: CONVERSION RESULTS */}
      {activeTab === 'conversion' && (
        <>
          {/* Sub-Filters for Conversion Table */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Semua Hasil ({results.length})
              </button>
              <button
                onClick={() => setFilterStatus('converted')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterStatus === 'converted' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Terkonversi ({results.filter(r => r.status === 'converted_1to1' || r.status === 'converted_1toMany').length})
              </button>
              <button
                onClick={() => setFilterStatus('unconverted')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterStatus === 'unconverted' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                SKS Hilang ({results.filter(r => r.status === 'unconverted').length})
              </button>
              <button
                onClick={() => setFilterStatus('multimatch')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterStatus === 'multimatch' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Multi-Match ({results.filter(r => r.status === 'converted_1toMany').length})
              </button>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {filteredResults.length} dari {results.length} baris
            </span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-base font-extrabold text-slate-800">Tabel Hasil Belum Tersedia</p>
              <p className="text-xs text-slate-500 mt-1">
                Silakan unggah transkrip PDF atau muat contoh transkrip.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
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

                    let rowBgClass = 'hover:bg-slate-50/80';
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
                          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded font-black text-xs">
                            {item.nilaiLama} ({item.bobotLama.toFixed(2)})
                          </span>
                        </td>

                        {/* 2026 Columns */}
                        <td className="py-3 px-3 font-mono font-bold text-blue-900">
                          {item.kodeBaru || '-'}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-blue-950">
                          {item.namaBaru || (
                            <span className="text-slate-400 italic">Tidak ada padanan</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold text-blue-900">
                          {item.sksBaru || 0}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold">
                          {item.nilaiBaru ? (
                            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-900 rounded font-black text-xs">
                              {item.nilaiBaru} ({item.bobotBaru !== null ? item.bobotBaru.toFixed(2) : '0.00'})
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3 px-4 text-center">
                          {item.status === 'converted_1to1' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Diakui 1:1
                            </span>
                          )}
                          {item.status === 'converted_1toMany' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-800 border border-indigo-300">
                              <Layers className="w-3 h-3 text-indigo-600" /> Opsi Konversi
                            </span>
                          )}
                          {item.status === 'unconverted' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300">
                              <AlertTriangle className="w-3 h-3 text-rose-600" /> SKS Hilang
                            </span>
                          )}
                          {item.status === 'not_in_catalog' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                              <HelpCircle className="w-3 h-3 text-amber-600" /> Luar Katalog
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

      {/* TAB 2: REMAINING 2026 COURSES */}
      {activeTab === 'remaining' && (
        <>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari mata kuliah 2026..."
                value={searchRemaining}
                onChange={e => setSearchRemaining(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {filteredRemaining.length} MK 2026 yang belum terpenuhi
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-3 w-28">Kode MK</th>
                  <th className="py-3 px-4">Nama Mata Kuliah Kurikulum 2026</th>
                  <th className="py-3 px-3 text-center w-24">Bobot SKS</th>
                  <th className="py-3 px-3 text-center w-24">Semester</th>
                  <th className="py-3 px-4 w-32 text-center">Kategori</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRemaining.map((course, idx) => (
                  <tr key={course.kode_baru} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-800">{course.kode_baru}</td>
                    <td className="py-3 px-4 font-extrabold text-slate-900">{course.nama_baru}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full font-black text-xs">
                        {course.sks_baru} SKS
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-600">
                      Semester {course.sem_baru}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${course.sem_baru.toLowerCase().includes('pilihan')
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {course.sem_baru.toLowerCase().includes('pilihan') ? 'Pilihan' : 'Wajib'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
