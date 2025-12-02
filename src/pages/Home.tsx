import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import { Input } from '../components/ui/input'
import { useSurah } from '../hooks/useSurah'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

function Home() {
  const { surahs, loading, error } = useSurah()
  const [search, setSearch] = useState<string>("")

  const filteredSurahs = useMemo(() => {
    if (!search) {
      return surahs
    }

    const lowerCaseSearchItem = search.toLowerCase()

    return surahs.filter((surah) => {
      return (
        surah.namaLatin.toLowerCase().includes(lowerCaseSearchItem) ||
        surah.nama.toLowerCase().includes(lowerCaseSearchItem)
      )
    })
  }, [surahs, search])

  if (loading || error) {
    return <h1>Loading</h1>
  }

  function truncateText(text: string, maxLength = 11) {
    // Memeriksa apakah panjang teks melebihi batas maksimum
    if (text.length > maxLength) {
      // Jika ya, potong teks dari awal (indeks 0) sampai batas maksimum
      // dan tambahkan elipsis "..." di belakangnya.
      return text.substring(0, maxLength) + '...';
    } else {
      // Jika tidak melebihi batas, kembalikan teks asli apa adanya.
      return text;
    }
  }

  return (
    <div className='max-w-7xl mx-auto p-10 space-y-5'>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-semibold'>Al-Qur'an</h1>
        <h1 className='text-4xl font-semibold'>Kelompok Kopi Liong Es 1</h1>
      </div>
      <Input
        placeholder='Cari surat...'
        className='w-80 mx-auto'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='grid grid-cols-3 gap-5'>
        {filteredSurahs.map((item) => (
          <a href=''>
            <Card className='w-[350px] px-5 py-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start gap-3 w-full min-w-0'>
                    <div className='flex-shrink-0'>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M50,0 L60,10 H90 L100,20 V40 L90,50 L100,60 V80 L90,90 H60 L50,100 L40,90 H10 L0,80 V60 L10,50 L0,40 V20 L10,10 H40 Z" fill="#A88D5D" />
                        <circle cx="50" cy="50" r="35" fill="#FFFFFF" />
                        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#000000" font-size="30" font-weight="bold" font-family="Arial, sans-serif">
                          {item.nomor}
                        </text>
                      </svg>
                    </div>
                    <div className='flex flex-col min-w-0 overflow-hidden'>

                      <div className='flex items-baseline gap-2.5 min-w-0 overflow-hidden'>
                        <h1 className='text-base font-semibold truncate'>
                          {item.namaLatin}
                        </h1>
                        <p className='text-xs font-normal text-gray-600 truncate'>({truncateText(item.arti)})</p>
                      </div>

                      <p className='text-xs text-gray-500 mt-0.5'>
                        {item.tempatTurun} - {item.jumlahAyat} ayat
                      </p>
                    </div>
                  </div>

                  <div className='shrink-0 text-2xl font-arabic'>
                    {item.nama}
                  </div>
                </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
export default Home
