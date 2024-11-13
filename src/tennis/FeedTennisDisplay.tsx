import { Thumb } from '../utils/thumb';
import { FeedSportIncomingDisplay } from '../listing/FeedSportIncomingDisplay';

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
    set: TennisSet;
}
function ScoreColumDisplay({ set }: ScoreRowProps) {
    const domicileWinner = !set.en_cours && Number(set.score_jeux.domicile) > Number(set.score_jeux.exterieur);
    const exterieurWinner = !set.en_cours && Number(set.score_jeux.domicile) < Number(set.score_jeux.exterieur);

    return (
        <div className="flex flex-col">
            <span
                style={{
                    fontWeight: domicileWinner ? 'bold' : 'normal',
                    backgroundColor: domicileWinner ? 'black' : 'grey',
                }}
                className="text-center text-white w-[30px] p-1 mr-[2px] mb-[1px]"
            >
                {set.score_jeux.domicile}
            </span>
            <span
                style={{
                    fontWeight: exterieurWinner ? 'bold' : 'normal',
                    backgroundColor: exterieurWinner ? 'black' : 'grey',
                }}
                className="text-center text-white w-[30px] p-1 mr-[2px]"
            >
                {set.score_jeux.exterieur}
            </span>
        </div>
    );
}

interface Props {
    tennisItem: ItemLiveTennis;
}
function FeedTennisDisplay({ tennisItem }: Props) {
    const { statut } = tennisItem;
    const { domicile, exterieur, sets, vainqueur } = tennisItem.specifics;

    if (tennisItem.statut.type === 'avenir') {
        return (
            <FeedSportIncomingDisplay
                domicileValue={domicile.sportifs[0].nom}
                domicileImage={domicile.sportifs[0].pays.url_drapeau}
                exterieurValue={exterieur.sportifs[0].nom}
                exterieurImage={exterieur.sportifs[0].pays.url_drapeau}
                text={statut.libelle}
            />
        );
    }
    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-center w-[98%] border-b-2">
                <div className="flex justify-between p-2 pr-0 w-[98%]">
                    <TitleColumDisplay
                        key={'SCERD-1'}
                        domicileValue={domicile.sportifs[0].nom}
                        domicileImage={domicile.sportifs[0].pays.url_drapeau}
                        exterieurValue={exterieur.sportifs[0].nom}
                        exterieurImage={exterieur.sportifs[0].pays.url_drapeau}
                        winner={vainqueur}
                    />
                    <div className="flex items-center">
                        {sets?.map((set, i) => (
                            <ScoreColumDisplay key={`FTDS-${i}`} set={set} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { FeedTennisDisplay };
