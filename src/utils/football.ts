import { ChampionshipNames, FootballRankings } from "../types/football/rankings"

const footballClassementsBaseUrl = `https://iphdata.lequipe.fr/iPhoneDatas/EFR/STD/ALL/V1/Football/ClassementsBase/current/--championship--/general.json`

export async function requestFootballLeaderboard(championship: ChampionshipNames) {
    const url = footballClassementsBaseUrl.replace("--championship--", championship)
    const res = await fetch(url)

    return res.json() as Promise<FootballRankings>
}