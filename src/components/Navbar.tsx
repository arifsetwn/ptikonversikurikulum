import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Menu, X, BookOpen, Sparkles } from 'lucide-react';
import logoPti from '../img/logo_pti.png';

interface NavbarProps {
  activePage: 'landing' | 'simulasi';
  setActivePage: (page: 'landing' | 'simulasi') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (activePage !== 'landing') {
      setActivePage('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#1E205C]/95 backdrop-blur-xl border-b border-[#1CBDB3]/30 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Logo & Brand Identity */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="p-1.5 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:scale-105 transition-transform">
              <img src={logoPti} alt="Logo PTI UMS" className="h-7 w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
                Pendidikan Teknik Informatika
              </span>
              <span className="text-[10px] text-[#FFB800] font-extrabold tracking-wider uppercase block">
                Kurikulum 2026 UMS
              </span>
            </div>
          </motion.div>

          {/* Center: Desktop Navigation Links (Single Line, Clean Spacing) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-extrabold text-slate-200 whitespace-nowrap">
            <button
              onClick={() => scrollToSection('visi')}
              className="hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              Visi & PEO
            </button>
            <button
              onClick={() => scrollToSection('profil')}
              className="hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              Profil Lulusan
            </button>
            <button
              onClick={() => scrollToSection('cpl')}
              className="hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              CPL
            </button>
            <button
              onClick={() => scrollToSection('learning-path')}
              className="hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              Learning Path
            </button>
            <button
              onClick={() => scrollToSection('aturan')}
              className="hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              Aturan Konversi
            </button>
            <button
              onClick={() => scrollToSection('perubahan')}
              className="hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              Perubahan MK
            </button>
          </div>

          {/* Right: Clean Single CTA Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {activePage === 'landing' ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActivePage('simulasi')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFB800] to-[#e5a500] hover:from-[#e5a500] hover:to-[#cc9300] text-[#1E205C] font-black rounded-xl text-xs shadow-md shadow-[#FFB800]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <ArrowRightLeft className="w-4 h-4 text-[#1E205C]" />
                <span>Tool Simulasi Konversi</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActivePage('landing')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1CBDB3] hover:bg-[#159B93] text-slate-950 font-black rounded-xl text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>Informasi Kurikulum</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePage(activePage === 'landing' ? 'simulasi' : 'landing')}
              className="px-3 py-1.5 bg-[#FFB800] text-[#1E205C] text-xs font-black rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              {activePage === 'landing' ? (
                <>
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Simulasi
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" /> Informasi
                </>
              )}
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-[#1E205C] border-b border-[#1CBDB3]/30 px-4 pt-2 pb-4 space-y-2 text-xs font-bold overflow-hidden"
          >
            <button
              onClick={() => scrollToSection('visi')}
              className="block w-full text-left py-2 text-slate-200 hover:text-[#FFB800]"
            >
              Visi Keilmuan & PEO
            </button>
            <button
              onClick={() => scrollToSection('profil')}
              className="block w-full text-left py-2 text-slate-200 hover:text-[#FFB800]"
            >
              Profil Lulusan (PL)
            </button>
            <button
              onClick={() => scrollToSection('cpl')}
              className="block w-full text-left py-2 text-slate-200 hover:text-[#FFB800]"
            >
              Capaian Pembelajaran (CPL)
            </button>
            <button
              onClick={() => scrollToSection('learning-path')}
              className="block w-full text-left py-2 text-slate-200 hover:text-[#FFB800]"
            >
              Peta Semester (Learning Path)
            </button>
            <button
              onClick={() => scrollToSection('aturan')}
              className="block w-full text-left py-2 text-slate-200 hover:text-[#FFB800]"
            >
              Aturan Konversi
            </button>
            <button
              onClick={() => scrollToSection('perubahan')}
              className="block w-full text-left py-2 text-slate-200 hover:text-[#FFB800]"
            >
              Perubahan Mata Kuliah
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
