import { FeedCompetitionDisplay } from './FeedCompetitionDisplay';

interface Props {
    feedItem: ItemLiveSport;
}

function FeedSportDisplay({ feedItem }: Props) {
    return (
        <div className="flex flex-col">
            <span className="text-3xl font-bold pl-3 pt-5">{feedItem.title.text}</span>
            {feedItem.items
                .filter((item) => item.__type === 'live_listing_widget')
                .map((item, i) => (
                    <FeedCompetitionDisplay
                        key={`FID-${i}`}
                        sport={feedItem.title.text as Sport}
                        competitionItem={item}
                    />
                ))}
        </div>
    );
}

export { FeedSportDisplay };
