import { useEffect, useState } from 'react';
import { requestBasketballLeaderboard, requestBasketballPlayerStats } from '../utils/api';
import { Link, useLocation } from 'react-router-dom';
import { BasketballLeaderboard } from '../types/basketball/leaderboard';
import { BasketballLeaderboardDisplay } from '../basketball/BasketballLeaderboardDisplay';
import { BasketballPlayerStats } from '../types/basketball/playerStats';
import { BasketballPlayerStatsDisplay } from '../basketball/BasketballPlayerStatsDisplay';

function Basketball() {
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useState<string>();
    const [leaderboardData, setLeaderboardData] = useState<BasketballLeaderboard>();
    const [playerStatsData, setPlayerStatsData] = useState<BasketballPlayerStats>();
    const { path } = useLocation().state;

    async function fetchData() {
        if (!loading && path) {
            setLoading(true);
            try {
                const [leaderboardData, playerStatsData] = await Promise.all([
                    requestBasketballLeaderboard(path),
                    requestBasketballPlayerStats(path),
                ]);
                setLeaderboardData(leaderboardData);
                setPlayerStatsData(playerStatsData);
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

    if (!loading && !leaderboardData && !playerStatsData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col h-[100vh]">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <div className="text-md p-2 w-[100px]">{'< Retour'}</div>
                </Link>
                <div className="text-xl font-bold">
                    {leaderboardData?.leaderboard.status.type === 'termine'
                        ? 'Terminé'
                        : leaderboardData?.leaderboard?.status.libelle}
                </div>
                <div className="w-[100px]" />
            </div>
            {leaderboardData && <BasketballLeaderboardDisplay leaderboardData={leaderboardData} />}
            {playerStatsData && <BasketballPlayerStatsDisplay playersStats={playerStatsData} />}
        </div>
    );
}

export { Basketball };
