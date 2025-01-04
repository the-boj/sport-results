import { ItemLiveSportCollectif } from '../types/api';
import { Thumb } from '../utils/thumb';

interface RowProps {
    domicileValue: string;
    domicileImage: string;
    exterieurValue: string;
    exterieurImage: string;
    winner?: 'domicile' | 'exterieur';
}
function TitleColumDisplay({ domicileValue, domicileImage, exterieurValue, exterieurImage, winner }: RowProps) {
    return (
        <div className="flex flex-col justify-between w-full">
            <div className="flex h-[50%] items-center">
                <Thumb image={domicileImage}/>
                <span style={{ fontWeight: winner === 'domicile' ? 'bold' : 'normal' }}>{domicileValue}</span>
            </div>
            <div className="flex h-[50%] items-center">
                <Thumb image={exterieurImage}/>
                <span style={{ fontWeight: winner === 'exterieur' ? 'bold' : 'normal' }}>{exterieurValue}</span>
            </div>
        </div>
    );
}

interface ScoreRowProps {
    domicileValue?: string;
    exterieurValue?: string;
    winner?: 'domicile' | 'exterieur';
}
function ScoreColumDisplay({ domicileValue, exterieurValue, winner }: ScoreRowProps) {
    return (
        <div className="flex flex-col justify-between items-center ml-2">
            <span
                style={{
                    fontWeight: winner === 'domicile' ? 'bold' : 'normal',
                    backgroundColor: winner === 'domicile' ? 'black' : 'grey',
                }}
                className="text-center text-white w-[45px] p-1 m-[1px]"
            >
                {domicileValue}
            </span>
            <span
                style={{
                    fontWeight: winner === 'exterieur' ? 'bold' : 'normal',
                    backgroundColor: winner === 'exterieur' ? 'black' : 'grey',
                }}
                className="text-center text-white w-[45px] p-1"
            >
                {exterieurValue}
            </span>
        </div>
    );
}

interface Props {
    sportCollectifItem: ItemLiveSportCollectif;
}
function OneSquareScore({ sportCollectifItem }: Props) {
    const { statut } = sportCollectifItem;
    const { domicile, exterieur, score, vainqueur } = sportCollectifItem.specifics;

    const winner = statut.type === 'encours' ? undefined : vainqueur;

    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-center w-[98%] border-b-2">
                <div className="flex justify-between p-2 pr-0 w-[98%]">
                    <TitleColumDisplay
                        key={'SCERD-1'}
                        domicileValue={domicile.equipe.nom}
                        domicileImage={domicile.equipe.url_image}
                        exterieurValue={exterieur.equipe.nom}
                        exterieurImage={exterieur.equipe.url_image}
                        winner={winner}
                    />
                    <div className="flex items-center">
                        {statut.type === 'encours' && <span className="font-semibold text-red-600">{statut.libelle}</span>}
                        {statut.type === 'termine' && <span className="font-semibold">{statut.libelle}</span>}
                        <ScoreColumDisplay
                            key={'SCERD-2'}
                            domicileValue={score?.domicile}
                            exterieurValue={score?.exterieur}
                            winner={winner}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { OneSquareScore };
