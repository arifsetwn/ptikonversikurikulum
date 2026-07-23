export interface VisiKeyword {
  title: string;
  desc: string;
  iconName: string;
}

export interface ProfilLulusan {
  id: string;
  kode: string;
  title: string;
  category: string;
  desc: string;
  careers: string[];
}

export interface PEOItem {
  kode: string;
  title: string;
  desc: string;
}

export interface CPLItem {
  kode: string;
  category: 'Sikap' | 'Pengetahuan' | 'Keterampilan Umum' | 'Keterampilan Khusus';
  desc: string;
}

export interface LearningPathItem {
  id: string;
  name: string;
  desc: string;
  iconName: string;
  courses: string[];
}

export interface GeneralChangeItem {
  title: string;
  oldVal: string;
  newVal: string;
  desc: string;
}

export interface CourseNameChangeItem {
  oldName: string;
  oldSem?: string;
  newName: string;
  newSem?: string;
  note?: string;
}

export interface SksChangeItem {
  courseName: string;
  oldSks: number;
  newSks: number;
  note?: string;
}

// VISI KEILMUAN
export const fontVisi = "Menyelenggarakan dan mengembangkan keilmuan Pedagogi Informatika yang future-oriented berbasis computational thinking untuk mendukung transformasi digital pendidikan berlandaskan nilai keislaman.";

export const VISI_KEYWORDS: VisiKeyword[] = [
  {
    title: 'Pedagogi Informatika',
    desc: 'Penguasaan metode pembelajaran komputasi dan teknologi informasi masa depan.',
    iconName: 'GraduationCap'
  },
  {
    title: 'Future-Oriented',
    desc: 'Pengembangan kurikulum adaptif terhadap perkembangan teknologi AI & digital.',
    iconName: 'Sparkles'
  },
  {
    title: 'Computational Thinking',
    desc: 'Kemampuan formulasi masalah dan penyelesaian berbasis algoritma logis.',
    iconName: 'Cpu'
  },
  {
    title: 'Transformasi Digital Pendidikan',
    desc: 'Penerapan inovasi EdTech modern dalam ekosistem pembelajaran.',
    iconName: 'Laptop'
  },
  {
    title: 'Nilai Keislaman',
    desc: 'Landasan etika, akhlak mulia, dan integrasi Al-Islam Kemuhammadiyahan.',
    iconName: 'BookOpen'
  }
];

// PROFIL LULUSAN (PL)
export const PROFIL_LULUSAN: ProfilLulusan[] = [
  {
    id: 'pl-1',
    kode: 'PL-1',
    title: 'Pendidik Informatika',
    category: 'Sektor Pendidikan',
    desc: 'Lulusan yang menguasai keahlian mengajar, mendesain media pembelajaran digital, dan mengelola laboratorium informatika di jenjang sekolah (SD,SMP,SMA/SMK/MA) maupun lembaga pelatihan.',
    careers: [
      'Guru Mata Pelajaran Informatika / Koding KA (SD, SMP, SMA/SMK/MA)',
      'Instruktur / Trainer Bidang Pemrograman & EdTech',
      'Tenaga Kependidikan / Pengelola Laboratorium Komputer',
      'Asisten Peneliti Teknologi Pendidikan',
      'Konsultan Pengembangan Kurikulum & Pembelajaran Digital'
    ]
  },
  {
    id: 'pl-2',
    kode: 'PL-2',
    title: 'IT Engineer',
    category: 'Sektor Industri Teknologi',
    desc: 'Lulusan yang memiliki kompetensi teknis tinggi dalam merancang, membangun, menguji, dan mengamankan aplikasi sistem komputer modern serta infrastruktur jaringan.',
    careers: [
      'Software Engineer / Application Developer',
      'Web & Mobile App Developer',
      'Artificial Intelligence / Machine Learning Engineer',
      'Cybersecurity & System Administrator',
      'Database Administrator & Data Analyst',
      'UI/UX Designer & Frontend/Backend Specialist',
      'Cloud Infrastructure Specialist'
    ]
  },
  {
    id: 'pl-3',
    kode: 'PL-3',
    title: 'Technopreneur',
    category: 'Sektor Wirausaha Teknologi',
    desc: 'Lulusan yang memiliki jiwa kewirausahaan berbasis teknologi digital, mampu menciptakan produk EdTech inovatif, dan memimpin start-up digital.',
    careers: [
      'Founder / Co-Founder Start-up EdTech / Digital Agency',
      'Digital Business Consultant',
      'Content & Game Creator / Developer',
      'Product Manager Produk Teknologi Pendidikan',
      'Konsultan Solusi Digital Industri'
    ]
  }
];

