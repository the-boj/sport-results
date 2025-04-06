export interface CyclingLiveEvents {
    __type: 'flux';
    highlights_count: number;
    items: Item[];
}

export interface Item {
    __type: 'layout_wrapper';
    layout: string;
    objet: Objet;
    options?: Option[];
}

export interface Objet {
    __type: 'live_comment';
    date?: string;
    id?: string;
    index?: number;
    libelle_info?: string;
    temps_fort?: boolean;
    texte?: string;
    titre?: string;
    type?: string;
    attachment?: Attachment;
    attachment_media?: AttachmentMedia;
    pictogram?: Pictogram;
    ad_unit_id_android?: string;
    ad_unit_id_desktop?: string;
    ad_unit_id_ios?: string;
    ad_unit_id_pwa?: string;
    keywords?: string[];
    parameters?: Parameter[];
    position?: string;
}

export interface Attachment {
    __type: 'attachment_article';
    tweet_id?: string;
    article?: Article;
    lien_web?: string;
}

export interface Article {
    __type: 'article';
    id: string;
    image: Image;
    premium: boolean;
    surtitre: Surtitre;
    texte: string;
    titre: string;
}

export interface Image {
    __type: 'image';
    ratio: number;
    url: string;
}

export interface Surtitre {
    __type: 'surtitre';
    elements: Element[];
}

export interface Element {
    __type: 'surtitre_item';
    libelle: string;
}

export interface AttachmentMedia {
    __type: 'image';
    id: string;
    copyright: string;
    legende: string;
    ratio: number;
    titre: string;
    url: string;
}

export interface Pictogram {
    __type: 'pictogram';
    link: Link;
}

export interface Link {
    __type: 'urls';
    web: string;
}

export interface Parameter {
    __type: 'pub_parameter';
    key: string;
    value: string;
}

export interface Option {
    __type: 'layout_option';
    objet: Objet2;
    type: string;
}

export interface Objet2 {
    __type: 'couleur';
    couleur: string;
}
