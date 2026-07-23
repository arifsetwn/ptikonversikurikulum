export type GradeType = 'A' | 'A/B' | 'B' | 'B/C' | 'C' | 'C/D' | 'D' | 'E';

export const GRADE_WEIGHTS: Record<GradeType, number> = {
  'A': 4.00,
  'A/B': 3.50,
  'B': 3.00,
  'B/C': 2.50,
  'C': 2.00,
  'C/D': 1.50,
  'D': 1.00,
  'E': 0.00
};

export const AVAILABLE_GRADES: GradeType[] = ['A', 'A/B', 'B', 'B/C', 'C', 'C/D', 'D', 'E'];

export interface Course2022 {
  kode: string;
  nama: string;
  sks: number;
  semester: string;
}

export interface Course2026 {
  kode_baru: string;
  nama_baru: string;
  sks_baru: number;
  sem_baru: string;
}

export interface MappingRule {
  id: number;
  kode_lama: string;
  nama_lama: string;
  sks_lama: number;
  sem_lama: string;
  kode_baru: string | null;
  nama_baru: string | null;
  sks_baru: number;
  sem_baru: string | null;
}

export interface StudentInputCourse {
  id: string;
  nama: string;
  sks: number;
  nilai: GradeType;
}

export type ConversionStatusType = 
  | 'converted_1to1'       // 1 MK 2022 -> 1 MK 2026
  | 'converted_1toMany'    // 1 MK 2022 -> Banyak Opsi/Pecah MK 2026
  | 'unconverted'          // MK 2022 tanpa padanan (SKS Hilang)
  | 'not_in_catalog';      // Input nama MK tidak ditemukan di master data 2022

export interface ConversionResultItem {
  id: string;
  inputId: string;
  
  // Data 2022 Input
  kodeLama: string;
  namaLama: string;
  sksLama: number;
  semLama: string;
  nilaiLama: GradeType;
  bobotLama: number;
  
  // Data 2026 Result
  kodeBaru: string | null;
  namaBaru: string | null;
  sksBaru: number;
  semBaru: string | null;
  nilaiBaru: GradeType | null;
  bobotBaru: number | null;
  
  status: ConversionStatusType;
  statusLabel: string;
  isMultiMatch: boolean;
  multiMatchGroupKey?: string;
}

export interface StudentInfo {
  nama: string;
  nim: string;
}

export interface ConversionSummaryStats {
  totalInputCourses: number;
  totalInputSks: number;
  totalConvertedCourses: number;
  totalConvertedSks: number;
  totalUnconvertedCourses: number;
  totalUnconvertedSks: number;
  totalNotInCatalogCourses: number;
  totalRemainingCourses2026: number;
  totalRemainingSks2026: number;

  // IPK Calculations
  ipkSebelumKonversi: number;
  ipkSetelahKonversi: number;
}
