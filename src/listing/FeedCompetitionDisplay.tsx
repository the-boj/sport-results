import { FeedPhaseDisplay } from './FeedPhaseDisplay';

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
        </div>
    );
}

export { FeedCompetitionDisplay };
