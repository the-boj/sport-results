/*****
 * Generic types
 */
export interface Title {
    __type: 'text_box';
    style: Style;
    text: string;
}

export interface Style {
    __type: string;
    border_color: string;
    font: string;
    text_color: string;
    variant: Variant[];
}

export interface Variant {
    __type: string;
    border_color: string;
    text_color: string;
    mode: string;
}

export interface Statut {
    __type: 'evenement_statut';
    periode: string;
    style: Style;
    libelle?: string;
    type: 'termine' | 'avenir' | 'encours';
}

export interface Country {
    __type: string;
    abreviation: string;
    url_drapeau: string;
}

export type Sport = 'Basket' | 'Rugby' | 'Football' | 'Tennis' | 'Cyclisme sur route';

/*****
 * Data API types
 */
export interface ApiResponse {
    __type: string;
    data: Data[];
    updated_at: string;
}

export interface Data {
    __type: 'page_descriptor';
    content: Content;
}

export interface Content {
    __type: 'page_descriptor_content';
    feed: Feed;
}

export interface Feed {
    __type: 'page_descriptor_feed';
    items: (ItemLiveSport | FeedItemOther | FeedItemImage | FeedItemDFP)[];
}

/*****
 * Items to display types
 */
export interface ItemLiveSport {
    __type: 'live_listing_widget';
    items: (ItemLiveCompetition | FeedItemOther | FeedItemImage | FeedItemDFP)[];
    title?: Title;
    type: 'sport';
}
export interface ItemLiveCompetition {
    __type: 'live_listing_widget';
    items: (ItemLiveSportEvent | ItemLivePhase | FeedItemOther | FeedItemImage | FeedItemDFP)[];
    title: Title;
    type: 'competition';
}
export interface ItemLivePhase {
    __type: 'live_listing_widget';
    items: (ItemLiveSportEvent | FeedItemOther | FeedItemImage | FeedItemDFP)[];
    title?: Title;
    call_to_action?: CallToAction;
    type: 'phase';
}
export interface ItemLiveSportEvent {
    __type: 'sport_event_widget';
    event: ItemLiveSportMeeting;
}
/******
 * Single item information types
 */
export type ItemLiveSportMeeting = ItemLiveTennis | ItemLiveSportCollectif | ItemLiveCourse | ItemLiveAllo;
export interface ItemLiveAllo {
    __type: 'allo';
    commente: boolean;
    date: string;
    id: string;
    lien: string;
    lien_web: string;
    statut: Statut;
    titre: string;
}
export interface ItemLiveTennis {
    __type: 'match_tennis';
    date: string;
    id: string;
    statut: Statut;
    specifics: SpecificsTennis;
}
export interface ItemLiveSportCollectif {
    __type: 'rencontre_sport_collectif';
    date: string;
    id: string;
    lien: string;
    statut: Statut;
    specifics: SpecificsSportCollectif;
}
export interface ItemLiveCourse {
    __type: 'course';
    commente: boolean;
    date: string;
    id: string;
    lien: string;
    lien_web: string;
    statut: Statut;
    specifics: SpecificsCourse;
}
export interface SpecificsCourse {
    __type: 'specifics_course';
    classement?: Classement[];
}
export interface CallToAction {
    __type: 'call_to_action';
    text: string;
    link: Link;
}
export interface Link {
    __type: 'urls';
    web: string;
}
export interface Classement {
    __type: 'race_ranking_widget';
    person: Person;
    title: Title;
}
export interface Person {
    __type: 'personne';
    id: string;
    nom: string;
    nom_abrege: string;
    nom_complet: string;
    pays: Country;
    prenom: string;
}
export interface CoursePerson {
    __type: 'personne';
    id: string;
    nom: string;
    nom_abrege: string;
    nom_complet: string;
    pays: Country;
    prenom: 'Francesco';
}
export interface SpecificsTennis {
    __type: 'specifics_rencontre_tennis';
    domicile: TennisData;
    exterieur: TennisData;
    sets?: TennisSet[];
    vainqueur?: 'domicile' | 'exterieur';
}
export interface SpecificsSportCollectif {
    __type: 'specifics_sport_collectif';
    domicile: EquipeData;
    exterieur: EquipeData;
    score?: Score;
    vainqueur?: 'domicile' | 'exterieur';
}
export interface TennisData {
    __type: 'effectif_tennis';
    sportifs: Sportif[];
}
export interface Sportif {
    __type: 'tennisman';
    id: string;
    nom: string;
    nom_abrege: string;
    nom_complet: string;
    pays: Country;
    prenom: string;
    rang: string;
}
export interface EquipeData {
    __type: 'effectif_sport_collectif';
    equipe: Equipe;
}
export interface Equipe {
    __type: 'equipe';
    id: string;
    nom: string;
    rang?: string;
    short_name: string;
    url_image: string;
}
export interface Score {
    __type: 'score';
    domicile: string;
    exterieur: string;
}
export interface TennisSet {
    __type: 'tennis_set';
    en_cours: boolean;
    gagnant: string;
    numero: number;
    score_jeux: ScoreJeux;
    score_tie: ScoreTie;
}

export interface ScoreJeux {
    __type: 'score';
    domicile: string;
    exterieur: string;
}

export interface ScoreTie {
    __type: 'score';
    domicile: string;
    exterieur: string;
}
/*****
 * Ads -> to drop
 */
export interface FeedItemOther {
    __type: 'outbrain_widget';
}

export interface FeedItemImage {
    __type: 'image_widget';
}

export interface FeedItemDFP {
    __type: 'DFP_banner_widget';
}

export interface Instant {
    __type: 'instant';
    date: string;
    libelle: string;
}
