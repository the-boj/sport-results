import { ItemLivePhase, Sport } from "../types/api";
import { FeedSportEventDisplay } from "./FeedSportEventDisplay";

interface Props {
    sport: Sport;
    phaseItem: ItemLivePhase;
}

function FeedPhaseDisplay({ phaseItem, sport }: Props) {
    return (
        <div className="flex flex-col mb-2">
            {phaseItem.title?.text && <span className="text-md font-semibold p-3 pb-2 pl-7">{phaseItem.title.text}</span>}
            {phaseItem.items?.filter(item => item.__type === "sport_event_widget").map((item, i) => (
                <FeedSportEventDisplay key={`FPD-${i}`} sport={sport} sportItem={item}/>
            ))}
        </div>
    );
}

export { FeedPhaseDisplay };
