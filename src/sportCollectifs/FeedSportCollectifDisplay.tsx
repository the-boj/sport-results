import { OneSquareScore } from './OneSquareScore';
import { FeedSportIncomingDisplay } from '../listing/FeedSportIncomingDisplay';
import { Sport, ItemLiveSportCollectif } from '../types/api';
import { Link } from 'react-router-dom';

interface Props {
    sport: Sport;
    sportCollectifItem: ItemLiveSportCollectif;
}
function FeedSportCollectifDisplay({ sportCollectifItem, sport }: Props) {
    const { statut } = sportCollectifItem;
    const { domicile, exterieur } = sportCollectifItem.specifics;

    if (sportCollectifItem.statut.type === 'avenir') {
        return (
            <FeedSportIncomingDisplay
                domicileValue={domicile.equipe.nom}
                domicileImage={domicile.equipe.url_image}
                exterieurValue={exterieur.equipe.nom}
                exterieurImage={exterieur.equipe.url_image}
                text={statut.libelle}
            />
        );
    }
    if (sport === 'Football') {
        return (
            <Link to={`/football/${sportCollectifItem.id}`}>
                <OneSquareScore sportCollectifItem={sportCollectifItem} />
            </Link>
        );
    }
    if (['Rugby', 'Basket'].includes(sport)) {
        return <OneSquareScore sportCollectifItem={sportCollectifItem} />;
    }
    return <div>Unknown sport {sport}</div>;
}

export { FeedSportCollectifDisplay };