// PEO (Program Educational Objectives)
export const PEO_DATA: PEOItem[] = [
  {
    kode: 'PEO-01',
    title: 'Career Professionalism',
    desc: 'Lulusan memiliki karir yang unggul dan profesional di bidang Pendidikan Informatika, IT Engineering, atau Technopreneurship dengan menjunjung tinggi etika dan integritas.'
  },
  {
    kode: 'PEO-02',
    title: 'Academic Excellence & Lifelong Learning',
    desc: 'Lulusan memiliki semangat pembelajar sepanjang hayat, mampu beradaptasi dengan perkembangan teknologi masa depan (future-oriented), dan melanjutkan studi ke jenjang lebih tinggi.'
  },
  {
    kode: 'PEO-03',
    title: 'Social Engagement & Islamic Values',
    desc: 'Lulusan berkontribusi aktif dalam memecahkan masalah masyarakat melalui teknologi informasi berlandaskan nilai-nilai Keislaman dan Kemuhammadiyahan.'
  }
];

// CPL (Capaian Pembelajaran Lulusan)
export const CPL_DATA: CPLItem[] = [
  {
    kode: 'CPL-1',
    category: 'Sikap',
    desc: 'Menunjukkan ketakwaan kepada Tuhan Yang Maha Esa, menjunjung tinggi nilai kemanusiaan, etika, moral, dan nasionalisme berlandaskan Pancasila, serta bertanggung jawab atas tugas bidang keahliannya dengan kepekaan sosial dan kepedulian lingkungan.'
  },
  {
    kode: 'CPL-2',
    category: 'Pengetahuan',
    desc: 'Mengintegrasikan konsep serta prinsip didaktik-pedagogik pendidikan yang berlandaskan nilai Al-Islam dan Kemuhammadiyahan (AIK).'
  },
  {
    kode: 'CPL-3',
    category: 'Pengetahuan',
    desc: 'Mengintegrasikan konsep teoritis informatika berbasis computational thinking dengan metode ilmiah untuk memecahkan masalah di bidang pendidikan dan teknologi'
  },
  {
    kode: 'CPL-4',
    category: 'Keterampilan Umum',
    desc: 'Bekerja sama, berkomunikasi, dan berkolaborasi secara efektif dalam tim serta menunjukkan kepemimpinan dan kemandirian dalam pembelajaran sepanjang hayat.'
  },
  {
    kode: 'CPL-5',
    category: 'Keterampilan Khusus',
    desc: 'Mengembangkan pembelajaran inovatif berbasis teknologi informasi berdasarkan prinsip didaktik-pedagogik sesuai tantangan abad ke-21.'
  },
  {
    kode: 'CPL-6',
    category: 'Keterampilan Khusus',
    desc: 'Mengembangkan solusi, media, dan aplikasi berbasis teknologi yang inovatif, berkelanjutan, dan memberikan dampak nyata bagi pendidikan dan masyarakat.'
  },
  {
    kode: 'CPL-7',
    category: 'Keterampilan Khusus',
    desc: 'Mengembangkan semangat kemandirian, kreativitas, dan jiwa kewirausahaan berbasis teknologi (technopreneurship) untuk menciptakan inovasi dan peluang usaha yang berkelanjutan di bidang pendidikan dan informatika'
  }
];

