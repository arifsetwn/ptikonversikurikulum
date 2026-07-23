import React, { useState } from 'react';
import { UserCheck, Briefcase, ChevronDown, ChevronUp, CheckCircle2, GraduationCap, Cpu, Rocket } from 'lucide-react';
import { PROFIL_LULUSAN, ProfilLulusan } from '../data/landingData';

export const ProfilLulusanSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('pl-2'); // PL2 expanded by default

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getPLIcon = (id: string) => {
    if (id === 'pl-1') return <GraduationCap className="w-6 h-6 text-blue-600" />;
    if (id === 'pl-2') return <Cpu className="w-6 h-6 text-indigo-600" />;
    return <Rocket className="w-6 h-6 text-emerald-600" />;
  };

  return (
    <section id="profil" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Prospek Karir
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            3 Profil Lulusan Utama (PL)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Lulusan Kurikulum 2026 disiapkan untuk berkiprah di 3 domain karir utama industri EdTech & IT.
          </p>
        </div>

        {/* 3 Profil Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PROFIL_LULUSAN.map(pl => {
            const isExpanded = expandedId === pl.id;
            const visibleCareers = isExpanded ? pl.careers : pl.careers.slice(0, 3);
            const hasMore = pl.careers.length > 3;

            return (
              <div
                key={pl.id}
                className={`rounded-3xl border transition-all overflow-hidden bg-white ${
                  isExpanded
                    ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/10'
                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 font-extrabold rounded-xl text-xs">
                      {pl.kode}
                    </span>
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200">
                      {getPLIcon(pl.id)}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {pl.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{pl.title}</h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{pl.desc}</p>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Prospek Pekerjaan & Karir:
                    </span>

                    <ul className="space-y-2 text-xs">
                      {visibleCareers.map((career, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-800 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{career}</span>
                        </li>
                      ))}
                    </ul>

                    {hasMore && (
                      <button
                        onClick={() => toggleExpand(pl.id)}
                        className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
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
