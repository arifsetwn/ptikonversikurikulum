import React from 'react';
import { BookOpen, GraduationCap, Sparkles, Cpu, Laptop, Award, Compass, Target } from 'lucide-react';
import { fontVisi, VISI_KEYWORDS, PEO_DATA } from '../data/landingData';

export const VisiPeoSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-emerald-600" />;
      default: return <BookOpen className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section id="visi" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (No eyebrow per Eyebrow Restraint rule) */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visi Keilmuan & Tujuan Pendidikan Prodi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            Arah dan orientasi keilmuan Kurikulum 2026 Pendidikan Teknik Informatika UMS.
          </p>
        </div>

        {/* Asymmetric Visi Keilmuan Hero Box */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-12 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/15 border border-blue-400/20 rounded-xl">
              <Compass className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-bold text-blue-300 tracking-wider">
              Visi Keilmuan Program Studi
            </span>
          </div>

          <blockquote className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
            "{fontVisi}"
          </blockquote>
        </div>

        {/* 5 Visi Keywords Bento Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-bold text-slate-900 mb-6 text-center">
            5 Pilar Utama Visi Keilmuan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VISI_KEYWORDS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm card-taste-hover flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 bg-slate-100/80 rounded-xl w-fit mb-3 border border-slate-200/60">
                    {getIcon(item.iconName)}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PEO Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Tujuan Pendidikan Program Studi (PEO)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PEO_DATA.map(peo => (
              <div
                key={peo.kode}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm card-taste-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-extrabold rounded-lg text-xs border border-indigo-200/80">
                      {peo.kode}
                    </span>
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{peo.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{peo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
