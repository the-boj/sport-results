import { Link } from "react-router-dom";
import { Sport } from "../types/api";

function getCompetition(competitionTitle: string) {
    if (competitionTitle === 'Ligue 1') {
        return 'ligue-1';
    }
    if (competitionTitle === "Championnat d'Angleterre") {
        return 'championnat-d-angleterre';
    }
    if (competitionTitle === "Championnat d'Italie") {
        return 'championnat-d-italie';
    }
    if (competitionTitle === "Championnat d'Espagne") {
        return 'championnat-d-espagne';
    }
    if (competitionTitle === "Championnat d'Allemagne") {
        return 'championnat-d-allemagne';
    }
    if (competitionTitle === 'Championnat du Portugal') {
        return 'championnat-du-portugal';
    }
    if (competitionTitle === 'Championnat d\'Écosse') {
        return 'championnat-d-ecosse';
    }
    if (competitionTitle === 'Championnat de Turquie') {
        return 'championnat-de-turquie';
    }
    if (competitionTitle === 'NBA') {
        return 'nba';
    }
    if (competitionTitle === 'Top 14') {
        return 'top-14';
    }
    return undefined;
}

interface FeedCallToActionProps {
    sport: Sport;
    competitionTitle: string;
}
function FeedCallToAction({ competitionTitle, sport }: FeedCallToActionProps) {
    const competition = getCompetition(competitionTitle);
    if (competition) {
        return <Link className="text-sm text-blue-600" to={`/rankings/${sport}/${competition}`}>
            Rankings
        </Link>;
    }
    return null;
}

export { FeedCallToAction };
