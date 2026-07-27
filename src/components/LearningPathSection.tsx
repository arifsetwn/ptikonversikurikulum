import React, { useState } from 'react';
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
} from 'lucide-react';
import { LEARNING_PATHS } from '../data/landingData';
import alurKurikulumImg from '../img/alur_kurikulum.png';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageZoom } from './ui/image-zoom';

export const LearningPathSection: React.FC = () => {
  const [selectedPathId, setSelectedPathId] = useState<string>('lp-ai');

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

        {/* Alur Kurikulum Image Banner Box with Animate UI ImageZoom */}
        <div className="mb-16 bg-[#1E205C] text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden relative border border-[#1CBDB3]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#1CBDB3] shrink-0" />
              <h3 className="text-xs sm:text-sm font-extrabold tracking-wide text-[#52E2DA]">
                Peta Alur Kurikulum 2026 (Semester 1 s/d Semester 8)
              </h3>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 rounded-xl text-xs font-black self-start sm:self-auto backdrop-blur-md">
              <Maximize2 className="w-3.5 h-3.5" /> Animate UI Spring Zoom Enabled
            </span>
          </div>

          {/* Animate UI Interactive ImageZoom Container */}
          <div className="bg-white rounded-2xl p-2 sm:p-4 shadow-inner flex justify-center border border-slate-200/50">
            <ImageZoom
              src={alurKurikulumImg}
              alt="Peta Alur Kurikulum 2026 PTI UMS"
              zoomScale={2.4}
              zoomOnHover={true}
              zoomOnClick={true}
              className="w-full max-w-full"
            />
          </div>

          <p className="text-[11px] text-slate-300 mt-3 text-center">
            * Arahkan kursor untuk zoom interaktif (Spring Hover) atau klik gambar untuk mode Fullscreen Lightbox.
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
    </section>
  );
};
