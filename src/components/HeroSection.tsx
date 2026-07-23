import React from 'react';
import { ArrowRight, Sparkles, GraduationCap, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onStartSimulation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartSimulation }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Panduan Resmi Pembaruan Kurikulum 2022 → 2026</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Kurikulum 2026 <br className="hidden sm:inline" />
          <span className="gradient-text">Pendidikan Teknik Informatika</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
          Program Studi Pendidikan Teknik Informatika memperbarui kurikulum untuk membekali lulusan dengan keahlian EdTech, Artificial Intelligence, dan IT Engineering masa depan.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartSimulation}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Simulasikan Konversi Nilai Saya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#aturan"
            className="w-full sm:w-auto px-6 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-2xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Aturan & Kebijakan Konversi</span>
          </a>
        </div>

        {/* KPI Key Badges */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-black text-white block">146 SKS</span>
            <span className="text-xs text-slate-400">Total SKS Lulus</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-black text-blue-400 block">6 Track</span>
            <span className="text-xs text-slate-400">Learning Paths</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-black text-indigo-400 block">3 MK</span>
            <span className="text-xs text-slate-400">Wajib Pilihan (9 SKS)</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-black text-emerald-400 block">OBE</span>
            <span className="text-xs text-slate-400">Implementasi Kampus Berdampak</span>
          </div>
        </div>
      </div>
    </section>
  );
};
