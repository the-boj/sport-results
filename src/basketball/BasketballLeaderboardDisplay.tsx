import { useMemo } from 'react';
import { BasketballLeaderboard } from '../types/basketball/leaderboard';

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
    leaderboardData: BasketballLeaderboard;
}
function BasketballLeaderboardDisplay({ leaderboardData }: Props) {
    const { leaderboard } = leaderboardData;

    const winner = useMemo(() => {
        if (leaderboard.status.type === 'termine') {
            const { domicile, exterieur } = leaderboard.sport_event.specifics.score;
            return Number(domicile) > Number(exterieur) ? 'domicile' : 'exterieur';
        }
        return undefined;
    }, [leaderboardData]);

    return (
        <div className="flex flex-col items-center justify-center w-full p-[20px] pt-[10px]">
            <div className="flex border-2 border-black w-full">
                <div className="flex flex-col items-center w-full bg-gray-200 p-2">
                    <ScoreDisplay
                        text={leaderboard.sport_event.specifics.score.domicile}
                        weight={winner === 'domicile' ? 'bold' : 'normal'}
                    />
                    <img
                        src={leaderboard.sport_event.specifics.domicile.equipe.url_image}
                        alt="logo"
                        className="mt-1 w-[40px] h-[40px]"
                    />
                    <TeamDisplay
                        text={leaderboard.sport_event.specifics.domicile.equipe.nom}
                        weight={winner === 'domicile' ? 'bold' : 'normal'}
                    />
                </div>
                <div className="flex flex-col items-center w-full bg-gray-300 p-2">
                    <ScoreDisplay
                        text={leaderboard.sport_event.specifics.score.exterieur}
                        weight={winner === 'exterieur' ? 'bold' : 'normal'}
                    />
                    <img
                        src={leaderboard.sport_event.specifics.exterieur.equipe.url_image}
                        alt="logo"
                        className="mt-1 w-[40px] h-[40px]"
                    />
                    <TeamDisplay
                        text={leaderboard.sport_event.specifics.exterieur.equipe.nom}
                        weight={winner === 'exterieur' ? 'bold' : 'normal'}
                    />
                </div>
            </div>
            <div className="flex flex-col w-[50%] mt-2">
                {leaderboard.sport_event.specifics.details_score.map((qt, i) => (
                    <div
                        key={`QT-${i}`}
                        className="flex items-center justify-between w-full border-b-2 border-black pl-2 pr-2"
                    >
                        <div
                            className="w-[30px] text-xl"
                            style={{ fontWeight: qt.domicile > qt.exterieur ? 'bold' : '' }}
                        >
                            {qt.domicile}
                        </div>
                        <div className="w-[30px] text-lg text-gray-500">{i > 3 ? `OT${i - 3}` : `Q${i + 1}`}</div>
                        <div
                            className="w-[30px] text-xl"
                            style={{ fontWeight: qt.exterieur > qt.domicile ? 'bold' : '' }}
                        >
                            {qt.exterieur}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { BasketballLeaderboardDisplay };
