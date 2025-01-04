import { Equipe } from "../api"
import { Joueur } from "../football/recap"

export interface BasketballPlayerStats {
    __type: string
    items: PlayersStats[]
  }
  
  export interface PlayersStats {
    __type: "match_players_statistics_table"
    items: PlayerStat[]
  }
  
  export interface PlayerStat {
    __type: "match_players_statistics_line"
    items: Stat[]
    player: Joueur
    team: Equipe
  }
  
  export interface Stat {
    __type: "match_player_statistics_item"
    label: string
    math_value: number
    value: string
  }
  