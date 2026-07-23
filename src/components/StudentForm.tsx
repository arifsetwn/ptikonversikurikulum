import React, { useRef, useState } from 'react';
import { User, CreditCard, Upload, Sparkles, FileText, Trash2, AlertCircle, Loader2, CheckCircle2, FileCheck, ArrowRight } from 'lucide-react';
import { StudentInfo, StudentInputCourse } from '../types';
import { parseTranscriptPdf } from '../utils/pdfParser';

interface StudentFormProps {
  studentInfo: StudentInfo;
  setStudentInfo: React.Dispatch<React.SetStateAction<StudentInfo>>;
  courses: StudentInputCourse[];
  setCourses: React.Dispatch<React.SetStateAction<StudentInputCourse[]>>;
  onLoadSample: () => void;
  onClearAll: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  studentInfo,
  setStudentInfo,
  courses,
  setCourses,
  onLoadSample,
  onClearAll
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const processPdfFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('File harus berformat PDF (.pdf)');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    try {
      const result = await parseTranscriptPdf(file);
      setIsUploading(false);

      if (result.courses.length === 0) {
        setUploadError('Tidak dapat membaca data mata kuliah dari PDF ini. Pastikan file adalah transkrip Laporan Perkembangan UMS.');
        return;
      }

      // Automatically populate student identity if extracted
      if (result.studentInfo.nama || result.studentInfo.nim) {
        setStudentInfo(prev => ({
          nama: result.studentInfo.nama || prev.nama,
          nim: result.studentInfo.nim || prev.nim
        }));
      }

      setCourses(result.courses);

      const identityText = result.studentInfo.nama ? ` (${result.studentInfo.nama})` : '';
      setUploadSuccessMsg(
        `Berhasil mengimpor transkrip PDF ${file.name}${identityText}: ${result.courses.length} mata kuliah (${result.totalParsedSks} SKS) otomatis dimuat.`
      );

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setIsUploading(false);
      setUploadError(`Gagal membaca file PDF: ${err?.message || 'Format PDF tidak didukung'}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processPdfFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processPdfFile(file);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8 card-hover-glow">
      {/* Step Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            1
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              Unggah Transkrip & Identitas Mahasiswa
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Unggah dokumen PDF transkrip nilai untuk pengisian otomatis Nama, NIM, dan Mata Kuliah.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all border border-indigo-200/80 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" /> Muat Contoh Transkrip
          </button>

          {courses.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-all border border-slate-200 hover:border-rose-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Reset Transkrip
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {/* 1. PRIMARY PRIORITY: UPLOAD TRANSKRIP PDF BOX */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
                UTAMA
              </span>
              <span>1. Upload File Transkrip Nilai (PDF dari myakademik UMS)</span>
            </label>
            <span className="text-[11px] text-slate-500 italic">
              * Mengisi otomatis Nama, NIM, dan seluruh daftar Mata Kuliah 2022
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-file-upload"
          />
          <label
            htmlFor="pdf-file-upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border-2 border-dashed text-xs font-semibold cursor-pointer transition-all ${isDragOver
              ? 'bg-blue-100/80 border-blue-600 text-blue-900 ring-4 ring-blue-500/20 scale-[1.005]'
              : isUploading
                ? 'bg-blue-50 border-blue-400 text-blue-800 animate-pulse'
                : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50/80 border-blue-400/80 text-blue-950 hover:bg-blue-100/60 hover:border-blue-600 shadow-sm'
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-blue-200/80 shrink-0">
                {isUploading ? (
                  <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
                ) : (
                  <FileText className="w-7 h-7 text-rose-500" />
                )}
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base block">
                  {isUploading
                    ? 'Membaca Transkrip PDF...'
                    : 'Pilih atau Drag & Drop File PDF Transkrip Laporan Perkembangan UMS'}
                </span>
                <span className="text-slate-500 text-xs mt-0.5 block font-medium">
                  Dokumen berformat <strong className="text-slate-800">.PDF</strong> dari menu perkembangan studi MyAkademik.ums.ac.id
                </span>
              </div>
            </div>

            <div className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload PDF Transkrip</span>
            </div>
          </label>
        </div>

        {/* 2. SECONDARY SECTION: IDENTITAS MAHASISWA */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nama Input */}
          <div>
            <label htmlFor="student-nama" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Nama Mahasiswa (Otomatis / Manual)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="student-nama"
                type="text"
                placeholder="Contoh: Ardhian Akbar Ahmadi"
                value={studentInfo.nama}
                onChange={e => setStudentInfo({ ...studentInfo, nama: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-semibold"
              />
            </div>
          </div>

          {/* NIM Input */}
          <div>
            <label htmlFor="student-nim" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. NIM (Nomor Induk Mahasiswa)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <input
                id="student-nim"
                type="text"
                placeholder="Contoh: A710200001"
                value={studentInfo.nim}
                onChange={e => setStudentInfo({ ...studentInfo, nim: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {uploadError && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span className="font-medium">{uploadError}</span>
        </div>
      )}

      {uploadSuccessMsg && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">{uploadSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
