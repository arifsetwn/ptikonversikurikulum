import * as pdfjsLib from 'pdfjs-dist';
import { StudentInputCourse, GradeType } from '../types';

// Set up worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface ParsedPdfResult {
  studentInfo: {
    nama: string;
    nim: string;
  };
  courses: StudentInputCourse[];
  totalParsedSks: number;
}

const GRADE_MAP: Record<string, GradeType> = {
  'A': 'A',
  'AB': 'A/B',
  'A/B': 'A/B',
  'B': 'B',
  'BC': 'B/C',
  'B/C': 'B/C',
  'C': 'C',
  'CD': 'C/D',
  'C/D': 'C/D',
  'D': 'D',
  'E': 'E'
};

/**
 * Parses a transcript PDF file (Laporan Perkembangan UMS)
 */
export async function parseTranscriptPdf(file: File): Promise<ParsedPdfResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageItems = textContent.items as { str: string }[];
    const pageText = pageItems.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  // 1. Extract Student Name
  let nama = '';
  const namaMatch = fullText.match(/Nama\s+Mahasiswa\s*:\s*([^\n\r]+)/i);
  if (namaMatch) {
    let rawNama = namaMatch[1].trim();
    if (rawNama.includes('Fakultas')) {
      rawNama = rawNama.split('Fakultas')[0].trim();
    }
    nama = rawNama;
  }

  // 2. Extract Student NIM
  let nim = '';
  const nimMatch = fullText.match(/Nomor\s+Induk\s+Mahasiswa\s*:\s*([A-Z0-9]+)/i);
  if (nimMatch) {
    nim = nimMatch[1].trim();
  }

  // 3. Extract Courses, SKS, and Grades
  // Line pattern: [Course Name] [SKS (1-6)] [Grade (A, AB, B, BC, C, CD, D, E, A/B, B/C, C/D)]
  const courses: StudentInputCourse[] = [];
  const lines = fullText.split(/[\r\n]+/);

  // Fallback regex to split text concatenated by spaces
  const courseRegex = /([A-Za-z0-9\s()\/&\-\.,]+?)\s+([1-6])\s+(A\/B|B\/C|C\/D|A|AB|B|BC|C|CD|D|E)(?=\s+[A-Za-z0-9]|$)/g;

  // Primary line-by-line regex
  const lineRegex = /^(.+?)\s+([1-6])\s+(A\/B|B\/C|C\/D|A|AB|B|BC|C|CD|D|E)\s*$/i;

  lines.forEach((line, index) => {
    const cleanLine = line.trim();
    if (!cleanLine) return;

    const match = cleanLine.match(lineRegex);
    if (match) {
      let courseName = match[1].trim();

      // Clean leading "SEMESTER X" section header prefix if attached to course name
      courseName = courseName.replace(/^SEMESTER\s+\d+\s*/i, '').trim();

      // Ignore header/footer lines that might accidentally match
      if (
        courseName.toLowerCase().includes('laporan perkembangan') ||
        courseName.toLowerCase().includes('nama mahasiswa') ||
        !courseName
      ) {
        return;
      }

      const sks = parseInt(match[2], 10);
      const rawGrade = match[3].toUpperCase();
      const nilai = GRADE_MAP[rawGrade] || 'A';

      courses.push({
        id: `pdf-course-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
        nama: courseName,
        sks: sks,
        nilai: nilai
      });
    }
  });

  // Fallback regex match all if line-by-line returned empty
  if (courses.length === 0) {
    let match: RegExpExecArray | null;
    let idx = 0;
    while ((match = courseRegex.exec(fullText)) !== null) {
      let courseName = match[1].trim();
      courseName = courseName.replace(/^SEMESTER\s+\d+\s*/i, '').trim();

      if (
        courseName.toLowerCase().includes('laporan') ||
        courseName.toLowerCase().includes('nama mahasiswa') ||
        !courseName
      ) {
        continue;
      }

      const sks = parseInt(match[2], 10);
      const rawGrade = match[3].toUpperCase();
      const nilai = GRADE_MAP[rawGrade] || 'A';

      courses.push({
        id: `pdf-course-${Date.now()}-${idx++}-${Math.random().toString(36).substr(2, 4)}`,
        nama: courseName,
        sks: sks,
        nilai: nilai
      });
    }
  }

  const totalParsedSks = courses.reduce((sum, c) => sum + c.sks, 0);

  return {
    studentInfo: { nama, nim },
    courses,
    totalParsedSks
  };
}
