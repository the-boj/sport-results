import { useEffect, useState } from 'react';
import { requestFootballFlux, requestFootballRecap } from '../utils/api';
import { useParams } from 'react-router-dom';
import { FootballRecap } from '../types/football/recap';
import { FootballFlux } from 'src/types/football/flux';

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

    if (!loading && !recapData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col">
            {recapData?.date}
            {fluxData?.items.map((item, i) => (
                <div key={`FLUX-${i}`}>{item.objet.texte}</div>
            ))}
        </div>
    );
}

export { Football };
