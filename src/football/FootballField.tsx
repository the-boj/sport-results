import { Composition } from '../types/football/recap';

interface Props {
    composition: Composition[];
}
function FootballField({ composition }: Props) {
    return (
        <div
            className="football-field"
            style={{
                position: 'relative',
                width: '95%',
                height: '400px',
                backgroundColor: 'green',
            }}
        >
            {composition.map((playerPos) => {
                let { x, y, joueur } = playerPos;
                y = y + 5;

                return (
                    <div
                        className='flex flex-col items-center w-[35%]'
                        key={joueur.id}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: (y > 50 ? y - 50 : y) * 7,
                            transform: 'translate(-50%, 0%)',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                backgroundColor: 'white',
                                marginBottom: '4px',
                            }} />
                        <div className=''>
                            {joueur.nom_abrege}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export { FootballField };
