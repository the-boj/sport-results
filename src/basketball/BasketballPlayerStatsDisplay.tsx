import { BasketballPlayerStats } from '../types/basketball/playerStats';

interface Props {
    playersStats: BasketballPlayerStats;
}
function BasketballPlayerStatsDisplay({ playersStats }: Props) {
    return (
        <div className="flex flex-col p-[20px] pt-[10px] overflow-scroll">
            {playersStats.items?.[0]?.items?.[0] && (
                <div className="flex w-[1700px]">
                    <div className="w-[180px] text-lg font-bold">Joueur</div>
                    {playersStats.items[0].items[0].items.map((stat) => {
                        if (stat.label === 'tit.') {
                            return <div key={`LABEL-TIT`} />;
                        }
                        return (
                            <div key={`LABEL-${stat.label}`} className="w-[100px] text-center text-lg font-bold">
                                {stat.label === "balles perdues" ? "pb" : stat.label}
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="flex flex-col">
                {playersStats.items.map((item) => (
                    <div key={`TEAM-${item.items[0].team.nom}`} className="mb-3 gap-1">
                        {item.items.length ? (
                            <div className="text-xl font-bold">{item.items[0].team.nom}</div>
                        ) : (
                            <div />
                        )}
                        {item.items.map((player, i) => (
                            <div key={`PLAYER-${player.player.nom_abrege}`} className="flex w-[1700px] border-b-2 border-gray-300">
                                <div className="w-[180px]">{player.player.nom_abrege}</div>
                                {player.items.map((stat) => {
                                    if (stat.label === 'tit.') {
                                        return <div key={`LABEL-PLAYER-TIT`} />;
                                    }
                                    return (
                                        <div key={`VALUE-${stat.label}`} className="w-[100px] text-center">
                                            {stat.value}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { BasketballPlayerStatsDisplay };
