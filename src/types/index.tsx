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

export interface SurahListResponse {
    code: number;
    message: string;
    data: Surah[]
}