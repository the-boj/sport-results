import { Link } from 'react-router-dom';
import { ItemLivePhase, Sport } from '../types/api';
import { FeedSportEventDisplay } from './FeedSportEventDisplay';

interface LinkToRankingsProps {
    sport: Sport;
}
function LinkToRankings({ sport }: LinkToRankingsProps) {
    if (sport !== 'Basket') {
        return null;
    }
    return <Link className="text-sm text-blue-600" to={`/Basket/rankings`}>Rankings</Link>
}

interface Props {
    sport: Sport;
    phaseItem: ItemLivePhase;
}
function FeedPhaseDisplay({ phaseItem, sport }: Props) {
    const { call_to_action } = phaseItem;

    return (
        <div className="flex flex-col mb-2">
            {phaseItem.title?.text && (
                <div className="flex justify-between p-3 pr-[2%] pb-2 pl-7">
                    <span className="text-md font-semibold">{phaseItem.title.text}</span>
                    {call_to_action && <LinkToRankings sport={sport} />}
                </div>
            )}
            {phaseItem.items
                ?.filter((item) => item.__type === 'sport_event_widget')
                .map((item, i) => (
                    <FeedSportEventDisplay key={`FPD-${i}`} sport={sport} sportItem={item} />
                ))}
        </div>
    );
}

export { FeedPhaseDisplay };
