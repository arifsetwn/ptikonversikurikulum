import rawMappingData from '../data/mappingData.json';
import rawCourses2022 from '../data/courses2022.json';
import rawCourses2026 from '../data/courses2026.json';
import {
  Course2022,
  Course2026,
  MappingRule,
  StudentInputCourse,
  ConversionResultItem,
  ConversionSummaryStats,
  GradeType,
  GRADE_WEIGHTS
} from '../types';

export const mappingData: MappingRule[] = rawMappingData as MappingRule[];
export const masterCourses2022: Course2022[] = rawCourses2022 as Course2022[];
export const masterCourses2026: Course2026[] = rawCourses2026 as Course2026[];

/**
 * Normalizes strings for flexible text comparison
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

// Fast lookup map for normalized 2022 course names -> mapping rules
const mappingByNormalizedName = new Map<string, MappingRule[]>();

mappingData.forEach(rule => {
  if (!rule.nama_lama) return;
  const normKey = normalizeText(rule.nama_lama);
  if (!mappingByNormalizedName.has(normKey)) {
    mappingByNormalizedName.set(normKey, []);
  }
  mappingByNormalizedName.get(normKey)!.push(rule);
});

// Map of master courses for quick SKS / Kode fallback
const masterCourseByNormalizedName = new Map<string, Course2022>();
masterCourses2022.forEach(course => {
  masterCourseByNormalizedName.set(normalizeText(course.nama), course);
});

/**
 * Finds matching 2022 course from master list using normalized or fuzzy search
 */
export function findMatching2022Course(inputName: string): Course2022 | undefined {
  const normInput = normalizeText(inputName);
  if (!normInput) return undefined;

  if (masterCourseByNormalizedName.has(normInput)) {
    return masterCourseByNormalizedName.get(normInput);
  }

  if (normInput.length >= 3) {
    return masterCourses2022.find(c => {
      const normCourse = normalizeText(c.nama);
      return normCourse.includes(normInput) || normInput.includes(normCourse);
    });
  }

  return undefined;
}

/**
 * Executes curriculum conversion logic for student input courses
 */
export function processCurriculumConversion(inputs: StudentInputCourse[]): ConversionResultItem[] {
  const results: ConversionResultItem[] = [];

  inputs.forEach(input => {
    const normName = normalizeText(input.nama);
    if (!normName) return;

    const nilaiLama: GradeType = input.nilai || 'A';
    const bobotLama = GRADE_WEIGHTS[nilaiLama] ?? 4.0;

    let rules = mappingByNormalizedName.get(normName);

    if (!rules || rules.length === 0) {
      const matchedMaster = findMatching2022Course(input.nama);
      if (matchedMaster) {
        const normMasterName = normalizeText(matchedMaster.nama);
        rules = mappingByNormalizedName.get(normMasterName);
      }
    }

    if (!rules || rules.length === 0) {
      results.push({
        id: `${input.id}-notfound`,
        inputId: input.id,
        kodeLama: '-',
        namaLama: input.nama,
        sksLama: input.sks,
        semLama: '-',
        nilaiLama,
        bobotLama,
        kodeBaru: null,
        namaBaru: null,
        sksBaru: 0,
        semBaru: null,
        nilaiBaru: null,
        bobotBaru: null,
        status: 'not_in_catalog',
        statusLabel: 'Tidak ada di data pemetaan — perlu konsultasi prodi',
        isMultiMatch: false
      });
      return;
    }

    const isUnconverted = rules.every(r => !r.nama_baru);

    if (isUnconverted) {
      const firstRule = rules[0];
      results.push({
        id: `${input.id}-unconverted`,
        inputId: input.id,
        kodeLama: firstRule.kode_lama || '-',
        namaLama: firstRule.nama_lama,
        sksLama: input.sks || firstRule.sks_lama,
        semLama: firstRule.sem_lama || '-',
        nilaiLama,
        bobotLama,
        kodeBaru: null,
        namaBaru: null,
        sksBaru: 0,
        semBaru: null,
        nilaiBaru: null,
        bobotBaru: null,
        status: 'unconverted',
        statusLabel: 'MK tidak dikonversi — SKS hilang',
        isMultiMatch: false
      });
      return;
    }

    const validRules = rules.filter(r => Boolean(r.nama_baru));

    if (validRules.length === 1) {
      const rule = validRules[0];
      results.push({
        id: `${input.id}-rule-${rule.id}`,
        inputId: input.id,
        kodeLama: rule.kode_lama || '-',
        namaLama: rule.nama_lama,
        sksLama: input.sks || rule.sks_lama,
        semLama: rule.sem_lama || '-',
        nilaiLama,
        bobotLama,
        kodeBaru: rule.kode_baru,
        namaBaru: rule.nama_baru,
        sksBaru: rule.sks_baru,
        semBaru: rule.sem_baru,
        nilaiBaru: nilaiLama,
        bobotBaru: bobotLama,
        status: 'converted_1to1',
        statusLabel: 'Terkonversi (1:1)',
        isMultiMatch: false
      });
    } else if (validRules.length > 1) {
      const groupKey = `${input.id}-multimatch`;
      validRules.forEach((rule, index) => {
        results.push({
          id: `${input.id}-rule-${rule.id}-${index}`,
          inputId: input.id,
          kodeLama: rule.kode_lama || '-',
          namaLama: rule.nama_lama,
          sksLama: input.sks || rule.sks_lama,
          semLama: rule.sem_lama || '-',
          nilaiLama,
          bobotLama,
          kodeBaru: rule.kode_baru,
          namaBaru: rule.nama_baru,
          sksBaru: rule.sks_baru,
          semBaru: rule.sem_baru,
          nilaiBaru: nilaiLama,
          bobotBaru: bobotLama,
          status: 'converted_1toMany',
          statusLabel: 'Hasil Pemecahan / Opsi Konversi',
          isMultiMatch: true,
          multiMatchGroupKey: groupKey
        });
      });
    }
  });

  return results;
}

