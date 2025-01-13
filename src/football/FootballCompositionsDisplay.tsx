import { DomicileExterieur } from '../types/football/recap';
import { FootballField } from './FootballField';

interface Props {
    domicile: DomicileExterieur;
    exterieur: DomicileExterieur;
}
function FootballCompositionsDisplay({ domicile, exterieur }: Props) {
    return (
        <div className="flex flex-col w-full overflow-scroll p-2">
            <div className="flex flex-col items-center"> 
                <div className="text-2xl font-bold mb-2">{domicile.equipe.nom}</div>
                <FootballField composition={domicile.composition} />
            </div>
            <div className="flex flex-col mt-3">
                <div className="text-2xl font-bold mb-2">{exterieur.equipe.nom}</div>
                <FootballField composition={exterieur.composition} />
                </div>
        </div>
    );
}

export { FootballCompositionsDisplay };
