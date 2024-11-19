/*****
 * Generic types
 */
interface Title {
    __type: 'text_box';
    style: Style;
    text: string;
}

interface Style {
    __type: string;
    border_color: string;
    font: string;
    text_color: string;
    variant: Variant[];
}

interface Variant {
    __type: string;
    border_color: string;
    text_color: string;
    mode: string;
}

interface Statut {
    __type: 'evenement_statut';
    periode: string;
    style: Style;
    libelle?: string;
    type: 'termine' | 'avenir' | 'encours';
}

interface Country {
    __type: string;
    abreviation: string;
    url_drapeau: string;
}

type Sport = 'Basket' | 'Rugby' | 'Football' | 'Tennis';

/*****
 * Data API types
 */
interface ApiResponse {
    __type: string;
    data: Data[];
    updated_at: string;
}

interface Data {
    __type: 'page_descriptor';
    content: Content;
}

interface Content {
    __type: 'page_descriptor_content';
    feed: Feed;
}

interface Feed {
    __type: 'page_descriptor_feed';
    items: (ItemLiveSport | FeedItemOther | FeedItemImage | FeedItemDFP)[];
}

/*****
 * Items to display types
 */
interface ItemLiveSport {
    __type: 'live_listing_widget';
    items: (ItemLiveCompetition | FeedItemOther | FeedItemImage | FeedItemDFP)[];
    title: Title;
    type: 'sport';
}
interface ItemLiveCompetition {
    __type: 'live_listing_widget';
    items: (ItemLiveSportEvent | ItemLivePhase | FeedItemOther | FeedItemImage | FeedItemDFP)[];
    title: Title;
    type: 'competition';
}
interface ItemLivePhase {
    __type: 'live_listing_widget';
    items: (ItemLiveSportEvent | FeedItemOther | FeedItemImage | FeedItemDFP)[];
    title?: Title;
    type: 'phase';
}
interface ItemLiveSportEvent {
    __type: 'sport_event_widget';
    event: ItemLiveSportMeeting;
}
/******
 * Single item information types
 */
type ItemLiveSportMeeting = ItemLiveTennis | ItemLiveSportCollectif | ItemLiveCourse | ItemLiveAllo;
interface ItemLiveAllo {
    __type: 'allo';
    commente: boolean;
    date: string;
    id: string;
    lien: string;
    lien_web: string;
    statut: Statut;
    titre: string;
}
interface ItemLiveTennis {
    __type: 'match_tennis';
    date: string;
    id: string;
    statut: Statut;
    specifics: SpecificsTennis;
}
interface ItemLiveSportCollectif {
    __type: 'rencontre_sport_collectif';
    date: string;
    id: string;
    statut: Statut;
    specifics: SpecificsSportCollectif;
}
interface ItemLiveCourse {
    __type: 'course';
    commente: boolean;
    date: string;
    id: string;
    lien: string;
    lien_web: string;
    statut: Statut;
    specifics: SpecificsCourse;
}
interface SpecificsCourse {
    __type: 'specifics_course';
    classement?: Classement[];
}
interface Classement {
    __type: 'race_ranking_widget';
    person: Person;
    title: Title;
}
interface Person {
    __type: 'personne';
    id: string;
    nom: string;
    nom_abrege: string;
    nom_complet: string;
    pays: Country;
    prenom: string;
}
interface CoursePerson {
    __type: 'personne';
    id: string;
    nom: string;
    nom_abrege: string;
    nom_complet: string;
    pays: Country;
    prenom: 'Francesco';
}
interface SpecificsTennis {
    __type: 'specifics_rencontre_tennis';
    domicile: TennisData;
    exterieur: TennisData;
    sets?: TennisSet[];
    vainqueur?: 'domicile' | 'exterieur';
}
interface SpecificsSportCollectif {
    __type: 'specifics_sport_collectif';
    domicile: EquipeData;
    exterieur: EquipeData;
    score?: Score;
    vainqueur?: 'domicile' | 'exterieur';
}
interface TennisData {
    __type: 'effectif_tennis';
    sportifs: Sportif[];
}
interface Sportif {
    __type: 'tennisman';
    id: string;
    nom: string;
    nom_abrege: string;
    nom_complet: string;
    pays: Country;
    prenom: string;
    rang: string;
}
interface EquipeData {
    __type: 'effectif_sport_collectif';
    equipe: Equipe;
}
interface Equipe {
    __type: 'equipe';
    id: string;
    nom: string;
    rang?: string;
    short_name: string;
    url_image: string;
}
interface Score {
    __type: 'score';
    domicile: string;
    exterieur: string;
}
interface TennisSet {
    __type: 'tennis_set';
    en_cours: boolean;
    gagnant: string;
    numero: number;
    score_jeux: ScoreJeux;
    score_tie: ScoreTie;
}

interface ScoreJeux {
    __type: 'score';
    domicile: string;
    exterieur: string;
}

interface ScoreTie {
    __type: 'score';
    domicile: string;
    exterieur: string;
}
/*****
 * Ads -> to drop
 */
interface FeedItemOther {
    __type: 'outbrain_widget';
}

interface FeedItemImage {
    __type: 'image_widget';
}

interface FeedItemDFP {
    __type: 'DFP_banner_widget';
}
