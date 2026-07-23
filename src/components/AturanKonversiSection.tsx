import React from 'react';
import { ShieldCheck, AlertCircle, ArrowRight, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { ATURAN_KONVERSI } from '../data/landingData';

interface AturanKonversiSectionProps {
  onStartSimulation: () => void;
}

export const AturanKonversiSection: React.FC<AturanKonversiSectionProps> = ({ onStartSimulation }) => {
  return (
    <section id="aturan" className="py-16 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            Kebijakan Resmi Prodi
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Aturan Pemberlakuan Konversi Kurikulum
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Harap memperhatikan 3 aturan utama penerapan Kurikulum 2026 bagi mahasiswa aktif PTI UMS.
          </p>
        </div>

        {/* 3 Actionable Aturan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ATURAN_KONVERSI.map(item => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                item.isHighlight
                  ? 'bg-gradient-to-b from-blue-900/60 to-slate-900 border-blue-500/50 ring-1 ring-blue-400/20 shadow-xl'
                  : 'bg-slate-800/60 border-slate-700/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                    0{item.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                      item.isHighlight
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actionable CTA Box */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-10 shadow-2xl text-center max-w-4xl mx-auto border border-blue-400/30">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Langsung Cek Konversi Nilai Anda
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-2">
            Apakah Nilai Anda Sudah Memenuhi Kurikulum 2026?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto mb-6">
            Gunakan tool simulasi konversi mandiri 100% gratis & tanpa login untuk mengecek kesetaraan mata kuliah dan IPK 2026 secara instan.
          </p>

          <button
            onClick={onStartSimulation}
            className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm rounded-2xl shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Mulai Simulasi Konversi Nilai Sekarang</span>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
