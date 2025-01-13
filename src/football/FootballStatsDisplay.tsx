import { useEffect, useState } from 'react';
import { requestFootballStats } from '../utils/api';

interface Props {
    matchId: string;
}
function FootballStatsDisplay({ matchId }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useState<string>();
    const [statsData, setStatsData] = useState<{}>();

    async function fetchData() {
        if (!loading && matchId) {
            setLoading(true);
            try {
                const statsData = await requestFootballStats(matchId);
                setStatsData(statsData);
            } catch (error) {
                setError("Couldn't fetch the data from the server");
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading</div>;
    }
    if (!statsData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col w-full overflow-scroll p-1">
            STATS
        </div>
    );
}

export { FootballStatsDisplay };
