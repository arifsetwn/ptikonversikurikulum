import React from 'react';
import { motion } from 'framer-motion';
import { ATURAN_KONVERSI } from '../data/landingData';
import { ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface AturanKonversiSectionProps {
  onStartSimulation: () => void;
}

export const AturanKonversiSection: React.FC<AturanKonversiSectionProps> = ({ onStartSimulation }) => {
  return (
    <section id="aturan" className="py-16 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="px-3.5 py-1 bg-[#2F3185]/10 text-[#2F3185] rounded-full text-xs font-black uppercase tracking-wider border border-[#2F3185]/20">
            Kebijakan Transisi Kurikulum
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Kebijakan & Aturan Konversi Kurikulum
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            Ketentuan pemberlakuan Kurikulum 2026 bagi mahasiswa aktif PTI UMS.
          </p>
        </motion.div>

        {/* 3 Actionable Aturan Points */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {ATURAN_KONVERSI.map(item => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                item.isHighlight
                  ? 'bg-[#1E205C] text-white border-[#1E205C] shadow-xl ring-2 ring-[#1CBDB3]/30'
                  : 'bg-slate-50 text-slate-800 border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.isHighlight
                        ? 'bg-[#FFB800] text-[#1E205C]'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Point {item.id}
                  </span>

                  <ShieldCheck
                    className={`w-5 h-5 ${item.isHighlight ? 'text-[#1CBDB3]' : 'text-slate-400'}`}
                  />
                </div>

                <h3
                  className={`text-base font-extrabold mb-2 ${
                    item.isHighlight ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>

                <span
                  className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black mb-3 ${
                    item.isHighlight
                      ? 'bg-[#1CBDB3]/20 text-[#52E2DA] border border-[#1CBDB3]/30'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  Status: {item.status}
                </span>

                <p
                  className={`text-xs leading-relaxed font-medium ${
                    item.isHighlight ? 'text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#1E205C] via-[#2F3185] to-[#159B93] text-white rounded-3xl p-8 shadow-xl text-center flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1CBDB3]/30"
        >
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFB800]" /> Ingin Tahu Dampak Konversi pada Nilai Anda?
            </h3>
            <p className="text-xs text-slate-200 mt-1 font-medium max-w-xl">
              Cek hasil kesetaraan mata kuliah 2022 ke 2026 dan perkirakan IPK terbaru Anda dengan Tool Simulasi Konversi.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartSimulation}
            className="px-6 py-3.5 bg-[#FFB800] hover:bg-[#e5a500] text-[#1E205C] font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Simulasikan Sekarang</span>
            <ArrowRight className="w-4 h-4 text-[#1E205C]" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
