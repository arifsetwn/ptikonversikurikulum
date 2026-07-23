import * as XLSX from 'xlsx';
import { StudentInputCourse, GradeType, AVAILABLE_GRADES } from '../types';
import { findMatching2022Course } from './conversionEngine';

export interface ParseExcelResult {
  courses: StudentInputCourse[];
  error?: string;
  totalParsed: number;
}

/**
 * Normalizes raw string grade to valid GradeType ('A', 'A/B', 'B', 'B/C', 'C', 'C/D', 'D', 'E')
 */
function normalizeGrade(raw: string): GradeType {
  if (!raw) return 'A';
  const clean = raw.trim().toUpperCase().replace(/\s+/g, '');
  if (clean === 'AB' || clean === 'A/B' || clean === 'A-') return 'A/B';
  if (clean === 'BC' || clean === 'B/C' || clean === 'B-') return 'B/C';
  if (clean === 'CD' || clean === 'C/D' || clean === 'C-') return 'C/D';
  if (AVAILABLE_GRADES.includes(clean as GradeType)) {
    return clean as GradeType;
  }
  // Numerical grade fallback conversion
  const num = parseFloat(raw);
  if (!isNaN(num)) {
    if (num >= 3.75) return 'A';
    if (num >= 3.25) return 'A/B';
    if (num >= 2.75) return 'B';
    if (num >= 2.25) return 'B/C';
    if (num >= 1.75) return 'C';
    if (num >= 1.25) return 'C/D';
    if (num >= 1.00) return 'D';
    return 'E';
  }
  return 'A';
}

/**
 * Parses uploaded Excel/CSV transcript files client-side
 */
export async function parseTranscriptFile(file: File): Promise<ParseExcelResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return { courses: [], error: 'File Excel/CSV tidak memiliki lembar kerja (sheet).', totalParsed: 0 };
    }

    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, raw: false, defval: '' });

    if (!rows || rows.length === 0) {
      return { courses: [], error: 'File Excel/CSV kosong.', totalParsed: 0 };
    }

    let nameColIdx = -1;
    let sksColIdx = -1;
    let gradeColIdx = -1;
    let startRowIdx = 0;

    for (let r = 0; r < Math.min(rows.length, 10); r++) {
      const row = rows[r];
      if (!Array.isArray(row)) continue;

      for (let c = 0; c < row.length; c++) {
        const val = String(row[c]).toLowerCase().trim();
        if (
          val.includes('mata kuliah') ||
          val.includes('nama mk') ||
          val.includes('matakuliah') ||
          val.includes('course') ||
          val === 'mk'
        ) {
          nameColIdx = c;
          startRowIdx = r + 1;
        }
        if (val === 'sks' || val.includes('kredit') || val === 'sks mk') {
          sksColIdx = c;
        }
        if (val === 'nilai' || val === 'grade' || val === 'huruf' || val === 'nh') {
          gradeColIdx = c;
        }
      }

      if (nameColIdx !== -1) {
        break;
      }
    }

    if (nameColIdx === -1) {
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        if (Array.isArray(row) && row.length > 0) {
          for (let c = 0; c < row.length; c++) {
            const cellVal = String(row[c]).trim();
            if (cellVal.length > 3 && isNaN(Number(cellVal))) {
              nameColIdx = c;
              startRowIdx = r;
              break;
            }
          }
        }
        if (nameColIdx !== -1) break;
      }
    }

    if (nameColIdx === -1) {
      nameColIdx = 0;
    }

    const parsedCourses: StudentInputCourse[] = [];
    const seenNames = new Set<string>();

    for (let r = startRowIdx; r < rows.length; r++) {
      const row = rows[r];
      if (!Array.isArray(row) || row.length === 0) continue;

      const rawName = String(row[nameColIdx] || '').trim();
      if (!rawName || rawName.length < 2) continue;

      const lowerName = rawName.toLowerCase();
      if (
        lowerName.includes('nama mata') ||
        lowerName.includes('mata kuliah') ||
        lowerName === 'nama' ||
        lowerName.startsWith('total') ||
        lowerName.startsWith('jumlah')
      ) {
        continue;
      }

      let sks = 0;
      if (sksColIdx !== -1 && row[sksColIdx] !== undefined) {
        const rawSks = String(row[sksColIdx]).replace(/[^0-9.]/g, '');
        sks = parseInt(rawSks, 10) || 0;
      }

      if (sks === 0) {
        const matched = findMatching2022Course(rawName);
        if (matched) {
          sks = matched.sks;
        } else {
          sks = 2;
        }
      }

      let nilai: GradeType = 'A';
      if (gradeColIdx !== -1 && row[gradeColIdx] !== undefined) {
        nilai = normalizeGrade(String(row[gradeColIdx]));
      }

      const nameKey = `${rawName.toLowerCase()}-${sks}-${nilai}`;
      if (!seenNames.has(nameKey)) {
        seenNames.add(nameKey);
        parsedCourses.push({
          id: `excel-${r}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          nama: rawName,
          sks: sks,
          nilai: nilai
        });
      }
    }

    if (parsedCourses.length === 0) {
      return {
        courses: [],
        error: 'Tidak dapat menemukan data mata kuliah yang valid dalam file yang diunggah.',
        totalParsed: 0
      };
    }

    return {
      courses: parsedCourses,
      totalParsed: parsedCourses.length
    };
  } catch (err: any) {
    return {
      courses: [],
      error: `Gagal membaca file: ${err.message || 'Format file tidak didukung.'}`,
      totalParsed: 0
    };
  }
}
