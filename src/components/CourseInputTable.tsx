import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit3, BookOpen, Check, Search, AlertCircle } from 'lucide-react';
import { StudentInputCourse, GradeType, AVAILABLE_GRADES, GRADE_WEIGHTS } from '../types';
import { masterCourses2022 } from '../utils/conversionEngine';

interface CourseInputTableProps {
  courses: StudentInputCourse[];
  onAddCourse: (course: { nama: string; sks: number; nilai: GradeType }) => void;
  onUpdateCourse: (id: string, updated: { nama: string; sks: number; nilai: GradeType }) => void;
  onRemoveCourse: (id: string) => void;
}

export const CourseInputTable: React.FC<CourseInputTableProps> = ({
  courses,
  onAddCourse,
  onUpdateCourse,
  onRemoveCourse
}) => {
  const [inputNama, setInputNama] = useState('');
  const [inputSks, setInputSks] = useState<number>(2);
  const [inputNilai, setInputNilai] = useState<GradeType>('A');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNama, setEditNama] = useState('');
  const [editSks, setEditSks] = useState<number>(2);
  const [editNilai, setEditNilai] = useState<GradeType>('A');

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<typeof masterCourses2022>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNamaChange = (text: string) => {
    setInputNama(text);
    if (text.trim().length > 0) {
      const filtered = masterCourses2022.filter(c =>
        c.nama.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (selectedCourse: typeof masterCourses2022[0]) => {
    setInputNama(selectedCourse.nama);
    setInputSks(selectedCourse.sks);
    setShowSuggestions(false);
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNama.trim()) return;
    onAddCourse({
      nama: inputNama.trim(),
      sks: Number(inputSks) || 2,
      nilai: inputNilai
    });
    setInputNama('');
    setInputSks(2);
    setInputNilai('A');
    setShowSuggestions(false);
  };

  const handleStartEdit = (item: StudentInputCourse) => {
    setEditingId(item.id);
    setEditNama(item.nama);
    setEditSks(item.sks);
    setEditNilai(item.nilai || 'A');
  };

  const handleSaveEdit = (id: string) => {
    if (!editNama.trim()) return;
    onUpdateCourse(id, {
      nama: editNama.trim(),
      sks: Number(editSks) || 2,
      nilai: editNilai
    });
    setEditingId(null);
  };

  const getGradeBadgeStyle = (grade: GradeType) => {
    const w = GRADE_WEIGHTS[grade] || 0;
    if (w >= 3.5) return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold';
    if (w >= 2.5) return 'bg-blue-100 text-blue-800 border-blue-300 font-bold';
    if (w >= 2.0) return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
    return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8 card-hover-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            2
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              Daftar Mata Kuliah Diinput (Kurikulum 2022)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola atau tambah manual mata kuliah jika terdapat perbedaan pada dokumen PDF.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-800 rounded-xl text-xs font-bold border border-indigo-200">
            {courses.length} MK ({courses.reduce((sum, c) => sum + c.sks, 0)} SKS)
          </span>
        </div>
      </div>

      {/* Manual Input Form */}
      <form onSubmit={handleSubmitAdd} className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Autocomplete Input Nama MK */}
          <div className="md:col-span-6 relative" ref={dropdownRef}>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tambah / Cari Mata Kuliah 2022
            </label>
            <input
              type="text"
              placeholder="Ketik nama mata kuliah 2022..."
              value={inputNama}
              onChange={e => handleNamaChange(e.target.value)}
              onFocus={() => inputNama.trim() && setShowSuggestions(true)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto py-1">
                {suggestions.map(item => (
                  <button
                    key={item.kode}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-blue-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-800">{item.nama}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-semibold">
                      {item.sks} SKS • Sem {item.semester}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input SKS */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Bobot SKS
            </label>
            <select
              value={inputSks}
              onChange={e => setInputSks(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 6].map(num => (
                <option key={num} value={num}>
                  {num} SKS
                </option>
              ))}
            </select>
          </div>

          {/* Select Nilai */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nilai Huruf
            </label>
            <select
              value={inputNilai}
              onChange={e => setInputNilai(e.target.value as GradeType)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {AVAILABLE_GRADES.map(g => (
                <option key={g} value={g}>
                  {g} (Bobot {GRADE_WEIGHTS[g].toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah MK
            </button>
          </div>
        </div>
      </form>

      {/* Courses List Table */}
      {courses.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">Belum ada Mata Kuliah yang Diinput</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Unggah transkrip PDF atau tambahkan mata kuliah manual di atas untuk memulai simulasi konversi.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Mata Kuliah (Kurikulum 2022)</th>
                <th className="py-3 px-4 text-center w-24">Bobot SKS</th>
                <th className="py-3 px-4 text-center w-28">Nilai Huruf</th>
                <th className="py-3 px-4 text-center w-24">Bobot Angka</th>
                <th className="py-3 px-4 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {courses.map((item, idx) => {
                const isEditing = editingId === item.id;
                const weight = GRADE_WEIGHTS[item.nilai || 'A'] || 4.0;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>

                    {/* Nama MK Column */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editNama}
                          onChange={e => setEditNama(e.target.value)}
                          className="w-full px-2.5 py-1 bg-white border border-blue-400 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      ) : (
                        <span className="font-bold text-slate-900">{item.nama}</span>
                      )}
                    </td>

                    {/* SKS Column */}
                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <select
                          value={editSks}
                          onChange={e => setEditSks(Number(e.target.value))}
                          className="px-2 py-1 bg-white border border-blue-400 rounded-lg text-xs font-bold"
                        >
                          {[1, 2, 3, 4, 6].map(s => (
                            <option key={s} value={s}>
                              {s} SKS
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full font-bold">
                          {item.sks} SKS
                        </span>
                      )}
                    </td>

                    {/* Nilai Column */}
                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <select
                          value={editNilai}
                          onChange={e => setEditNilai(e.target.value as GradeType)}
                          className="px-2 py-1 bg-white border border-blue-400 rounded-lg text-xs font-bold"
                        >
                          {AVAILABLE_GRADES.map(g => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full border text-xs ${getGradeBadgeStyle(
                            item.nilai
                          )}`}
                        >
                          {item.nilai}
                        </span>
                      )}
                    </td>

                    {/* Bobot Angka */}
                    <td className="py-3 px-4 text-center font-extrabold text-slate-700">
                      {weight.toFixed(2)}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Simpan"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onRemoveCourse(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
