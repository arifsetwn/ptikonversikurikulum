import React, { useState } from 'react';
import { Layers, ArrowRight, ChevronDown, ChevronUp, AlertCircle, BookOpen, Clock, Sparkles } from 'lucide-react';
import { GENERAL_CHANGES, COURSE_NAME_CHANGES, SKS_CHANGES } from '../data/landingData';

export const PerubahanKurikulumSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nama' | 'sks' | 'baru' | 'wajib'>('nama');
  const [searchName, setSearchName] = useState('');

  const filteredNameChanges = COURSE_NAME_CHANGES.filter(item => {
    if (!searchName.trim()) return true;
    const q = searchName.toLowerCase();
    return (
      item.oldName.toLowerCase().includes(q) ||
      item.newName.toLowerCase().includes(q) ||
      (item.oldSem && item.oldSem.toLowerCase().includes(q)) ||
      (item.newSem && item.newSem.toLowerCase().includes(q))
    );
  });

  return (
    <section id="perubahan" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Rincian Perubahan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Catatan Perubahan Kurikulum (2022 → 2026)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Rangkuman perubahan umum dan pemetaan khusus struktur mata kuliah 2026.
          </p>
        </div>

        {/* 5 Perubahan Umum Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-6 text-center">
            5 Perubahan Struktur Umum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {GENERAL_CHANGES.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-1">
                  Point {idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h4>
                <div className="space-y-1 text-xs font-bold mb-3">
                  <div className="text-slate-400 line-through">2022: {item.oldVal}</div>
                  <div className="text-blue-700 font-extrabold">2026: {item.newVal}</div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Perubahan Khusus Interactive Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Rincian Perubahan Khusus Mata Kuliah
            </h3>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('nama')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'nama'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Perubahan Nama & Semester MK ({COURSE_NAME_CHANGES.length} MK)
            </button>

            <button
              onClick={() => setActiveTab('sks')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sks'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Perubahan Bobot SKS ({SKS_CHANGES.length} MK)
            </button>

            <button
              onClick={() => setActiveTab('baru')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'baru'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Mata Kuliah Baru (2 MK)
            </button>

            <button
              onClick={() => setActiveTab('wajib')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'wajib'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pilihan Jadi Wajib (2 MK)
            </button>
          </div>

          {/* TAB 1: PERUBAHAN NAMA & SEMESTER MK */}
          {activeTab === 'nama' && (
            <div>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <input
                  type="text"
                  placeholder="Cari nama mata kuliah / semester..."
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                  className="w-full max-w-md px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-500 italic">
                  * Menampilkan pemetaan nama mata kuliah & perpindahan semester.
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 w-12 text-center">No</th>
                      <th className="py-3 px-4">Kurikulum 2022 (Mata Kuliah & Semester)</th>
                      <th className="py-3 px-4 w-10 text-center"></th>
                      <th className="py-3 px-4">Kurikulum 2026 (Mata Kuliah & Semester)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredNameChanges.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 text-slate-700 font-bold">
                          <span>{item.oldName}</span>
                          {item.oldSem && (
                            <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-extrabold border border-slate-200">
                              {item.oldSem}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <ArrowRight className="w-4 h-4 text-blue-600 inline-block" />
                        </td>
                        <td className="py-3 px-4 font-bold text-blue-900">
                          <span>{item.newName}</span>
                          {item.newSem && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-extrabold border border-blue-200">
                              {item.newSem}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PERUBAHAN BOBOT SKS */}
          {activeTab === 'sks' && (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Mata Kuliah</th>
                    <th className="py-3 px-4 text-center w-24">SKS 2022</th>
                    <th className="py-3 px-4 text-center w-24">SKS 2026</th>
                    <th className="py-3 px-4">Keterangan Perubahan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {SKS_CHANGES.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{item.courseName}</td>
                      <td className="py-3 px-4 text-center font-bold text-slate-500">{item.oldSks} SKS</td>
                      <td className="py-3 px-4 text-center font-extrabold text-blue-700">
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded-full">
                          {item.newSks} SKS
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{item.note || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: MATA KULIAH BARU */}
          {activeTab === 'baru' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-200 text-indigo-900 uppercase">
                  Semester 7 • 2 SKS
                </span>
                <h4 className="font-extrabold text-indigo-950 text-base mt-2">Life Skills</h4>
                <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                  Mata kuliah mandiri baru untuk pembekalan kepemimpinan, etika profesional, dan kemampuan adaptasi karir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-200 text-indigo-900 uppercase">
                  Semester 7 • 2 SKS
                </span>
                <h4 className="font-extrabold text-indigo-950 text-base mt-2">Seminar Proposal</h4>
                <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                  Pecahan tahap ujian proposal Skripsi agar mahasiswa fokus menyelesaikan tahapan riset ilmiah secara terstruktur.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PILIHAN JADI WAJIB */}
          {activeTab === 'wajib' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-200 text-emerald-900 uppercase">
                  Sebelumnya MK Pilihan → Kini Wajib Semester 4 (2 SKS)
                </span>
                <h4 className="font-extrabold text-emerald-950 text-base mt-2">Kecerdasan Buatan (AI)</h4>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Wajib diambil oleh seluruh mahasiswa PTI untuk membekali dasar-dasar AI & Machine Learning di bidang pendidikan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-200 text-emerald-900 uppercase">
                  Sebelumnya MK Pilihan → Kini Wajib Semester 6 (3 SKS)
                </span>
                <h4 className="font-extrabold text-emerald-950 text-base mt-2">Internet of Things (IoT)</h4>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Wajib diambil untuk penguasaan sistem sensor, mikrokontroler, dan perangkat keras pintar terintegrasi internet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
