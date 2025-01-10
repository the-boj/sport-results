import { useEffect, useState } from 'react';
import { requestFootballRecap } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import { FootballRecap } from '../types/football/recap';
import { FootballRecapDisplay } from '../football/FootballRecapDisplay';
import { FootballFluxDisplay } from '../football/FootballFluxDisplay';
import { DetailsDisplaySkeleton } from '../skeleton/DetailsDisplaySkeleton';
// import { FootballStatsDisplay } from '../football/FootballStatsDisplay';
import { FootballPlayersDisplay } from '../football/FootballPlayersDisplay';
import { FootballCompositionsDisplay } from '../football/FootballCompositionsDisplay';

function Football() {
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useState<string>();
    const [recapData, setRecapData] = useState<FootballRecap>();
    const [activeTab, setActiveTab] = useState<'Flux' | 'Stats' | 'Players' | 'Compositions'>('Flux');

    const { matchId } = useParams();

    async function fetchData() {
        if (!loading && matchId) {
            setLoading(true);
            try {
                const recapData = await requestFootballRecap(matchId);
                setRecapData(recapData);
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

    if (!matchId) {
        return <div>No matchId</div>;
    }
    if (loading) {
        return <DetailsDisplaySkeleton />;
    }
    if (!recapData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <div className="flex justify-between items-center">
                <Link style={{ width: '100px' }} to="/">
                    <div className="text-md p-2">{'< Retour'}</div>
                </Link>
                <div className="text-xl font-bold">
                    {recapData?.statut.type === 'termine' ? 'Terminé' : recapData?.statut.libelle}
                </div>
                <div className="w-[100px]" />
            </div>
            <FootballRecapDisplay recapData={recapData} />
            <div className="flex flex-col">
                <div className="flex w-full">
                    <button
                        onClick={() => setActiveTab('Flux')}
                        className={`w-[100%] px-4 py-2 font-medium focus:outline-none ${
                            activeTab === 'Flux'
                                ? 'border-b-2 border-blue-500 text-blue-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Flux
                    </button>
                    <button
                        onClick={() => setActiveTab('Compositions')}
                        className={`w-[100%] px-4 py-2 font-medium focus:outline-none ${
                            activeTab === 'Compositions'
                                ? 'border-b-2 border-blue-500 text-blue-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Compositions
                    </button>
                    {/* <button
                        onClick={() => setActiveTab('Stats')}
                        className={`w-[34%] px-4 py-2 font-medium focus:outline-none ${
                            activeTab === 'Stats'
                                ? 'border-b-2 border-blue-500 text-blue-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Stats
                    </button> */}
                    <button
                        onClick={() => setActiveTab('Players')}
                        className={`w-[100%] px-4 py-2 font-medium focus:outline-none ${
                            activeTab === 'Players'
                                ? 'border-b-2 border-blue-500 text-blue-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Joueurs
                    </button>
                </div>
                {activeTab === 'Flux' && <FootballFluxDisplay matchId={matchId} />}
                {activeTab === 'Compositions' && (
                    <FootballCompositionsDisplay
                        domicile={recapData.specifics.domicile}
                        exterieur={recapData.specifics.exterieur}
                    />
                )}
                {/* {activeTab === 'Stats' && <FootballStatsDisplay matchId={matchId} />} */}
                {recapData?.individual_statistics_feed_url && activeTab === 'Players' && (
                    <FootballPlayersDisplay url={recapData.individual_statistics_feed_url} />
                )}
            </div>
        </div>
    );
}

export { Football };
