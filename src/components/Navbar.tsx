import React, { useState } from 'react';
import { ArrowRightLeft, Menu, X, Sparkles } from 'lucide-react';
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
    <nav className="sticky top-0 z-40 bg-[#1E205C]/90 backdrop-blur-xl border-b border-[#1CBDB3]/30 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="p-1.5 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:scale-105 transition-transform">
              <img src={logoPti} alt="Logo PTI UMS" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
                Pendidikan Teknik Informatika
              </span>
              <span className="text-[10px] text-[#FFB800] font-extrabold tracking-wider uppercase block">
                Kurikulum 2026 UMS
              </span>
            </div>
          </div>

          {/* Desktop Single-Line Navigation */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-200">
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

          {/* Actionable Switcher & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="bg-[#2F3185] p-1 rounded-xl border border-[#1CBDB3]/40 flex items-center gap-1">
              <button
                onClick={() => setActivePage('landing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePage === 'landing'
                    ? 'bg-[#1CBDB3] text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Informasi Kurikulum
              </button>
              <button
                onClick={() => setActivePage('simulasi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePage === 'simulasi'
                    ? 'bg-[#1CBDB3] text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" /> Tool Simulasi
              </button>
            </div>

            {activePage === 'landing' && (
              <button
                onClick={() => setActivePage('simulasi')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FFB800] to-[#e5a500] hover:from-[#e5a500] hover:to-[#cc9300] text-slate-950 font-black rounded-xl text-xs shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" /> Simulasikan Konversi Nilai
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setActivePage(activePage === 'landing' ? 'simulasi' : 'landing')}
              className="px-2.5 py-1.5 bg-[#FFB800] text-slate-950 text-xs font-black rounded-lg flex items-center gap-1"
            >
              {activePage === 'landing' ? 'Simulasi' : 'Informasi'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#1E205C] border-b border-[#1CBDB3]/30 px-4 pt-2 pb-4 space-y-2 text-xs font-semibold">
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
            Alur Kurikulum & Learning Path
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
        </div>
      )}
    </nav>
  );
};