/**
 * Returns all unfulfilled 2026 courses (both mandatory & elective) for table display
 * so students can view all available courses in the catalog.
 */
export function getRemaining2026Courses(results: ConversionResultItem[]): Course2026[] {
  const fulfilledSet = new Set<string>();

  results.forEach(res => {
    if (res.status === 'converted_1to1' || res.status === 'converted_1toMany') {
      if (res.kodeBaru) fulfilledSet.add(res.kodeBaru);
      if (res.namaBaru) fulfilledSet.add(normalizeText(res.namaBaru));
    }
  });

  return masterCourses2026.filter(c => {
    const isByCode = fulfilledSet.has(c.kode_baru);
    const isByName = fulfilledSet.has(normalizeText(c.nama_baru));
    return !isByCode && !isByName;
  });
}

/**
 * Calculates summary stats for UI overview badges including IPK and graduation SKS requirement.
 * Graduation requirement math:
 * - Unfulfilled Mandatory SKS (Sem 1-8)
 * - Needed Electives SKS (Math.max(0, 3 - fulfilledElectivesCount) * 3 SKS)
 */
export function calculateSummaryStats(
  inputs: StudentInputCourse[],
  results: ConversionResultItem[]
): ConversionSummaryStats {
  const totalInputCourses = inputs.length;
  const totalInputSks = inputs.reduce((sum, item) => sum + (item.sks || 0), 0);

  // IPK 2022 (Sebelum Konversi): Sum(sks * bobot) / Sum(sks)
  let totalInputMutu = 0;
  inputs.forEach(item => {
    const weight = GRADE_WEIGHTS[item.nilai] ?? 4.0;
    totalInputMutu += (item.sks || 0) * weight;
  });
  const ipkSebelumKonversi = totalInputSks > 0 ? totalInputMutu / totalInputSks : 0;

  let totalConvertedCourses = 0;
  let totalConvertedSks = 0;
  let totalConvertedMutu = 0;

  let totalUnconvertedCourses = 0;
  let totalUnconvertedSks = 0;
  let totalNotInCatalogCourses = 0;

  const countedInputIds = new Set<string>();

  results.forEach(res => {
    if (res.status === 'converted_1to1' || res.status === 'converted_1toMany') {
      totalConvertedSks += res.sksBaru || 0;
      if (res.bobotBaru !== null) {
        totalConvertedMutu += (res.sksBaru || 0) * res.bobotBaru;
      }
      if (!countedInputIds.has(res.inputId)) {
        totalConvertedCourses++;
        countedInputIds.add(res.inputId);
      }
    } else if (res.status === 'unconverted') {
      totalUnconvertedSks += res.sksLama || 0;
      if (!countedInputIds.has(res.inputId)) {
        totalUnconvertedCourses++;
        countedInputIds.add(res.inputId);
      }
    } else if (res.status === 'not_in_catalog') {
      if (!countedInputIds.has(res.inputId)) {
        totalNotInCatalogCourses++;
        countedInputIds.add(res.inputId);
      }
    }
  });

  // IPK 2026 (Setelah Konversi): Sum(sksBaru * bobotBaru) / Sum(sksBaru)
  const ipkSetelahKonversi = totalConvertedSks > 0 ? totalConvertedMutu / totalConvertedSks : 0;

  // Calculate graduation requirement SKS:
  const fulfilledSet = new Set<string>();
  results.forEach(res => {
    if (res.status === 'converted_1to1' || res.status === 'converted_1toMany') {
      if (res.kodeBaru) fulfilledSet.add(res.kodeBaru);
      if (res.namaBaru) fulfilledSet.add(normalizeText(res.namaBaru));
    }
  });

  let remainingMandatorySks = 0;
  let remainingMandatoryCount = 0;
  let fulfilledElectiveCount = 0;

  masterCourses2026.forEach(c => {
    const isFulfilled =
      (c.kode_baru && fulfilledSet.has(c.kode_baru)) ||
      (c.nama_baru && fulfilledSet.has(normalizeText(c.nama_baru)));

    if (c.sem_baru !== 'Pilihan') {
      if (!isFulfilled) {
        remainingMandatorySks += c.sks_baru || 0;
        remainingMandatoryCount += 1;
      }
    } else {
      if (isFulfilled) {
        fulfilledElectiveCount += 1;
      }
    }
  });

  const neededElectiveCount = Math.max(0, 3 - Math.min(3, fulfilledElectiveCount));
  const remainingElectiveSks = neededElectiveCount * 3;

  const totalRemainingSks2026 = remainingMandatorySks + remainingElectiveSks;
  const totalRemainingCourses2026 = remainingMandatoryCount + neededElectiveCount;

  return {
    totalInputCourses,
    totalInputSks,
    totalConvertedCourses,
    totalConvertedSks,
    totalUnconvertedCourses,
    totalUnconvertedSks,
    totalNotInCatalogCourses,
    totalRemainingCourses2026,
    totalRemainingSks2026,
    ipkSebelumKonversi: parseFloat(ipkSebelumKonversi.toFixed(2)),
    ipkSetelahKonversi: parseFloat(ipkSetelahKonversi.toFixed(2))
  };
}
