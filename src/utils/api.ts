import { ApiResponse } from '../types/api';
import { FootballRecap } from '../types/football/recap';
import { FootballFlux } from '../types/football/flux';
import { formatDateToString } from '../utils/utils';
import { BasketballLeaderboard } from '../types/basketball/leaderboard';
import { BasketballPlayerStats } from '../types/basketball/playerStats';

const baseUrl = "https://dwh.lequipe.fr/api/live/lives?date=--date--&platform=desktop&version=1.0"

export async function requestApi(date: Date) {
    const res = await fetch(baseUrl.replace("--date--", formatDateToString(date)))

    return res.json() as Promise<ApiResponse>
}

/*****
 * Football
 */

const footballRecapUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V5/Football/Matchs/--ext--/--matchId--.json`
const footballFluxUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V1/Football/Commentaires/--ext--/--matchId--.json`
// const footballPlayersStatsV3Url = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V3/Football/MatchPlayerStats/79/--matchId--.json`
// const footballPlayersStatsV2Url = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V2/Football/MatchPlayerStats/79/--matchId--.json`
// const footballStatsUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V2/Football/MatchStats/79/--matchId--.json`

export async function requestFootballRecap(matchId: string) {
    const ext = matchId.substring(matchId.length - 2)
    const url = footballRecapUrl.replace("--ext--", ext).replace("--matchId--", matchId)
    const res = await fetch(url)

    return res.json() as Promise<FootballRecap>
}

export async function requestFootballFlux(matchId: string) {
    const ext = matchId.substring(matchId.length - 2)
    const url = footballFluxUrl.replace("--ext--", ext).replace("--matchId--", matchId)
    const res = await fetch(url)

    return res.json() as Promise<FootballFlux>
}

/*****
 * Basketball
 */

const basketballLeaderboardUrl = `https://dwh.lequipe.fr/api/live/lives/leaderboard?path=--path--&platform=mobile&version=1.0`
const basketballPlayerStatsUrl = `https://dwh.lequipe.fr/api/live/lives/player-stats?path=--path--&platform=mobile&version=1.0`

export async function requestBasketballLeaderboard(path: string) {
    const url = basketballLeaderboardUrl.replace("--path--", path)
    const res = await fetch(url)

    return res.json() as Promise<BasketballLeaderboard>
}

export async function requestBasketballPlayerStats(path: string) {
    const url = basketballPlayerStatsUrl.replace("--path--", path)
    const res = await fetch(url)

    return res.json() as Promise<BasketballPlayerStats>
}