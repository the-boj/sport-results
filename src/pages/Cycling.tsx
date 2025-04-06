import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CyclingLiveEvents } from '../types/cycling/live';
import { requestCyclingLive } from '../utils/api';

function Cycling() {
    const [liveEvents, setLiveEvents] = useState<CyclingLiveEvents>();
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useState<string>();

    const navigate = useNavigate();
    const { raceId } = useParams();

    async function fetchData() {
        if (!loading && raceId) {
            setLoading(true);
            try {
                const eventsData = await requestCyclingLive(raceId);
                setLiveEvents(eventsData);
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
    if (!liveEvents) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <div style={{ width: '100px' }} onClick={() => navigate(-1)}>
                <div className="text-md p-2">{'< Retour'}</div>
            </div>
            <div className="flex flex-col w-full overflow-scroll p-1">
                {liveEvents.items
                    .filter((item) => item.objet.texte)
                    .map((item, i) => (
                        <div key={`FLUX-${item.objet.type}-${i}`} className="flex border-b-2 p-2">
                            {item.objet.texte}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export { Cycling };
