import { ItemLiveSportEvent, Sport } from "../types/api";
import { FeedAlloDisplay } from "../allo/FeedAlloDisplay";
import { FeedCourseDisplay } from "../course/FeedCourseDisplay";
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
    } else if (item.__type === "course") {
        return <FeedCourseDisplay courseItem={item} />
    } else if (item.__type === "allo") {
        return <FeedAlloDisplay alloItem={item} />
    }
    return <div>Unknown Live Item</div>
}

export { FeedSportEventDisplay };