// LEARNING PATHS (6 Jalur Karir)
export const LEARNING_PATHS: LearningPathItem[] = [
  {
    id: 'lp-ai',
    name: 'Artificial Intelligence & Data Science',
    desc: 'Fokus pada pengembangan model cerdas, Machine Learning, Computer Vision, Big Data, dan Analisis Data.',
    iconName: 'Cpu',
    courses: ['Machine Learning', 'Computer Vision', 'Big Data Fundamental', 'Data Science']
  },
  {
    id: 'lp-se',
    name: 'Software Engineering & App Development',
    desc: 'Fokus pada rekayasa perangkat lunak modern, aplikasi web lanjut, aplikasi mobile, dan modern app dev.',
    iconName: 'Code',
    courses: ['Pemrograman Web Lanjut', 'Pengembangan Aplikasi Mobile', 'Pengembangan Aplikasi Modern', 'e-Commerce']
  },
  {
    id: 'lp-sec',
    name: 'Cybersecurity, Network & Cloud',
    desc: 'Fokus pada keamanan siber, administrasi sistem, jaringan nirkabel, ethical hacking, dan komputasi awan.',
    iconName: 'ShieldCheck',
    courses: ['Ethical Hacking', 'System Administrator', 'Cloud Computing', 'Jaringan Nirkabel']
  },
  {
    id: 'lp-edtech',
    name: 'Educational Technology & E-Learning',
    desc: 'Fokus pada inovasi pedagogi digital, desain e-learning, pengolahan media edukasi, dan penulisan ilmiah.',
    iconName: 'BookOpen',
    courses: ['Teknologi Pembelajaran Modern', 'E-learning', 'Media Komunikasi, Informasi dan Edukasi', 'Penulisan Karya Ilmiah']
  },
  {
    id: 'lp-media',
    name: 'Digital Creative Media & Immersive Tech',
    desc: 'Fokus pada pengembangan aplikasi Augmented/Virtual Reality, desain 3D, animasi, dan game edukasi.',
    iconName: 'Gamepad2',
    courses: ['Aplikasi Mixed Reality', 'Cinematography', '3D Design and Production', 'Game based learning']
  },
  {
    id: 'lp-techno',
    name: 'Digital Entrepreneurship & EdTech Startup',
    desc: 'Fokus pada pendirian start-up digital, tata kelola IT, bisnis digital, dan komersialisasi produk teknologi.',
    iconName: 'Rocket',
    courses: ['Bisnis Digital', 'Audit Sistem Informasi', 'Kewirausahaan', 'Hak Kekayaan Intelektual', 'Pemberdayaan Masyarakat']
  }
];

// ATURAN KONVERSI (Actionable Points)
export const ATURAN_KONVERSI = [
  {
    id: 1,
    title: 'Mahasiswa Wisuda Periode I 2026/2027',
    status: 'Tidak Berlaku Konversi',
    isHighlight: false,
    desc: 'Mahasiswa yang menjadwalkan wisuda pada Periode I TA 2026/2027 tetap menyelesaikan studi menggunakan struktur Kurikulum 2022.'
  },
  {
    id: 2,
    title: 'Mahasiswa KRS Semester Gasal TA 2026/2027',
    status: 'Berlaku Konversi Kurikulum 2026',
    isHighlight: true,
    desc: 'Seluruh mahasiswa aktif PTI yang mengambil KRS pada Semester Gasal 2026/2027 secara otomatis dikonversi ke Kurikulum 2026.'
  },
  {
    id: 3,
    title: 'Mahasiswa Bebas Teori & Sedang Menempuh Skripsi',
    status: 'Berlaku Konversi Kurikulum 2026',
    isHighlight: true,
    desc: 'Mahasiswa yang sudah dinyatakan bebas teori dan sedang menyelesaikan Skripsi tetap dikonversi tanpa perlu mengambil mata kuliah Seminar Proposal.'
  }
];

// PERUBAHAN UMUM
export const GENERAL_CHANGES: GeneralChangeItem[] = [
  {
    title: 'Total SKS Lulus',
    oldVal: '144 SKS',
    newVal: '146 SKS',
    desc: 'Total SKS minimum kelulusan bertambah 2 SKS untuk mengakomodasi penguatan kompetensi Life Skills & Capstone Project.'
  },
  {
    title: 'Mata Kuliah Pilihan',
    oldVal: '5 MK Wajib dari 30 Opsi',
    newVal: '3 MK Wajib dari 30 Opsi (9 SKS)',
    desc: 'Mahasiswa hanya perlu mengambil 3 MK Pilihan saja sesuai dengan Learning Path karir yang dipilih.'
  },
  {
    title: 'Praktik Industri (PI)',
    oldVal: '2 SKS (Durasi 1 Bulan)',
    newVal: '4 SKS (Durasi 3 Bulan)',
    desc: 'Durasi magang industri diperpanjang menjadi 3 bulan untuk memberikan pengalaman kerja nyata di industri IT/EdTech.'
  },
  {
    title: 'Program Pengenalan Lapangan Persekolahan (PLP)',
    oldVal: 'PLP I (1 SKS) & PLP II (3 SKS) Terpisah',
    newVal: 'PLP Terintegrasi (4 SKS) di Semester 7',
    desc: 'PLP I dan PLP II disatukan menjadi 1 mata kuliah terpadu 4 SKS yang ditempuh pada Semester 7.'
  },
  {
    title: 'Mata Kuliah Life Skills',
    oldVal: 'Terintegrasi pada KKN',
    newVal: 'Mata Kuliah Berdiri Sendiri (2 SKS)',
    desc: 'Life Skills kini menjadi mata kuliah mandiri 2 SKS di Semester 7 untuk pembekalan etika kerja & kepemimpinan.'
  }
];

