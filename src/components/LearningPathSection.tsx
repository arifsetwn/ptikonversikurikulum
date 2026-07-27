import React, { useState, useEffect } from 'react';
import {
  Route,
  Cpu,
  Code,
  ShieldCheck,
  BookOpen,
  Gamepad2,
  Rocket,
  Info,
  Image as ImageIcon,
  Maximize2,
  X,
  ZoomIn
} from 'lucide-react';
import { LEARNING_PATHS } from '../data/landingData';
import alurKurikulumImg from '../img/alur_kurikulum.png';
import { motion, AnimatePresence } from 'motion/react';

export const LearningPathSection: React.FC = () => {
  const [selectedPathId, setSelectedPathId] = useState<string>('lp-ai');
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  // Keyboard shortcut ESC to close zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomOpen(false);
    };
    if (isZoomOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  const getPathIcon = (name: string, isDark: boolean = false) => {
    const iconClass = `w-5 h-5 ${isDark ? 'text-[#FFB800]' : 'text-[#159B93]'}`;
    switch (name) {
      case 'Cpu': return <Cpu className={iconClass} />;
      case 'Code': return <Code className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'BookOpen': return <BookOpen className={iconClass} />;
      case 'Gamepad2': return <Gamepad2 className={iconClass} />;
      default: return <Rocket className={iconClass} />;
    }
  };

  const activePath = LEARNING_PATHS.find(p => p.id === selectedPathId) || LEARNING_PATHS[0];

  return (
    <section id="learning-path" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Alur Kurikulum & Track Spesialisasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            Persebaran mata kuliah dan 6 pilihan spesialisasi Karir Learning Path.
          </p>
        </div>

        {/* Alur Kurikulum Image Banner Box */}
        <div className="mb-16 bg-[#1E205C] text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden relative border border-[#1CBDB3]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#1CBDB3] shrink-0" />
              <h3 className="text-xs sm:text-sm font-extrabold tracking-wide text-[#52E2DA]">
                Peta Alur Kurikulum 2026 (Semester 1 s/d Semester 8)
              </h3>
            </div>

            <button
              onClick={() => setIsZoomOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFB800] text-[#1E205C] rounded-xl text-xs font-black transition-all cursor-pointer hover:bg-[#e5a500] self-start sm:self-auto shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Perbesar Gambar (Fullscreen)
            </button>
          </div>

          {/* Interactive Image Container */}
          <div
            onClick={() => setIsZoomOpen(true)}
            className="bg-white rounded-2xl p-2 sm:p-4 overflow-x-auto shadow-inner flex justify-center cursor-zoom-in group relative border border-slate-200/50"
          >
            <img
              src={alurKurikulumImg}
              alt="Peta Alur Kurikulum 2026 PTI UMS"
              className="max-w-full h-auto rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.008]"
            />
            {/* Hover Badge Indicator */}
            <div className="absolute inset-0 bg-[#1E205C]/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center pointer-events-none">
              <span className="px-4 py-2 bg-[#1E205C]/95 text-white text-xs font-extrabold rounded-xl border border-[#1CBDB3]/40 shadow-2xl flex items-center gap-2 backdrop-blur-md">
                <ZoomIn className="w-4 h-4 text-[#FFB800]" /> Klik untuk Memperbesar Gambar
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 mt-3 text-center">
            * Klik gambar untuk membuka tampilan layar penuh (Fullscreen Lightbox).
          </p>
        </div>

        {/* 6 Learning Paths Track Switcher */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
              <Route className="w-5 h-5 text-[#2F3185]" /> Pilih Spesialisasi Learning Path Karir
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Klik salah satu jalur pembelajaran di bawah untuk melihat sebaran rekomendasi mata kuliah pilihan.
            </p>
          </div>

          {/* Path Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
            {LEARNING_PATHS.map(lp => {
              const isSelected = selectedPathId === lp.id;
              return (
                <button
                  key={lp.id}
                  onClick={() => setSelectedPathId(lp.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#1E205C] text-white border-[#1E205C] shadow-lg ring-2 ring-[#1CBDB3]/40'
                      : 'bg-slate-50 text-slate-800 border-slate-200/80 hover:bg-slate-100/80'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-white/10' : 'bg-white shadow-sm border border-slate-200'}`}>
                    {getPathIcon(lp.iconName, isSelected)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm">{lp.name}</h4>
                    <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-[#FFB800] font-extrabold' : 'text-slate-500 font-medium'}`}>
                      {lp.courses.length} Rekomendasi MK Pilihan
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Path Detail Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePath.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-[#1E205C] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1CBDB3]/30"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#1CBDB3]/20 border border-[#1CBDB3]/40 rounded-2xl">
                    {getPathIcon(activePath.iconName, true)}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#FFB800] tracking-wider uppercase block">
                      Detail Spesialisasi Karir
                    </span>
                    <h4 className="text-xl font-extrabold text-white">{activePath.name}</h4>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#FFB800] text-[#1E205C] self-start md:self-auto shadow-sm">
                  Wajib Pilih 3 MK (9 SKS)
                </span>
              </div>

              <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5">
                  <h5 className="text-xs font-black text-[#52E2DA] uppercase tracking-wider mb-2">Deskripsi Track:</h5>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {activePath.desc}
                  </p>
                  <div className="mt-4 p-3 bg-white/[0.05] rounded-xl border border-white/10 text-[11px] text-slate-200 flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                    <span>
                      Mahasiswa bebas memilih 3 mata kuliah dari daftar rekomendasi ini atau mengombinasikan dengan MK pilihan dari track lain.
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7">
                  <h5 className="text-xs font-black text-[#52E2DA] uppercase tracking-wider mb-3">
                    Daftar Rekomendasi MK Pilihan (Kurikulum 2026):
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePath.courses.map((courseName, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-sm flex items-center justify-between text-xs font-bold"
                      >
                        <span className="text-slate-100">{courseName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1CBDB3]/30 text-[#52E2DA] border border-[#1CBDB3]/40 shrink-0 ml-2 font-black">
                          3 SKS
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-[#1E205C]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-6xl flex items-center justify-between text-white mb-3 px-2"
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#FFB800]" />
              <h3 className="text-sm font-bold">Peta Alur Kurikulum 2026 UMS</h3>
            </div>

            <button
              onClick={() => setIsZoomOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <X className="w-5 h-5" /> Tutup (ESC)
            </button>
          </div>

          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[85vh] bg-white rounded-2xl p-2 sm:p-4 overflow-auto shadow-2xl border border-white/20 flex items-center justify-center"
          >
            <img
              src={alurKurikulumImg}
              alt="Peta Alur Kurikulum 2026 Fullscreen View"
              className="w-full h-auto min-w-[700px] object-contain rounded-xl"
            />
          </div>

          <p className="text-xs text-slate-300 mt-3 font-medium">
            * Klik di luar gambar atau tekan <kbd className="px-2 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">Esc</kbd> untuk menutup
          </p>
        </div>
      )}
    </section>
  );
};
