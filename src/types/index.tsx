export interface Surah {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
        [key: string]: string
    };
}

export interface SurahNavigation {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
}

export interface SurahDetailData {
    nama: string;
    namaLatin: string;
    jumlahAyat : number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    ayat: Ayat[];
    suratSelanjutnya: boolean | SurahNavigation;
    suratSebelumnya: boolean | SurahNavigation;
}

export interface Ayat {
    nomorAyat: number;
    textArab: string;
    teksLatin: string;
    textIndonesia: string;
}


export interface AyatListResponse {
    code: number;
    message: string;
    data: SurahDetailData;
}

export interface SurahListResponse {
    code: number;
    message: string;
    data: Surah[]
}