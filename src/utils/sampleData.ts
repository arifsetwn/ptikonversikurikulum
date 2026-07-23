import { StudentInputCourse, StudentInfo } from '../types';

export const SAMPLE_STUDENT_INFO: StudentInfo = {
  nama: 'Ahmad Rizky Pratama',
  nim: '20220810042'
};

export const SAMPLE_STUDENT_COURSES: StudentInputCourse[] = [
  { id: 'sample-1', nama: 'Agama', sks: 2, nilai: 'A' },
  { id: 'sample-2', nama: 'English for Academic Purposes', sks: 2, nilai: 'A/B' },
  { id: 'sample-3', nama: 'Filsafat Pendidikan', sks: 2, nilai: 'B' },
  { id: 'sample-4', nama: 'Informatika Kependidikan', sks: 2, nilai: 'A' }, // 1-to-many match
  { id: 'sample-5', nama: 'Sistem Digital', sks: 2, nilai: 'B/C' },
  { id: 'sample-6', nama: 'Algoritma dan Pemrograman', sks: 3, nilai: 'A' },
  { id: 'sample-7', nama: 'Praktikum Algoritma dan Pemrograman', sks: 1, nilai: 'A' },
  { id: 'sample-8', nama: 'Kalkulus', sks: 3, nilai: 'C' },
  { id: 'sample-9', nama: 'Aljabar Linier', sks: 3, nilai: 'B' },
  { id: 'sample-11', nama: 'Struktur Diskret', sks: 2, nilai: 'A/B' },
  { id: 'sample-12', nama: 'Pemrograman Web', sks: 3, nilai: 'A' },
  { id: 'sample-13', nama: 'Praktikum Pemrograman Web', sks: 1, nilai: 'A' },
  { id: 'sample-14', nama: 'Sistem Basis Data', sks: 3, nilai: 'B/C' },
  { id: 'sample-15', nama: 'Praktikum Sistem Basis Data', sks: 1, nilai: 'B' },
  { id: 'sample-16', nama: 'PLP I', sks: 1, nilai: 'A' }, // Unconverted (SKS lost)
  { id: 'sample-17', nama: 'PLP II', sks: 3, nilai: 'A' },
  { id: 'sample-18', nama: 'Praktik Industri', sks: 2, nilai: 'A/B' },
  { id: 'sample-19', nama: 'Skripsi', sks: 4, nilai: 'A' }, // 1-to-many match (Sempro & TA)
  { id: 'sample-20', nama: 'Data Science', sks: 3, nilai: 'A' }
];
