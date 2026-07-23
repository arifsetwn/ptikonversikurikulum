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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> Identitas Mahasiswa & Transkrip PDF
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lengkapi nama & NIM atau unggah dokumen transkrip nilai PDF (*Laporan Perkembangan UMS*).
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {/* Nama Input */}
        <div>
          <label htmlFor="student-nama" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Nama Mahasiswa
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
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* NIM Input */}
        <div>
          <label htmlFor="student-nim" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            NIM (Nomor Induk Mahasiswa)
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
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* File Upload PDF Only */}
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Upload Transkrip PDF (Hanya .PDF)
          </label>
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
            className={`w-full flex items-center justify-between gap-2 py-2.5 px-4 rounded-xl border border-dashed text-xs font-semibold cursor-pointer transition-all ${
              isDragOver
                ? 'bg-blue-100 border-blue-600 text-blue-900 ring-2 ring-blue-500/20'
                : isUploading
                ? 'bg-blue-50 border-blue-400 text-blue-800 animate-pulse'
                : 'bg-slate-50 border-blue-300/80 text-blue-700 hover:bg-blue-50/80 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {isUploading ? (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 text-rose-500" />
              )}
              <span>
                {isUploading ? 'Membaca Transkrip PDF...' : 'Pilih / Drag File PDF Transkrip'}
              </span>
            </div>
            <Upload className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          </label>
        </div>
      </div>

      {/* Messages */}
      {uploadError && (
        <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccessMsg && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{uploadSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