// PERUBAHAN NAMA & SEMESTER MATA KULIAH
export const COURSE_NAME_CHANGES: CourseNameChangeItem[] = [
  { oldName: 'Pengembangan Bahan Ajar', oldSem: 'Sem 5', newName: 'Etika Profesi', newSem: 'Sem 1' },
  { oldName: 'Manajemen Pendidikan', oldSem: 'Sem 2', newName: 'Manajemen Pendidikan', newSem: 'Sem 5' },
  { oldName: 'Transformasi Digital', oldSem: 'Sem 3', newName: 'Literasi Digital', newSem: 'Sem 2' },
  { oldName: 'Literasi Digital', oldSem: 'Pilihan', newName: 'Transformasi Digital', newSem: 'Pilihan' },
  { oldName: 'Administrasi Jaringan', oldSem: 'Sem 6', newName: 'Cybersecurity', newSem: 'Sem 5' },
  { oldName: 'Dasar Jaringan Komputer', oldSem: 'Sem 3', newName: 'Pengantar Sistem Jaringan Modern', newSem: 'Sem 3' },
  { oldName: 'Pembelajaran Mikro', oldSem: 'Sem 6', newName: 'Microteaching', newSem: 'Sem 6' },
  { oldName: 'Proyek Mandiri', oldSem: 'Sem 6', newName: 'Instructional Capstone Project', newSem: 'Sem 6' },
  { oldName: 'PLP I & PLP II', oldSem: 'Sem 4 & 7', newName: 'PLP (4 SKS)', newSem: 'Sem 7' },
  { oldName: 'Skripsi', oldSem: 'Sem 8', newName: 'Seminar Proposal + Tugas Akhir', newSem: 'Sem 7 & 8' },
  { oldName: 'Teknologi Motion Tracking', oldSem: 'Pilihan', newName: 'Teknologi Pembelajaran Modern', newSem: 'Pilihan' },
  { oldName: 'Pengolahan Citra Digital', oldSem: 'Pilihan', newName: 'Game based learning', newSem: 'Pilihan' },
  { oldName: 'Multiplayer Game', oldSem: 'Pilihan', newName: 'Learning Experience Design', newSem: 'Pilihan' },
  { oldName: 'Perakitan Komputer dan Praktik', oldSem: 'Pilihan', newName: 'Machine Learning', newSem: 'Pilihan' },
  { oldName: 'Riset Operasi', oldSem: 'Pilihan', newName: 'Pengembangan Aplikasi Modern', newSem: 'Pilihan' },
  { oldName: 'Wireless Sensor Network', oldSem: 'Pilihan', newName: '3D Design and Production', newSem: 'Pilihan' },
  { oldName: 'Etika Profesi Keguruan', oldSem: 'Sem 6', newName: 'Big Data Fundamental', newSem: 'Pilihan' },
  { oldName: 'Perkembangan Peserta Didik', oldSem: 'Sem 6', newName: 'Pemberdayaan Masyarakat', newSem: 'Pilihan' },
  { oldName: 'Pembelajaran Tematik', oldSem: 'Pilihan', newName: 'Media Komunikasi, Informasi dan Edukasi', newSem: 'Pilihan' },
  { oldName: 'Aplikasi Mixed Reality', oldSem: 'Pilihan', newName: 'Aplikasi Mixed Reality', newSem: 'Pilihan' }
];

// PERUBAHAN BOBOT SKS
export const SKS_CHANGES: SksChangeItem[] = [
  { courseName: 'Kalkulus', oldSks: 3, newSks: 2 },
  { courseName: 'Aljabar Linier', oldSks: 3, newSks: 2 },
  { courseName: 'Kecerdasan Buatan', oldSks: 3, newSks: 2 },
  { courseName: 'Komputer Grafik dan Animasi', oldSks: 3, newSks: 2 },
  { courseName: 'Praktik Industri', oldSks: 2, newSks: 4, note: 'Durasi diperpanjang dari 1 bulan ke 3 bulan' },
  { courseName: 'PLP (Program Pengenalan Lapangan)', oldSks: 3, newSks: 4, note: 'Penggabungan PLP I (1 SKS) + PLP II (3 SKS)' },
  { courseName: 'Skripsi', oldSks: 4, newSks: 6, note: 'Dipecah menjadi Seminar Proposal (2 SKS) & Tugas Akhir (4 SKS)' }
];
