import type { SurahListResponse } from "@/types";

export const BASE_URL = "https://equran.id/api/v2";

export async function fetchAllSurahs() {    
    try {
        const response = await fetch(`${BASE_URL}/surat`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result:SurahListResponse = await response.json()
        return result.data
    } catch (error) {
        console.log(`Error fetching surahs: ${error}`)
        throw error
    }
}