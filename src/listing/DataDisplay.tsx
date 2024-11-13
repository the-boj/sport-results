import { FeedSportDisplay } from './FeedSportDisplay';

interface Props {
    data: Data;
}

function DataDisplay({ data }: Props) {
    return (
        <div className="flex flex-col p-2">
            {data.content.feed.items
                .filter((item) => item.__type === 'live_listing_widget')
                .map((item, i) => (
                    <FeedSportDisplay key={`DD-${i}`} feedItem={item} />
                ))}
        </div>
    );
}

export { DataDisplay };
