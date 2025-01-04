import { Equipe, Instant, Sportif, Statut, Style } from '../api';

export interface FootballRecap {
    __type: 'rencontre_sport_collectif';
    nocturne: boolean;
    statut: Statut;
    id: string;
    date: string;
    commente: boolean;
    subtitle: Subtitle;
    specifics: Specifics;
    score_aller: string;
}

export interface Subtitle {
    __type: 'text_box';
    style: Style;
    text: string;
}

export interface Specifics {
    __type: 'specifics_sport_collectif';
    prolongation: boolean;
    arbitres: Arbitre[];
    exterieur: DomicileExterieur;
    domicile: DomicileExterieur;
    vainqueur_final: string;
    vainqueur: string;
    is_final: boolean;
    score: Score;
}

export interface Arbitre {
    __type: 'arbitre';
    nom: string;
    nom_complet: string;
    nom_abrege: string;
    prenom: string;
    id: string;
}

export interface DomicileExterieur {
    __type: 'effectif_sport_collectif';
    formation: string;
    composition: Composition[];
    tirs_au_buts: any[];
    buts: But[];
    cartons: Carton[];
    id_capitaine: string;
    ids_titulaires: string[];
    sportifs: Sportif[];
    encadrement: Encadrement[];
    ids_remplacants: string[];
    remplacements: any[];
    equipe: Equipe;
    url_maillot_joueur: string;
    url_maillot_gardien: string;
}

export interface Composition {
    __type: 'position_composition';
    x: number;
    y: number;
    joueur: Sportif;
    numero: number;
}

export interface Joueur extends Sportif {
    poste: string;
}

export interface Encadrement {
    __type: 'encadrant';
    nom: string;
    nom_complet: string;
    nom_abrege: string;
    prenom: string;
    url_fiche: string;
    id: string;
    role: string;
    role_short: string;
}

export interface But {
    __type: 'but';
    type: 'penaly' | 'contre' | 'normal';
    beneficiaire: 'exterieur' | 'domicile';
    id_rencontre: string;
    instant: Instant;
    libelle_type: string;
    joueur: Joueur;
}

export interface Carton {
    __type: 'carton';
    type: 'jaune' | 'rouge';
    joueur: Joueur;
    id_rencontre: string;
    instant: Instant;
}

export interface Score {
    __type: 'score';
    domicile: string;
    exterieur: string;
}
