import { useEffect, useState } from 'react';
import { PlayersStats, PlayerStat } from '../types/football/player';
import { requestFootballPlayersV3 } from '../utils/api';

interface TeamStats {
    [key: string]: PlayerStat[];
}
function generateTeams(playersData: PlayersStats) {
    const teams: TeamStats = {};
    playersData.items.forEach((playerStatData) => {
        playerStatData.items.forEach((playerStats) => {
            if (!teams[playerStats.team.nom]) {
                teams[playerStats.team.nom] = [];
            }
            teams[playerStats.team.nom].push(playerStats);
        });
    });
    return teams;
}

interface Props {
    url: string;
}
function FootballPlayersDisplay({ url }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useState<string>();
    const [playersData, setPlayersData] = useState<TeamStats>();

    async function fetchData() {
        if (!loading) {
            setLoading(true);
            try {
                const playersData = await requestFootballPlayersV3(url);
                const teams = generateTeams(playersData);
                setPlayersData(teams);
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
    if (!playersData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col w-full overflow-scroll p-2">
            {Object.keys(playersData).map((team) => (
                <div>
                    <div className="text-2xl font-bold mb-2">{team}</div>
                    {playersData[team].map((player, i) => (
                        <div key={player.player.nom} className="flex items-center p-[2px]">
                            <div className="w-[20px]">{player.player.numero}</div>
                            <div className="w-[90px] ml-2">{player.player.poste}</div>
                            <div className="w-[200px] ml-2" style={{ fontWeight: i < 11 ? 'bold' : 'normal' }}>
                                {player.player.nom_complet}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export { FootballPlayersDisplay };
