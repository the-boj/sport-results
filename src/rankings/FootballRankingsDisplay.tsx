import { useEffect } from 'react';
import { useState } from 'react';
import { ChampionshipNames, FootballRankings } from '../types/football/rankings';
import { requestFootballLeaderboard } from '../utils/api';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col h-[100vh] max-w-[100wh] p-2">
            <Link style={{ width: '100px' }} to="/">
                <div className="text-md p-2">{'< Retour'}</div>
            </Link>

            {rankings &&
                rankings.items.map((item, i) => {
                    if (item.layout === 'base_header') {
                        return (
                            <div key={`TITLE-${i}`} className="w-full text-center text-xl font-bold mb-3">
                                {item.objet.title}
                            </div>
                        );
                    }
                    if (item.layout === 'ranking_list') {
                        return item.objet.items?.map((team, i) => (
                            <div key={`TEAM-${i}`} className="flex w-full mb-[3px]">
                                <div className="flex w-[7%] items-center justify-center">{team.rang}</div>
                                <div className="flex w-[45%] items-center font-bold">{team.equipe.nom}</div>
                                <div className="flex w-[9%] items-center font-bold">{team.nombre_points}</div>
                                <div className="flex w-[7%] items-center text-sm">{team.nombre_de_matchs}</div>
                                <div className="flex w-[7%] items-center text-sm">{team.nombre_de_victoires}</div>
                                <div className="flex w-[7%] items-center text-sm">{team.nombre_de_nuls}</div>
                                <div className="flex w-[7%] items-center text-sm">{team.nombre_de_defaites}</div>
                                <div className="flex w-[7%] items-center text-sm">{team.difference_de_buts_libelle}</div>
                            </div>
                        ));
                    }
                })}
        </div>
    );
}

export { FootballRankingsDisplay };
