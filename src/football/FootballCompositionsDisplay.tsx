import { DomicileExterieur } from '../types/football/recap';

interface Props {
    domicile: DomicileExterieur;
    exterieur: DomicileExterieur;
}
function FootballCompositionsDisplay({ domicile, exterieur }: Props) {
    return (
        <div className="flex flex-col w-full overflow-scroll p-2">
            <div className="flex flex-col"> 
                <div className="text-2xl font-bold mb-2">{domicile.equipe.nom}</div>
                {domicile.composition.map((player) => (
                    <div key={player.joueur.nom_complet}>{player.joueur.nom_complet}</div>
                ))}
            </div>
            <div className="flex flex-col mt-3">
                <div className="text-2xl font-bold mb-2">{exterieur.equipe.nom}</div>
                {exterieur.composition.map((player) => (
                    <div key={player.joueur.nom_complet}>{player.joueur.nom_complet}</div>
                ))}
            </div>
        </div>
    );
}

export { FootballCompositionsDisplay };
