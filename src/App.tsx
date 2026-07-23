import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { StudentForm } from './components/StudentForm';
import { CourseInputTable } from './components/CourseInputTable';
import { ConversionResultTable } from './components/ConversionResultTable';
import { PdfExportModal } from './components/PdfExportModal';

import { StudentInfo, StudentInputCourse, GradeType } from './types';
import { processCurriculumConversion, calculateSummaryStats } from './utils/conversionEngine';
import { SAMPLE_STUDENT_INFO, SAMPLE_STUDENT_COURSES } from './utils/sampleData';

export function App() {
  const [activePage, setActivePage] = useState<'landing' | 'simulasi'>('landing');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ nama: '', nim: '' });
  const [courses, setCourses] = useState<StudentInputCourse[]>([]);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Sync activePage with window URL hash e.g. #simulasi or #landing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#simulasi' || hash === '#/simulasi') {
        setActivePage('simulasi');
      } else if (hash === '#landing' || hash === '#/landing' || hash === '#') {
        setActivePage('landing');
      }
    };

    handleHashChange(); // initial check
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: 'landing' | 'simulasi') => {
    setActivePage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute conversion results whenever courses input changes
  const results = useMemo(() => {
    return processCurriculumConversion(courses);
  }, [courses]);

  // Compute summary KPI statistics
  const stats = useMemo(() => {
    return calculateSummaryStats(courses, results);
  }, [courses, results]);

  const handleAddCourse = (newCourse: { nama: string; sks: number; nilai: GradeType }) => {
    const newItem: StudentInputCourse = {
      id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      nama: newCourse.nama,
      sks: newCourse.sks,
      nilai: newCourse.nilai
    };
    setCourses(prev => [...prev, newItem]);
  };

  const handleUpdateCourse = (id: string, updated: { nama: string; sks: number; nilai: GradeType }) => {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, nama: updated.nama, sks: updated.sks, nilai: updated.nilai } : c))
    );
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const handleLoadSample = () => {
    setStudentInfo(SAMPLE_STUDENT_INFO);
    setCourses(SAMPLE_STUDENT_COURSES);
  };

  const handleClearAll = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh data transkrip?')) {
      setCourses([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Sticky Navigation Bar */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Page View Switcher */}
      {activePage === 'landing' ? (
        <LandingPage onStartSimulation={() => handlePageChange('simulasi')} />
      ) : (
        <>
          {/* Tool Simulasi Header */}
          <Header />

          {/* Main Content Body */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Step Progress Visual */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Identitas & Input Transkrip</span>
                  <span className="text-[11px] text-slate-500">Isi Nama/NIM, Unggah Excel atau Ketik MK</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Evaluasi IPK & Pemetaan</span>
                  <span className="text-[11px] text-slate-500">Hitung IPK 2022 vs 2026 otomatis</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Unduh Dokumen PDF</span>
                  <span className="text-[11px] text-slate-500">Cetak hasil evaluasi & sisa SKS 2026</span>
                </div>
              </div>
            </div>

            {/* Section 1: Student Identity & Excel Upload */}
            <StudentForm
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
              courses={courses}
              setCourses={setCourses}
              onLoadSample={handleLoadSample}
              onClearAll={handleClearAll}
            />

            {/* Section 2: Interactive Course Input Form */}
            <CourseInputTable
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onRemoveCourse={handleRemoveCourse}
            />

            {/* Section 3: Conversion Result Table & PDF Export Trigger */}
            <ConversionResultTable
              results={results}
              stats={stats}
              studentInfo={studentInfo}
              onOpenPdfModal={() => setIsPdfModalOpen(true)}
            />
          </main>

          {/* PDF Export Modal */}
          <PdfExportModal
            isOpen={isPdfModalOpen}
            onClose={() => setIsPdfModalOpen(false)}
            studentInfo={studentInfo}
            results={results}
            stats={stats}
          />
        </>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold text-slate-300">
            Platform Informasi & Simulasi Konversi Kurikulum 2026 • Program Studi Pendidikan Teknik Informatika UMS
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Dirancang sebagai platform self-service mandiri mahasiswa. Berjalan 100% di browser tanpa penyimpanan data permanen.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
