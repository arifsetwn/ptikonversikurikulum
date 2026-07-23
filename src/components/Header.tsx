import React from 'react';
import { ArrowRightLeft, ShieldAlert } from 'lucide-react';
import logoPti from '../img/logo_pti.webp';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-2xl shadow-lg shrink-0 border border-slate-200">
              <img
                src={logoPti}
                alt="Logo PTI"
                className="w-14 h-14 object-contain"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Program Studi Teknik Informatika
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <ArrowRightLeft className="w-3 h-3" /> Kurikulum 2022 → 2026
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Simulasi Konversi Kurikulum
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Alat bantu mandiri (self-service) mahasiswa untuk mengecek pemetaan mata kuliah & SKS secara otomatis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-3 rounded-xl">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-amber-300 block">Simulasi Mandiri:</span>
              Hasil untuk kebutuhan konsultasi akademik prodi & bukan dokumen resmi UMS.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
