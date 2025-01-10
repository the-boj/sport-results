import { Equipe } from "../api"
import { Joueur } from "./recap"

export interface PlayersStats {
    __type: "match_players_statistics"
    items: PlayerStatData[]
  }
  
  export interface PlayerStatData {
    __type: "match_players_statistics_table"
    items: PlayerStat[]
    table_head: TableHead[]
  }
  
  export interface PlayerStat {
    __type: "match_players_statistics_line"
    items: Stat[]
    player: Joueur & { numero: number }
    team: Equipe
  }
  
  export interface Stat {
    __type: "match_player_statistics_item"
    label: string
    math_value: number
    value: string
    sub_value?: string
  }
  
  export interface TableHead {
    __type: "match_players_statistics_table"
    key: string
    label: string
    show_label: boolean
    sortable?: boolean
  }
  