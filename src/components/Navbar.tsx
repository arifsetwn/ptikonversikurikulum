import React, { useState } from 'react';
import { ArrowRightLeft, Menu, X, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
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
    <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-1.5 bg-white rounded-xl shadow-md border border-slate-200 group-hover:scale-105 transition-transform">
              <img src={logoPti} alt="Logo PTI" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
                Pendidikan Teknik Informatika
              </span>
              <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase block">
                Kurikulum 2026 • UMS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => scrollToSection('visi')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Visi & PEO
            </button>
            <button
              onClick={() => scrollToSection('profil')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Profil Lulusan
            </button>
            <button
              onClick={() => scrollToSection('cpl')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              CPL
            </button>
            <button
              onClick={() => scrollToSection('learning-path')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Learning Path
            </button>
            <button
              onClick={() => scrollToSection('aturan')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Aturan Konversi
            </button>
            <button
              onClick={() => scrollToSection('perubahan')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Perubahan MK
            </button>
          </div>

          {/* View Switch Buttons & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
              <button
                onClick={() => setActivePage('landing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePage === 'landing'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Informasi Kurikulum
              </button>
              <button
                onClick={() => setActivePage('simulasi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePage === 'simulasi'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" /> Tool Simulasi
              </button>
            </div>

            {activePage === 'landing' && (
              <button
                onClick={() => setActivePage('simulasi')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Simulasi Konversi
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setActivePage(activePage === 'landing' ? 'simulasi' : 'landing')}
              className="px-2.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1"
            >
              {activePage === 'landing' ? 'Simulasi' : 'Informasi'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 text-xs font-semibold">
          <button
            onClick={() => scrollToSection('visi')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Visi Keilmuan & PEO
          </button>
          <button
            onClick={() => scrollToSection('profil')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Profil Lulusan (PL)
          </button>
          <button
            onClick={() => scrollToSection('cpl')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Capaian Pembelajaran (CPL)
          </button>
          <button
            onClick={() => scrollToSection('learning-path')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Alur Kurikulum & Learning Path
          </button>
          <button
            onClick={() => scrollToSection('aturan')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Aturan Konversi
          </button>
          <button
            onClick={() => scrollToSection('perubahan')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Perubahan Mata Kuliah
          </button>
        </div>
      )}
    </nav>
  );
};
