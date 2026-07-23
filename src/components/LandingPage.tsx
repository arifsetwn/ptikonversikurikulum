import React from 'react';
import { HeroSection } from './HeroSection';
import { VisiPeoSection } from './VisiPeoSection';
import { ProfilLulusanSection } from './ProfilLulusanSection';
import { CplSection } from './CplSection';
import { LearningPathSection } from './LearningPathSection';
import { AturanKonversiSection } from './AturanKonversiSection';
import { PerubahanKurikulumSection } from './PerubahanKurikulumSection';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStartSimulation: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSimulation }) => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* 5.1 Hero Section */}
      <HeroSection onStartSimulation={onStartSimulation} />

      {/* 5.2 & 5.4 Visi Keilmuan & PEO Section */}
      <VisiPeoSection />

      {/* 5.3 Profil Lulusan (PL) Section */}
      <ProfilLulusanSection />

      {/* 5.5 Capaian Pembelajaran Lulusan (CPL) Section */}
      <CplSection />

      {/* 5.6 Alur Kurikulum & Learning Path Section */}
      <LearningPathSection />

      {/* 5.7 Aturan Konversi Section */}
      <AturanKonversiSection onStartSimulation={onStartSimulation} />

      {/* 5.8 & 5.9 Catatan Perubahan Umum & Khusus Section */}
      <PerubahanKurikulumSection />

      {/* 5.10 CTA Penutup (Footer CTA Section) */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-center border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" /> Siap Mengecek Transkrip Nilai Anda?
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Sudah Tahu Perubahannya? Cek Langsung Hasil Konversi Nilai Anda Sekarang!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Gunakan tool simulasi konversi mandiri prodi untuk mengecek kesetaraan mata kuliah 2022 ke 2026, sisa SKS yang harus diambil, dan estimasi IPK terbaru Anda.
          </p>

          <button
            onClick={onStartSimulation}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Simulasikan Konversi Nilai Saya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
