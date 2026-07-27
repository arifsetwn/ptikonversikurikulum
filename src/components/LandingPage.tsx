import React from 'react';
import { HeroSection } from './HeroSection';
import { VisiPeoSection } from './VisiPeoSection';
import { ProfilLulusanSection } from './ProfilLulusanSection';
import { CplSection } from './CplSection';
import { LearningPathSection } from './LearningPathSection';
import { AturanKonversiSection } from './AturanKonversiSection';
import { PerubahanKurikulumSection } from './PerubahanKurikulumSection';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStartSimulation: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSimulation }) => {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <HeroSection onStartSimulation={onStartSimulation} />

      {/* Visi Keilmuan & PEO Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <VisiPeoSection />
      </motion.div>

      {/* Profil Lulusan (PL) Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <ProfilLulusanSection />
      </motion.div>

      {/* Capaian Pembelajaran Lulusan (CPL) Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <CplSection />
      </motion.div>

      {/* Alur Kurikulum & Learning Path Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <LearningPathSection />
      </motion.div>

      {/* Aturan Konversi Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <AturanKonversiSection onStartSimulation={onStartSimulation} />
      </motion.div>

      {/* Catatan Perubahan Kurikulum Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <PerubahanKurikulumSection />
      </motion.div>

      {/* Footer CTA Section */}
      <section className="py-20 bg-[#1E205C] text-white text-center border-t border-[#1CBDB3]/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1CBDB3]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#1CBDB3]/20 text-[#52E2DA] border border-[#1CBDB3]/40 mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FFB800]" /> Siap Mengecek Transkrip Nilai Anda?
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Sudah Tahu Perubahannya? Cek Langsung Hasil Konversi Nilai Anda Sekarang!
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Gunakan tool simulasi konversi mandiri prodi untuk mengecek kesetaraan mata kuliah 2022 ke 2026, sisa SKS yang harus diambil, dan estimasi IPK terbaru Anda.
          </p>

          <button
            onClick={onStartSimulation}
            className="px-8 py-4 bg-gradient-to-r from-[#FFB800] to-[#e5a500] hover:from-[#e5a500] hover:to-[#cc9300] text-[#1E205C] font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-[#FFB800]/25 active:scale-[0.98] transition-all inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Simulasikan Konversi Nilai</span>
            <ArrowRight className="w-4 h-4 text-[#1E205C] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
