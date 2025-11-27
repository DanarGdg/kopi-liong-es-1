import { fetchAllSurahs } from "@/api/quranService"
import type { Surah } from "@/types"
import { useEffect, useState } from "react"

export const useSurah = () => {
    const [surahs, setSurahs] = useState<Surah[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadSurahs() {
            try {
                const data = await fetchAllSurahs()
                setSurahs(data)
            } catch (error) {
                setError("Gagal fetch data surat")
                setSurahs([])
            } finally {
                setLoading(false)
            }
        }
    }, [])

    return { surahs, loading, error }
}