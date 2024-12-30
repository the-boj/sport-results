import { Equipe, Sportif, Instant } from '../api';

export interface FootballFlux {
    __type: 'flux';
    items: Item[];
}

export interface Item {
    __type: 'layout_wrapper';
    layout: 'live_comment_left' | 'live_comment_right';
    objet: Objet;
}

export interface Objet {
    __type: 'live_comment';
    attachment?: Attachment;
    libelle_info?: string;
    picto?: string;
    picto_web?: string;
    texte?: string;
    type: 'but' | 'carton' | 'texte';
}

export interface Attachment {
    __type: 'attachment_assoc_sportif_equipe';
    equipe: Equipe;
    sportif?: Sportif;
    remplacement?: Remplacement;
}

export interface Remplacement {
    __type: string;
    instant: Instant;
    entrant: Sportif;
    sortant: Sportif;
}
