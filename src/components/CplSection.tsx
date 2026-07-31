import React, { useState } from 'react';
import { CPL_DATA } from '../data/landingData';
import { motion, AnimatePresence } from 'framer-motion';

export const CplSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCpl = CPL_DATA.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="cpl" className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="px-3.5 py-1 bg-[#1CBDB3]/15 text-[#159B93] rounded-full text-xs font-black uppercase tracking-wider border border-[#1CBDB3]/30">
            Standar Kompetensi Lulusan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Capaian Pembelajaran Lulusan (CPL)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            7 Capaian Pembelajaran Lulusan Kurikulum 2026 yang mengintegrasikan Sikap, Pengetahuan, dan Keterampilan.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#2F3185] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Semua CPL ({CPL_DATA.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Sikap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'Sikap'
                ? 'bg-[#2F3185] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Sikap
          </button>
          <button
            onClick={() => setSelectedCategory('Pengetahuan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'Pengetahuan'
                ? 'bg-[#159B93] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Pengetahuan
          </button>
          <button
            onClick={() => setSelectedCategory('Keterampilan Khusus')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'Keterampilan Khusus'
                ? 'bg-[#2F3185] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Keterampilan Khusus
          </button>
          <button
            onClick={() => setSelectedCategory('Keterampilan Umum')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'Keterampilan Umum'
                ? 'bg-[#159B93] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Keterampilan Umum
          </button>
        </div>

        {/* CPL Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCpl.map(cpl => (
              <motion.div
                key={cpl.kode}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm card-taste-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#2F3185] text-white font-black rounded-lg text-xs">
                      {cpl.kode}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        cpl.category === 'Sikap'
                          ? 'bg-[#2F3185]/10 text-[#2F3185]'
                          : cpl.category === 'Pengetahuan'
                          ? 'bg-[#1CBDB3]/15 text-[#159B93]'
                          : cpl.category === 'Keterampilan Khusus'
                          ? 'bg-[#FFB800]/20 text-[#8c6500]'
                          : 'bg-[#1CBDB3]/15 text-[#159B93]'
                      }`}
                    >
                      {cpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mt-2">
                    {cpl.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
