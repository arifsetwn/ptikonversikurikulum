import React, { useRef, useState } from 'react';
import { User, CreditCard, Upload, Sparkles, FileSpreadsheet, Trash2, AlertCircle } from 'lucide-react';
import { StudentInfo, StudentInputCourse } from '../types';
import { parseTranscriptFile } from '../utils/excelParser';
import { SAMPLE_STUDENT_INFO, SAMPLE_STUDENT_COURSES } from '../utils/sampleData';

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    const result = await parseTranscriptFile(file);
    setIsUploading(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.courses.length > 0) {
      setCourses(result.courses);
      setUploadSuccessMsg(`Berhasil mengimpor ${result.totalParsed} mata kuliah dari file ${file.name}`);
      // Clear input so user can re-upload if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> Identitas Mahasiswa & Transkrip
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lengkapi nama & NIM untuk dicantumkan pada dokumen PDF hasil konversi.
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
              placeholder="Contoh: Budi Santoso"
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
              placeholder="Contoh: 20220810001"
              value={studentInfo.nim}
              onChange={e => setStudentInfo({ ...studentInfo, nim: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* File Upload Excel/CSV */}
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Upload File Transkrip (Excel/CSV)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="hidden"
            id="excel-file-upload"
          />
          <label
            htmlFor="excel-file-upload"
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed text-xs font-semibold cursor-pointer transition-all ${
              isUploading
                ? 'bg-blue-50 border-blue-300 text-blue-700 animate-pulse'
                : 'bg-slate-50 border-blue-300/80 text-blue-700 hover:bg-blue-50/80 hover:border-blue-500'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>{isUploading ? 'Membaca file Excel...' : 'Pilih File .XLSX / .CSV'}</span>
            <Upload className="w-3.5 h-3.5 text-blue-500 ml-auto" />
          </label>
        </div>
      </div>

      {/* Messages */}
      {uploadError && (
        <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccessMsg && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
