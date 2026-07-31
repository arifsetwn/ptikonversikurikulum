import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Sparkles, Cpu, Laptop, Award, Compass, Target } from 'lucide-react';
import { fontVisi, VISI_KEYWORDS, PEO_DATA } from '../data/landingData';

export const VisiPeoSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#2F3185]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#1CBDB3]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#2F3185]" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-[#1CBDB3]" />;
      default: return <BookOpen className="w-5 h-5 text-[#E5A500]" />;
    }
  };

  return (
    <section id="visi" className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <span className="px-3.5 py-1 bg-[#2F3185]/10 text-[#2F3185] rounded-full text-xs font-extrabold uppercase tracking-wider border border-[#2F3185]/20">
            Visi Keilmuan & Tujuan Pendidikan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Visi Keilmuan & PEO Prodi PTI UMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            Arah dan orientasi keilmuan Kurikulum 2026 Pendidikan Teknik Informatika UMS.
          </p>
        </motion.div>

        {/* Asymmetric Visi Keilmuan Hero Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#1E205C] text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-12 relative overflow-hidden border border-[#1CBDB3]/30"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#1CBDB3]/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1CBDB3]/20 border border-[#1CBDB3]/40 rounded-xl">
              <Compass className="w-5 h-5 text-[#52E2DA]" />
            </div>
            <span className="text-xs font-black text-[#FFB800] tracking-wider uppercase">
              Visi Keilmuan Program Studi
            </span>
          </div>

          <blockquote className="text-base sm:text-xl font-extrabold text-slate-100 leading-relaxed">
            "{fontVisi}"
          </blockquote>
        </motion.div>

        {/* 5 Visi Keywords Bento Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-extrabold text-[#2F3185] mb-6 text-center uppercase tracking-wider">
            5 Pilar Utama Visi Keilmuan
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {VISI_KEYWORDS.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 bg-slate-100/80 rounded-xl w-fit mb-3 border border-slate-200/60">
                    {getIcon(item.iconName)}
                  </div>
                  <h4 className="font-extrabold text-[#2F3185] text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* PEO Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Target className="w-5 h-5 text-[#2F3185]" />
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
                    <span className="px-3 py-1 bg-[#2F3185] text-white font-black rounded-lg text-xs">
                      {peo.kode}
                    </span>
                    <Award className="w-5 h-5 text-[#1CBDB3]" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">{peo.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{peo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
