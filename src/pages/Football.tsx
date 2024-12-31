import { useEffect, useState } from 'react';
import { requestFootballFlux, requestFootballRecap } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import { FootballRecap } from '../types/football/recap';
import { FootballFlux } from '../types/football/flux';
import { FootballRecapDisplay } from '../football/FootballRecapDisplay';
import { FootballFluxDisplay } from '../football/FootballFluxDisplay';

function Football() {
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useState<string>();
    const [recapData, setRecapData] = useState<FootballRecap>();
    const [fluxData, setFluxData] = useState<FootballFlux>();
    const { matchId } = useParams();

    async function fetchData() {
        if (!loading && matchId) {
            setLoading(true);
            try {
                const [recapData, fluxData] = await Promise.all([
                    requestFootballRecap(matchId),
                    requestFootballFlux(matchId),
                ]);
                setRecapData(recapData);
                setFluxData(fluxData);
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

    if (!loading && !recapData && !fluxData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <div className="text-md p-2 w-[100px]">{'< Retour'}</div>
                </Link>
                <div className="text-xl font-bold">
                    {recapData?.statut.type === 'termine' ? 'Terminé' : recapData?.statut.libelle}
                </div>
                <div className="w-[100px]" />
            </div>
            {recapData && <FootballRecapDisplay recapData={recapData} />}
            {fluxData && <FootballFluxDisplay fluxData={fluxData} />}
        </div>
    );
}

export { Football };
