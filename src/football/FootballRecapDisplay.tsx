import { useMemo } from 'react';
import { But, Carton, FootballRecap } from '../types/football/recap';

type FootballEvent = (But & { team: string; group: 'but' }) | (Carton & { team: string; group: 'carton' });

function DomicileEvent({ event }: { event: FootballEvent }) {
    return (
        <div className="flex flex-row-reverse items-center pr-[52%]">
            {event.group === 'but' ? (
                <div className="w-[20px] h-[20px] rounded-[50%] bg-green-600" />
            ) : (
                <div className="w-[20px] h-[20px] bg-yellow-300" />
            )}
            <div className="ml-[5px] mr-[5px]">{event.instant.date}'</div>
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{event.joueur.nom_abrege}</div>
        </div>
    );
}

function ExterieurEvent({ event }: { event: FootballEvent }) {
    return (
        <div className="flex flex-row items-center pl-[52%]">
            {event.group === 'but' ? (
                <div className="w-[20px] h-[20px] rounded-[50%] bg-green-600" />
            ) : (
                <div className="w-[20px] h-[20px] bg-yellow-300" />
            )}
            <div className="ml-[5px] mr-[5px]">{event.instant.date}'</div>
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{event.joueur.nom_abrege}</div>
        </div>
    );
}

function TeamDisplay({ text, weight }: { text: string; weight: 'bold' | 'normal' }) {
    return (
        <div className={'text-xl text-center'} style={{ fontWeight: weight }}>
            {text}
        </div>
    );
}

function ScoreDisplay({ text, weight }: { text: string; weight: 'bold' | 'normal' }) {
    return (
        <div className={'text-2xl'} style={{ fontWeight: weight }}>
            {text}
        </div>
    );
}

interface Props {
    recapData: FootballRecap;
}
function FootballRecapDisplay({ recapData }: Props) {
    const events = useMemo(() => {
        // Buts
        const domicileButs = recapData.specifics.domicile.buts.map((but) => ({
            ...but,
            team: 'domicile',
            group: 'but',
        }));
        const exterieurButs = recapData.specifics.exterieur.buts.map((but) => ({
            ...but,
            team: 'exterieur',
            group: 'but',
        }));
        const buts = [...domicileButs, ...exterieurButs];

        // Cartons
        const domicileCartons = recapData.specifics.domicile.cartons.map((carton) => ({
            ...carton,
            team: 'domicile',
            group: 'carton',
        }));
        const exterieurCartons = recapData.specifics.exterieur.cartons.map((carton) => ({
            ...carton,
            team: 'exterieur',
            group: 'carton',
        }));
        const cartons = [...domicileCartons, ...exterieurCartons];

        // All events
        const allEvents = [...buts, ...cartons];
        return allEvents.sort((a, b) => Number(a.instant.date) - Number(b.instant.date)) as FootballEvent[];
    }, [recapData]);

    const winner = useMemo(() => {
        if (recapData.statut.type === 'termine') {
            return recapData.specifics.score.domicile > recapData.specifics.score.exterieur ? 'domicile' : 'exterieur';
        }
        return undefined;
    }, [recapData]);

    return (
        <div className="flex flex-col items-center justify-center w-full p-[20px] pt-[10px]">
            <div className="flex border-2 border-black w-full">
                <div className="flex flex-col items-center w-full bg-gray-200 p-2">
                    <ScoreDisplay
                        text={recapData.specifics.score.domicile}
                        weight={winner === 'domicile' ? 'bold' : 'normal'}
                    />
                    <img
                        src={recapData.specifics.domicile.equipe.url_image}
                        alt="logo"
                        className="mt-1 w-[40px] h-[40px]"
                    />
                    <TeamDisplay
                        text={recapData.specifics.domicile.equipe.nom}
                        weight={winner === 'domicile' ? 'bold' : 'normal'}
                    />
                </div>
                <div className="flex flex-col items-center w-full bg-gray-300 p-2">
                    <ScoreDisplay
                        text={recapData.specifics.score.exterieur}
                        weight={winner === 'exterieur' ? 'bold' : 'normal'}
                    />
                    <img
                        src={recapData.specifics.exterieur.equipe.url_image}
                        alt="logo"
                        className="mt-1 w-[40px] h-[40px]"
                    />
                    <TeamDisplay
                        text={recapData.specifics.exterieur.equipe.nom}
                        weight={winner === 'exterieur' ? 'bold' : 'normal'}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center w-full mt-2">
                {events.map((event) => (
                    <div className="w-full">
                        {event.team === 'domicile' ? <DomicileEvent event={event} /> : <ExterieurEvent event={event} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { FootballRecapDisplay };
