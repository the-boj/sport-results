import { FeedSportCollectifDisplay } from "../sportCollectifs/FeedSportCollectifDisplay";
import { FeedTennisDisplay } from "../tennis/FeedTennisDisplay";

interface Props {
    sport: Sport;
    sportItem: ItemLiveSportEvent;
}

function FeedSportEventDisplay({ sportItem, sport }: Props) {
    const item = sportItem.event

    if (item.__type === "rencontre_sport_collectif") {
        return <FeedSportCollectifDisplay sport={sport} sportCollectifItem={item} />
    } else if (item.__type === "match_tennis") {
        return <FeedTennisDisplay tennisItem={item} />;
    }
    return <div>Unknown Live Item</div>
}

export { FeedSportEventDisplay };
