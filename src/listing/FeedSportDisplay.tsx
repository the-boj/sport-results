import { getScrollToId } from '../utils/ids';
import { ItemLiveSport, Sport } from '../types/api';
import { FeedCompetitionDisplay } from './FeedCompetitionDisplay';

interface Props {
    feedItem: ItemLiveSport;
}

function FeedSportDisplay({ feedItem }: Props) {
    const title = feedItem.title?.text;
    if (!title) {
        return <div />;
    }
    return (
        <div className="flex flex-col">
            <span className="text-3xl font-bold pl-3 pt-5" id={getScrollToId(title)}>
                {title}
            </span>
            {feedItem.items
                .filter((item) => item.__type === 'live_listing_widget')
                .map((item, i) => (
                    <FeedCompetitionDisplay key={`FID-${i}`} sport={title as Sport} competitionItem={item} />
                ))}
        </div>
    );
}

export { FeedSportDisplay };
