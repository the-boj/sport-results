import { Link } from 'react-router-dom';
import { Sport } from '../types/api';
import { COMPETITION_TO_SLUG } from '../types/football/rankings';

interface FeedCallToActionProps {
    sport: Sport;
    competitionTitle: string;
}
function FeedCallToAction({ competitionTitle, sport }: FeedCallToActionProps) {
    const competition = COMPETITION_TO_SLUG[competitionTitle as keyof typeof COMPETITION_TO_SLUG];
    if (competition) {
        return (
            <Link className="text-sm text-blue-600" to={`/rankings/${sport}/${competition}`}>
                Rankings
            </Link>
        );
    }
    return null;
}

export { FeedCallToAction };
