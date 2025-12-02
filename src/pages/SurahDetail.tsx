import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAllAyat } from '../api/quranService';
import type { AyatListResponse, SurahNavigation } from '../types';

export default function SurahDetail() {
  const { nomor } = useParams<{ nomor: string }>();
  const [detail, setDetail] = useState<AyatListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeskripsi, setShowDeskripsi] = useState(false);

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getDetail = async () => {
      if (!nomor) return;
      try {
        setLoading(true);
        if (currentAudio) {
            currentAudio.pause();
            setPlayingAyat(null);
        }
        
        const data = await fetchAllAyat(Number(nomor));
        setDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getDetail();

    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [nomor]);

  const toggleAudio = (url: string, nomorAyat: number) => {
    if (playingAyat === nomorAyat && currentAudio) {
      currentAudio.pause();
      setPlayingAyat(null);
      return;
    }
    if (currentAudio) {
      currentAudio.pause();
    }
    const newAudio = new Audio(url);
    newAudio.play();
    setCurrentAudio(newAudio);
    setPlayingAyat(nomorAyat);

    newAudio.onended = () => {
      setPlayingAyat(null);
    };
  };

  if (loading) return <div className="text-center mt-20 text-emerald-600 font-bold animate-pulse">Sedang Memuat Surat...</div>;
  if (!detail || !detail.data) return <div className="text-center mt-20">Data tidak ditemukan</div>;

  const prevSurah = detail.data.suratSebelumnya as SurahNavigation | false;
  const nextSurah = detail.data.suratSelanjutnya as SurahNavigation | false;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        
        {/* --- HEADER --- */}
        <div className="header-card">
            <h1 className="text-4xl font-bold text-gray-800 mb-1">
                {detail.data.namaLatin}
            </h1>
            <p className="text-3xl font-arabic text-emerald-600 mb-2">
                {detail.data.nama}
            </p>
            <div className="flex justify-center gap-3 text-sm font-semibold text-gray-500 mb-4">
                <span className="bg-white/60 px-3 py-1 rounded-full border">{detail.data.tempatTurun}</span>
                <span className="bg-white/60 px-3 py-1 rounded-full border">{detail.data.jumlahAyat} Ayat</span>
            </div>
            
            <button 
                onClick={() => setShowDeskripsi(!showDeskripsi)}
                className="text-emerald-600 text-sm font-bold hover:underline transition-all"
            >
                {showDeskripsi ? 'Tutup Info' : 'Lihat Info Surat'}
            </button>

            {showDeskripsi && (
              <div className="mt-6 text-left bg-white p-6 rounded-2xl border shadow-sm animate-in fade-in slide-in-from-top-2">
                  <div className="text-gray-700 text-sm leading-relaxed text-justify space-y-2" dangerouslySetInnerHTML={{ __html: detail.data.deskripsi }} />
              </div>
            )}
        </div>

        {/* --- LIST AYAT --- */}
        <div className="space-y-10">
            {detail.data.ayat.map((ayat) => (
                <div key={ayat.nomorAyat} className="ayat-container border-b border-gray-100 pb-8">
                    <div className="flex justify-between items-center mb-6 bg-gray-50/50 p-2 rounded-lg">
                        <div className="nomor-wrapper ml-2">
                            <div className="nomor-box"></div>
                            <span className="nomor-text">{ayat.nomorAyat}</span>
                        </div>
                        
                        <div className="mr-2">
                           <button 
                              onClick={() => toggleAudio(ayat.audio['05'], ayat.nomorAyat)}
                              className={`btn-audio ${playingAyat === ayat.nomorAyat ? 'playing' : ''}`}
                              title="Putar Audio"
                           >
                              {playingAyat === ayat.nomorAyat ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                              )}
                           </button>
                        </div>
                    </div>

                    <p className="text-arab">
                        {ayat.teksArab}
                    </p>

                    <div className="pl-2 border-l-4 border-emerald-100 hover:border-emerald-400 transition-colors duration-300">
                        <span className="text-latin">
                           {ayat.teksLatin}
                        </span>
                        <p className="text-terjemahan">
                            {ayat.teksIndonesia}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        {/* --- NAVIGASI PREV & NEXT --- */}
        <div className="nav-container">
            {prevSurah ? (
                <Link to={`/surat/${prevSurah.nomor}`} className="nav-card">
                    <div className="text-emerald-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </div>
                    <div>
                        <span className="nav-label">Sebelumnya</span>
                        <h3 className="nav-name">{prevSurah.namaLatin}</h3>
                    </div>
                </Link>
            ) : (
                <div className="flex-1"></div>
            )}

            {nextSurah ? (
                <Link to={`/surat/${nextSurah.nomor}`} className="nav-card flex-row-reverse text-right">
                    <div className="text-emerald-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                    <div>
                        <span className="nav-label">Selanjutnya</span>
                        <h3 className="nav-name">{nextSurah.namaLatin}</h3>
                    </div>
                </Link>
            ) : (
                 <div className="flex-1"></div>
            )}
        </div>

      </div>
    </div>
  );
}