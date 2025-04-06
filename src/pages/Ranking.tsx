import { useParams } from 'react-router-dom';
import { BasketballRankingsDisplay } from '../rankings/BasketballRankingsDisplay';
import { FootballRankingsDisplay } from '../rankings/FootballRankingsDisplay';
import { Championship, ChampionshipNames } from '../types/slugs';

function Ranking() {
    const { sport, competition } = useParams();

    if (sport === 'Basket' && competition) {
        return <BasketballRankingsDisplay competition={competition} />;
    }
    if (sport === 'Football' && competition && Championship.includes(competition as ChampionshipNames)) {
        return <FootballRankingsDisplay championship={competition as ChampionshipNames} />;
    }
    return <div>Rankings not supported for this sport</div>;
}

export { Ranking };
