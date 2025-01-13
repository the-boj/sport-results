import { useParams } from 'react-router-dom';
import { BasketballRankingsDisplay } from '../rankings/BasketballRankingsDisplay';
import { FootballRankingsDisplay } from '../rankings/FootballRankingsDisplay';
import { Championship, ChampionshipNames, COMPETITION_TO_SLUG } from '../types/football/rankings';

function Rankings() {
    const { sport, competition } = useParams();

    if (sport === 'Basket' && competition === COMPETITION_TO_SLUG['NBA']) {
        return <BasketballRankingsDisplay />;
    }
    if (sport === 'Football' && competition && Championship.includes(competition as ChampionshipNames)) {
        return <FootballRankingsDisplay championship={competition as ChampionshipNames} />;
    }
    return <div>Rankings not supported for this sport</div>;
}

export { Rankings };
