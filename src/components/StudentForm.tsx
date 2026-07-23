import React, { useRef, useState } from 'react';
import { User, CreditCard, Upload, Sparkles, FileText, Trash2, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
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

      const identityText = result.studentInfo.nama ? ` (Mahasiswa: ${result.studentInfo.nama})` : '';
      setUploadSuccessMsg(
        `Berhasil membaca transkrip PDF ${file.name}${identityText}: ${result.courses.length} mata kuliah (${result.totalParsedSks} SKS) otomatis diimpor.`
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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" /> Unggah Transkrip & Identitas Mahasiswa
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unggah dokumen PDF transkrip nilai (*Laporan Perkembangan UMS*) untuk pengisian otomatis Nama, NIM, dan Mata Kuliah.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" /> Muat Contoh Transkrip
          </button>

          {courses.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors border border-slate-200 hover:border-rose-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Reset Transkrip
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {/* 1. PRIMARY PRIORITY: UPLOAD TRANSKRIP PDF BOX */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <label className="block text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-black">
                PRIORITAS UTAMA
              </span>
              <span>1. Upload File Transkrip Nilai (PDF UMS)</span>
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
            className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border-2 border-dashed text-xs font-semibold cursor-pointer transition-all ${
              isDragOver
                ? 'bg-blue-100 border-blue-600 text-blue-900 ring-4 ring-blue-500/20 scale-[1.005]'
                : isUploading
                ? 'bg-blue-50 border-blue-400 text-blue-800 animate-pulse'
                : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-slate-50 border-blue-400 text-blue-900 hover:bg-blue-100/60 hover:border-blue-600 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-blue-200 shrink-0">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                ) : (
                  <FileText className="w-6 h-6 text-rose-500" />
                )}
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base block">
                  {isUploading
                    ? 'Membaca Transkrip PDF...'
                    : 'Pilih atau Drag & Drop File PDF Transkrip Laporan Perkembangan UMS'}
                </span>
                <span className="text-slate-500 text-xs mt-0.5 block font-normal">
                  Dokumen berformat <strong className="text-slate-700">.PDF</strong> dari sistem BAAK UMS
                </span>
              </div>
            </div>

            <div className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center">
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-semibold"
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {uploadError && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccessMsg && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{uploadSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
