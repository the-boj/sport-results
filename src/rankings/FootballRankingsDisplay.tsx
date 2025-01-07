import { useEffect } from "react";
import { useState } from "react";
import { ChampionshipNames, FootballRankings} from "../types/football/rankings";
import { requestFootballLeaderboard } from "../utils/football";

interface FootballRankingsProps {
    championship: ChampionshipNames;
}
function FootballRankingsDisplay({ championship }: FootballRankingsProps) {    
    const [rankings, setRankings] = useState<FootballRankings | null>(null);
    const [loading, setLoading] = useState(false);
    const [_error, setError] = useState<string | null>(null);

    async function fetchData() {
        if (!loading) {
            setLoading(true);
            try {
                const data = await requestFootballLeaderboard(championship);
                setRankings(data);
            } catch (error) {
                setError("Couldn't fetch the data from the server");
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [championship]);

    return (
        <div className="flex flex-col h-[100vh] max-w-[100wh] p-3">
            {rankings && <span>{rankings.H1}</span>}
        </div>
    );
}

export { FootballRankingsDisplay };
