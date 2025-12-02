import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Input } from '../components/ui/input';
import { useSurah } from '../hooks/useSurah';
import { Card } from "../components/ui/card";
// import { Navbar } from ",,"

function Home() {
  const { surahs, loading, error } = useSurah();
  const [search, setSearch] = useState<string>("");

   useEffect(() => {
    document.title = "Al-Qur'an Digital - Kelompok Kopi Liong Es 1";
  }, []);

  const filteredSurahs = useMemo(() => {
    if (!search) {
      return surahs;
    }
    const lowerCaseSearchItem = search.toLowerCase();
    return surahs.filter((surah) => {
      return (
        surah.namaLatin.toLowerCase().includes(lowerCaseSearchItem) ||
        surah.nama.toLowerCase().includes(lowerCaseSearchItem)
      );
    });
  }, [surahs, search]);

  if (loading || error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* --- HEADER & SEARCH --- */}
        <div className="text-center mb-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Mau baca surat apa hari ini?
            </h2>
            <p className="text-gray-500">
                Temukan ketenangan dalam setiap ayat-Nya
            </p>
            
            <div className="max-w-md mx-auto relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <Input
                    placeholder='Cari surat (contoh: Yasin)...'
                    className='pl-10 h-12 rounded-full border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm transition-all'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        {/* --- GRID SURAT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurahs.map((item) => (
            <Link to={`/surat/${item.nomor}`} key={item.nomor} className="block group">
                <Card className='h-full p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-gray-100 hover:border-emerald-200 bg-white group-hover:bg-emerald-50/30'>
                    <div className='flex items-center justify-between'>
                        
                        <div className='flex items-center gap-4'>
                            {/* Nomor Surat Gaya Diamond */}
                            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                                <div className="absolute inset-0 bg-gray-100 rounded-lg rotate-45 group-hover:bg-emerald-500 transition-colors duration-300"></div>
                                <span className="relative font-bold text-gray-700 group-hover:text-white transition-colors text-sm">
                                    {item.nomor}
                                </span>
                            </div>

                            <div className="min-w-0">
                                <h3 className='text-lg font-bold text-gray-800 group-hover:text-emerald-700 truncate transition-colors'>
                                    {item.namaLatin}
                                </h3>
                                <p className='text-sm text-gray-500 truncate group-hover:text-emerald-600/70'>
                                    {item.arti}
                                </p>
                            </div>
                        </div>

                        <div className='text-right flex-shrink-0'>
                            <p className='font-arabic text-xl text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors'>
                                {item.nama}
                            </p>
                            <span className='text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-white group-hover:text-emerald-500 border border-transparent group-hover:border-emerald-100 transition-all'>
                                {item.jumlahAyat} Ayat
                            </span>
                        </div>

                    </div>
                </Card>
            </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home