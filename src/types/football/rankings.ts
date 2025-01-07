import { Equipe, ItemLiveCompetition, Statut } from "../api";
import { Specifics } from "./recap";

export type ChampionshipNames =
    | 'championnat-d-angleterre'
    | 'ligue-1'
    | 'championnat-d-italie'
    | 'championnat-d-espagne'
    | 'championnat-d-allemagne'
    | 'championnat-du-portugal'
    | 'championnat-d-ecosse'
    | 'championnat-de-turquie';
export const Championship: ChampionshipNames[] = [
    'championnat-d-angleterre',
    'ligue-1',
    'championnat-d-italie',
    'championnat-d-espagne',
    'championnat-d-allemagne',
    'championnat-du-portugal',
    'championnat-d-ecosse',
    'championnat-de-turquie',
];

export interface FootballRankings {
    __type: "flux";
    H1: string;
    items: LayoutWraper[];
}

export type LayoutWraper = LayoutWraperHeader | LayoutWraperList;

export interface LayoutWraperHeader {
    __type: "layout_wrapper";
    layout: "base_header";
    objet: BaseHeader;
}

export interface LayoutWraperList {
    __type: "layout_wrapper";
    layout: "ranking_list";
    objet: RankingList;
}

export interface RankingList {
    __type: "ranking_list";
    direct?: boolean;
    items?: EquipeRanking[];
    libelle_direct?: string;
}

export interface BaseHeader {
    __type: "ranking_info";
    subtitle?: string;
    title?: string;
}

export interface EquipeRanking {
    __type: "classement";
    rank_label: string;
    bonus_defensif: number;
    bonus_offensif: number;
    buts_contre: number;
    buts_pour: number;
    difference_de_buts: number;
    difference_de_buts_libelle: string;
    equipe: Equipe;
    last_matches: LastMatch[];
    nombre_de_bonus: number;
    nombre_de_defaites: number;
    nombre_de_matchs: number;
    nombre_de_nuls: number;
    nombre_de_victoires: number;
    nombre_points: number;
    rang: number;
    rank_evolution: number;
}

export interface LastMatch {
    __type: string;
    competition: ItemLiveCompetition;
    date: string;
    id: string;
    lien: string;
    lien_web: string;
    statut: Statut;
    specifics: Specifics;
}
