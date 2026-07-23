import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit3, BookOpen, Check, Search } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Form Input Mata Kuliah & Nilai (Kurikulum 2022)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ketik nama mata kuliah, tentukan SKS & Nilai (A, A/B, B, B/C, C, C/D, D, E) untuk menghitung IPK otomatis.
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-xs border border-blue-200">
          {courses.length} MK diinput
        </span>
      </div>

      {/* Form Input Baris Baru */}
      <form onSubmit={handleSubmitAdd} className="mb-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
          {/* Autocomplete Input Nama MK */}
          <div className="sm:col-span-6 relative" ref={dropdownRef}>
            <label htmlFor="course-nama-input" className="block text-xs font-bold text-slate-600 mb-1">
              Nama Mata Kuliah 2022
            </label>
            <div className="relative">
              <input
                id="course-nama-input"
                type="text"
                placeholder="Ketik nama mata kuliah (contoh: Sistem Digital)..."
                value={inputNama}
                onChange={e => handleNamaChange(e.target.value)}
                onFocus={() => {
                  if (inputNama.trim().length > 0) setShowSuggestions(true);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Dropdown Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-semibold text-slate-800 block">{item.nama}</span>
                      <span className="text-slate-400 text-[11px]">{item.kode} • Sem {item.semester}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                      {item.sks} SKS
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input SKS */}
          <div className="sm:col-span-2">
            <label htmlFor="course-sks-input" className="block text-xs font-bold text-slate-600 mb-1">
              SKS
            </label>
            <input
              id="course-sks-input"
              type="number"
              min="1"
              max="10"
              value={inputSks}
              onChange={e => setInputSks(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-center font-semibold"
            />
          </div>

          {/* Input Nilai */}
          <div className="sm:col-span-2">
            <label htmlFor="course-nilai-input" className="block text-xs font-bold text-slate-600 mb-1">
              Nilai (Bobot)
            </label>
            <select
              id="course-nilai-input"
              value={inputNilai}
              onChange={e => setInputNilai(e.target.value as GradeType)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-center"
            >
              {AVAILABLE_GRADES.map(g => (
                <option key={g} value={g}>
                  {g} ({GRADE_WEIGHTS[g].toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 sm:mt-5">
            <button
              type="submit"
              disabled={!inputNama.trim()}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah
            </button>
          </div>
        </div>
      </form>

      {/* Tabel Data Input */}
      {courses.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">Belum ada mata kuliah & nilai yang diinput</p>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Gunakan form di atas atau klik <span className="font-semibold text-indigo-600">"Muat Contoh Transkrip"</span> di bagian atas untuk mengisi data simulasi instan beserta nilainya.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Mata Kuliah (Kurikulum 2022)</th>
                <th className="py-3 px-4 w-24 text-center">SKS</th>
                <th className="py-3 px-4 w-28 text-center">Nilai (Bobot)</th>
                <th className="py-3 px-4 w-28 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {courses.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center font-bold text-slate-400">{index + 1}</td>
                  <td className="py-3 px-4">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={editNama}
                        onChange={e => setEditNama(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-blue-400 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-semibold text-slate-900">{item.nama}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={editSks}
                        onChange={e => setEditSks(Number(e.target.value))}
                        className="w-20 mx-auto px-2 py-1 bg-white border border-blue-400 rounded-lg text-xs text-center font-bold focus:outline-none"
                      />
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-full">
                        {item.sks} SKS
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {editingId === item.id ? (
                      <select
                        value={editNilai}
                        onChange={e => setEditNilai(e.target.value as GradeType)}
                        className="px-2 py-1 bg-white border border-blue-400 rounded-lg text-xs font-bold text-center focus:outline-none"
                      >
                        {AVAILABLE_GRADES.map(g => (
                          <option key={g} value={g}>
                            {g} ({GRADE_WEIGHTS[g].toFixed(2)})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-800 font-extrabold rounded-md border border-blue-200">
                        {item.nilai || 'A'} ({(GRADE_WEIGHTS[item.nilai || 'A']).toFixed(2)})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {editingId === item.id ? (
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors mr-1 cursor-pointer"
                        title="Simpan Edit"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Baris"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onRemoveCourse(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Baris"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
