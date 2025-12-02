import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchAllAyat } from '../api/quranService'; 
import type { AyatListResponse } from '@/types';

export default function SurahDetail() {
  const { nomor } = useParams<{ nomor: string }>();
  const [detail, setDetail] = useState<AyatListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      if (!nomor) return;
      try {
        setLoading(true);
        // Convert string URL ke number karena apimu butuh number
        const data = await fetchAllAyat(Number(nomor));
        setDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [nomor]);

  if (loading) return <div>Loading Ayat...</div>;
  if (!detail) return <div>Data tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-5">
            {detail.data.namaLatin} ({detail.data.nama})
        </h1>
        
        <div className="space-y-6">
            {detail.data.ayat.map((ayat) => (
                <div key={ayat.nomorAyat} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded">
                        <span className="w-8 h-8 flex items-center justify-center bg-primary text-black rounded-full border border-gray-300 font-bold">
                            {ayat.nomorAyat}
                        </span>
                    </div>
                    <p className="text-right text-3xl font-arabic mb-4 leading-loose">
                        {ayat.textArab}
                    </p>
                    <p className="text-gray-700 italic">
                        {ayat.textIndonesia}
                    </p>
                </div>
            ))}
        </div>
    </div>
  );
}