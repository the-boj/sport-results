import { ApiResponse } from '../types/api';
import { FootballRecap } from '../types/football/recap';
import { FootballFlux } from '../types/football/flux';
import { formatDateToString } from '../utils/utils';
import { BasketballLeaderboard } from '../types/basketball/leaderboard';
import { BasketballPlayerStats } from '../types/basketball/playerStats';
import { FootballRankings } from '../types/football/rankings';
import { ChampionshipNames } from '../types/slugs';
import { PlayersStats } from '../types/football/player';
import { CyclingLiveEvents } from 'src/types/cycling/live';

const baseUrl = 'https://dwh.lequipe.fr/api/live/lives?date=--date--&platform=desktop&version=1.0';

export async function requestApi(date: Date) {
    const res = await fetch(baseUrl.replace('--date--', formatDateToString(date)));

    return res.json() as Promise<ApiResponse>;
}

/*****
 * Football
 */

const footballClassementsBaseUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V1/Football/ClassementsBase/current/--championship--/general.json`;
const footballRecapUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V5/Football/Matchs/--ext--/--matchId--.json`;
const footballFluxUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V1/Football/Commentaires/--ext--/--matchId--.json`;
// const footballPlayersStatsV2Url = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V2/Football/MatchPlayerStats/--ext--/--matchId--.json`
// const footballPlayersStatsV3Url = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V3/Football/MatchPlayerStats/--ext--/--matchId--.json`
const footballStatsUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V2/Football/MatchStats/--ext--/--matchId--.json`;

export async function requestFootballLeaderboard(championship: ChampionshipNames) {
    const url = footballClassementsBaseUrl.replace('--championship--', championship);
    const res = await fetch(url);

    return res.json() as Promise<FootballRankings>;
}

export async function requestFootballRecap(matchId: string) {
    const ext = matchId.substring(matchId.length - 2);
    const url = footballRecapUrl.replace('--ext--', ext).replace('--matchId--', matchId);
    const res = await fetch(url);

    return res.json() as Promise<FootballRecap>;
}

export async function requestFootballFlux(matchId: string) {
    const ext = matchId.substring(matchId.length - 2);
    const url = footballFluxUrl.replace('--ext--', ext).replace('--matchId--', matchId);
    const res = await fetch(url);

    return res.json() as Promise<FootballFlux>;
}

export async function requestFootballStats(matchId: string) {
    const ext = matchId.substring(matchId.length - 2);
    const url = footballStatsUrl.replace('--ext--', ext).replace('--matchId--', matchId);
    const res = await fetch(url);

    return res.json() as Promise<{}>;
}

// export async function requestFootballPlayersV2(matchId: string) {
//     const ext = matchId.substring(matchId.length - 2)
//     const url = footballPlayersStatsV2Url.replace("--ext--", ext).replace("--matchId--", matchId)
//     const res = await fetch(url)

//     return res.json() as Promise<PlayersStats>
// }

export async function requestFootballPlayersV3(url: string) {
    const res = await fetch(url);

    return res.json() as Promise<PlayersStats>;
}

/*****
 * Basketball
 */

const basketballLeaderboardUrl = `https://dwh.lequipe.fr/api/live/lives/leaderboard?path=--path--&platform=mobile&version=1.0`;
const basketballPlayerStatsUrl = `https://dwh.lequipe.fr/api/live/lives/player-stats?path=--path--&platform=mobile&version=1.0`;

export async function requestBasketballLeaderboard(path: string) {
    const url = basketballLeaderboardUrl.replace('--path--', path);
    const res = await fetch(url);

    return res.json() as Promise<BasketballLeaderboard>;
}

export async function requestBasketballPlayerStats(path: string) {
    const url = basketballPlayerStatsUrl.replace('--path--', path);
    const res = await fetch(url);

    return res.json() as Promise<BasketballPlayerStats>;
}

/*****
 * Cycling
 */

const cyclingRaceEventsUrl = `https://sdwh.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V1/Cyclisme-sur-route/LiveComments/--ext--/--raceId--.json`;

export async function requestCyclingLive(raceId: string) {
    const ext = raceId.substring(raceId.length - 2);
    const url = cyclingRaceEventsUrl.replace('--ext--', ext).replace('--raceId--', raceId);
    const res = await fetch(url);

    return res.json() as Promise<CyclingLiveEvents>;
}
