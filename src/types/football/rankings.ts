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
    __type: string;
    H1: string;
    metas: Metas;
    items: Item[];
    pub_DFP: PubDfp;
    slug: Slug;
    stat: Stat;
}

export interface Metas {
    __type: string;
    canonical: string;
    description: string;
    id: string;
    label: string;
    opengraph_title: string;
    sub_label: string;
    title: string;
    twitter_title: string;
}

export interface Item {
    __type: string;
    layout: string;
    objet: Objet;
}

export interface Objet {
    __type: string;
    subtitle?: string;
    title?: string;
    direct?: boolean;
    items?: Item2[];
    libelle_direct?: string;
    lien?: string;
    tracking_id_android_phone?: string;
    tracking_id_android_tab?: string;
    tracking_id_ios_pad?: string;
    tracking_id_ios_phone?: string;
    widget_id_android_phone?: string;
    widget_id_android_tab?: string;
    widget_id_desktop?: string;
    widget_id_ios_pad?: string;
    widget_id_ios_phone?: string;
    widget_id_pwa?: string;
}

export interface Item2 {
    __type: string;
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

export interface Equipe {
    __type: string;
    id: string;
    nom: string;
    primary_color: PrimaryColor;
    secondary_color: SecondaryColor;
    url_fiche: string;
    url_image: string;
}

export interface PrimaryColor {
    __type: string;
}

export interface SecondaryColor {
    __type: string;
}

export interface LastMatch {
    __type: string;
    competition: Competition;
    date: string;
    id: string;
    lien: string;
    lien_web: string;
    statut: Statut;
    specifics: Specifics;
}

export interface Competition {
    __type: string;
    code: string;
    id: string;
    libelle: string;
}

export interface Statut {
    __type: string;
    libelle: string;
    type: string;
}

export interface Specifics {
    __type: string;
    domicile: Domicile;
    exterieur: Exterieur;
    is_final: boolean;
    is_qualifier: boolean;
    prolongation: boolean;
    score: Score;
    vainqueur: string;
    vainqueur_final: string;
}

export interface Domicile {
    __type: string;
    equipe: Equipe2;
}

export interface Equipe2 {
    __type: string;
    id: string;
    nom: string;
    url_fiche: string;
    url_image: string;
}

export interface Exterieur {
    __type: string;
    equipe: Equipe3;
}

export interface Equipe3 {
    __type: string;
    id: string;
    nom: string;
    url_fiche: string;
    url_image: string;
}

export interface Score {
    __type: string;
    domicile: string;
    exterieur: string;
}

export interface PubDfp {
    __type: string;
    ad_unit_id_android: string;
    ad_unit_id_desktop: string;
    ad_unit_id_ios: string;
    ad_unit_id_pwa: string;
    formats: Format[];
    keywords: string[];
    page_id: PageId[];
    parameters: Parameter[];
    position: string;
    site_id: SiteId[];
}

export interface Format {
    __type: string;
    platform: string;
    value: Value[];
}

export interface Value {
    __type: string;
    id: number;
    tag_id: string;
}

export interface PageId {
    __type: string;
    id: number;
    platform: string;
}

export interface Parameter {
    __type: string;
    key: string;
    value: string;
}

export interface SiteId {
    __type: string;
    id: number;
    platform: string;
}

export interface Slug {
    __type: string;
    items: Item3[];
}

export interface Item3 {
    key: string;
    value: string;
}

export interface Stat {
    __type: string;
    chapitre: string;
    indicateurs_application: IndicateursApplication[];
    niveau2: string;
    page: string;
    sous_chapitre: string;
    at_vars: AtVars;
}

export interface IndicateursApplication {
    __type: string;
    custom_var_type: string;
    id: number;
    valeur: string;
}

export interface AtVars {
    __type: string;
    basic: Basic;
    custom: Custom;
}

export interface Basic {
    name: string;
    chapter1: string;
    chapter2: string;
    chapter3: string;
    level2: string;
}

export interface Custom {
    '13': string;
    '14': string;
    '16': string;
    '17': string;
    '18': string;
    '19': string;
    '21': string;
    '22': string;
    '23': string;
    '26': number;
    '27': number;
    '28': string;
    '29': string;
    '30': string;
}
