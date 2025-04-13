import { NBARankingDisplay } from './NBARankingDisplay';
import { BetclicEliteRankingDisplay } from './BetclicEliteRankingDisplay';

interface Props {
    competition: string;
}

function BasketballRankingsDisplay({ competition }: Props) {
    if (competition === 'nba') {
        return <NBARankingDisplay />;
    }
    return <BetclicEliteRankingDisplay />;
}

export { BasketballRankingsDisplay };
