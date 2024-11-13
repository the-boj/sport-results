import { formatDateToString } from '../utils/utils';

const baseUrl = "https://dwh.lequipe.fr/api/live/lives?date=--date--&platform=desktop&version=1.0"

export async function requestApi(date: Date) {
    const res = await fetch(baseUrl.replace("--date--", formatDateToString(date)))

    return res.json() as Promise<ApiResponse>
}