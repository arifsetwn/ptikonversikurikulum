import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, CheckCircle2, GraduationCap, Cpu, Rocket } from 'lucide-react';
import { PROFIL_LULUSAN } from '../data/landingData';
import { motion, AnimatePresence } from 'motion/react';

export const ProfilLulusanSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('pl-2');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getPLIcon = (id: string) => {
    if (id === 'pl-1') return <GraduationCap className="w-5 h-5 text-[#2F3185]" />;
    if (id === 'pl-2') return <Cpu className="w-5 h-5 text-[#1CBDB3]" />;
    return <Rocket className="w-5 h-5 text-[#E5A500]" />;
  };

  return (
    <section id="profil" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            3 Profil Lulusan Utama (PL)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            Lulusan Kurikulum 2026 disiapkan untuk berkiprah di 3 domain karir utama industri EdTech & IT.
          </p>
        </div>

        {/* 3 Profil Cards Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PROFIL_LULUSAN.map(pl => {
            const isExpanded = expandedId === pl.id;
            const visibleCareers = isExpanded ? pl.careers : pl.careers.slice(0, 3);
            const hasMore = pl.careers.length > 3;

            return (
              <div
                key={pl.id}
                className={`rounded-2xl border transition-all overflow-hidden bg-white ${
                  isExpanded
                    ? 'border-[#2F3185] shadow-xl ring-2 ring-[#2F3185]/15'
                    : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-slate-100 bg-[#2F3185]/[0.03]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#2F3185] text-white font-black rounded-xl text-xs">
                      {pl.kode}
                    </span>
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                      {getPLIcon(pl.id)}
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#159B93] uppercase tracking-wider block">
                    {pl.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">{pl.title}</h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">{pl.desc}</p>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-extrabold text-[#2F3185] uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#1CBDB3]" /> Prospek Pekerjaan & Karir:
                    </span>

                    <ul className="space-y-2 text-xs">
                      <AnimatePresence initial={false}>
                        {visibleCareers.map((career, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start gap-2 text-slate-800 font-semibold"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#1CBDB3] shrink-0 mt-0.5" />
                            <span>{career}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>

                    {hasMore && (
                      <button
                        onClick={() => toggleExpand(pl.id)}
                        className="mt-4 text-xs font-bold text-[#2F3185] hover:text-[#1E205C] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'Sembunyikan' : `Lihat Selengkapnya (${pl.careers.length - 3} karir lagi)`}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
