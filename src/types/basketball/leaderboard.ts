import { Equipe, Score, Statut } from "../api"

export interface BasketballLeaderboard {
    __type: "flux_live"
    date: string
    id: string
    leaderboard: Leaderboard
  }
  
  export interface Leaderboard {
    __type: "leaderboard"
    sport_event: SportEvent
    status: Statut
    subtitle: string
    surtitle: string
    title: string
  }
  
  export interface SportEvent {
    __type: "rencontre_sport_collectif"
    date: string
    id: string
    specifics: Specifics
  }
  
  export interface Specifics {
    __type: "specifics_sport_collectif"
    away_color_set: string
    details_score: DetailsScore[]
    domicile: DomicileExterieur
    exterieur: DomicileExterieur
    home_color_set: string
    is_final: boolean
    is_qualifier: boolean
    prolongation: boolean
    score: Score
    vainqueur: string
  }
  
  export interface DetailsScore {
    __type: "score"
    domicile: string
    en_cours: boolean
    exterieur: string
    libelle: string
  }
  
  export interface DomicileExterieur {
    __type: "effectif_sport_collectif"
    equipe: Equipe
  }
  