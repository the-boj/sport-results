import { ItemLivePhase, Sport } from '../types/api';
import { FeedSportEventDisplay } from './FeedSportEventDisplay';
import { FeedCallToAction } from './FeedCallToAction';

interface Props {
    sport: Sport;
    phaseItem: ItemLivePhase;
    competitionTitle: string;
}
function FeedPhaseDisplay({ phaseItem, sport, competitionTitle }: Props) {
    return (
        <div className="flex flex-col mb-2">
            {phaseItem.title?.text && (
                <div className="flex justify-between p-3 pr-[2%] pb-2 pl-7">
                    <span className="text-md font-semibold">{phaseItem.title.text}</span>
                    <FeedCallToAction sport={sport} competitionTitle={competitionTitle} />
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
