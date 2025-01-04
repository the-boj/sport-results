import { Sport, ItemLiveCompetition} from '../types/api';
import { FeedPhaseDisplay } from './FeedPhaseDisplay';
import { FeedSportEventDisplay } from './FeedSportEventDisplay';

interface Props {
    sport: Sport;
    competitionItem: ItemLiveCompetition;
}

function FeedCompetitionDisplay({ competitionItem, sport }: Props) {
    return (
        <div className="flex flex-col">
            {competitionItem.title && <span className="text-xl font-bold pt-3 pl-5">{competitionItem.title.text}</span>}
            {competitionItem.items
                .filter((item) => item.__type === 'live_listing_widget')
                .map((item, i) => (
                    <FeedPhaseDisplay key={`FCD-${i}`} sport={sport} phaseItem={item} />
                ))}
            {competitionItem.items
                .filter((item) => item.__type === 'sport_event_widget')
                .map((item, i) => (
                    <FeedSportEventDisplay key={`FCD-${i}`} sport={sport} sportItem={item} />
                ))}
        </div>
    );
}

export { FeedCompetitionDisplay };
