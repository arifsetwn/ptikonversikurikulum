import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(28,189,179,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full text-[#1CBDB3]/20 opacity-60"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface HeroSectionProps {
  onStartSimulation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartSimulation }) => {
  return (
    <section className="relative bg-[#1E205C] text-white overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16 border-b border-[#1CBDB3]/30">
      {/* Background Floating Animated Paths */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Refraction Glow Orbs (UMS Toska & Yellow Glow) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1CBDB3]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-[#FFB800]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#1CBDB3]/20 text-[#52E2DA] border border-[#1CBDB3]/40 mb-5 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
          <span>Panduan Resmi Pembaruan Kurikulum 2022 ke 2026 UMS</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight"
        >
          Kurikulum 2026 <br className="hidden sm:inline" />
          <span className="gradient-text-ums">Pendidikan Teknik Informatika UMS</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
        >
          Pembaruan kurikulum terintegrasi EdTech, Artificial Intelligence, dan IT Engineering berstandar Outcome-Based Education (OBE).
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStartSimulation}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#FFB800] hover:bg-[#e5a500] text-[#1E205C] font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#FFB800]/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Simulasikan Konversi Nilai</span>
            <ArrowRight className="w-4 h-4 text-[#1E205C] group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#aturan"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2F3185]/90 hover:bg-[#2F3185] text-white font-bold text-xs sm:text-sm rounded-xl border border-[#1CBDB3]/40 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#1CBDB3]" />
            <span>Kebijakan & Aturan Konversi</span>
          </motion.a>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-[#FFB800] block">146 SKS</span>
            <span className="text-[11px] text-slate-300 font-semibold">Total Kelulusan</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-[#52E2DA] block">6 Track</span>
            <span className="text-[11px] text-slate-300 font-semibold">Learning Path Karir</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-[#FFB800] block">3 MK</span>
            <span className="text-[11px] text-slate-300 font-semibold">Wajib Pilihan (9 SKS)</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-[#52E2DA] block">OBE</span>
            <span className="text-[11px] text-slate-300 font-semibold">Outcome-Based Education</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
