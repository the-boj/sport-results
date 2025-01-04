import { FootballFlux, Item } from '../types/football/flux';

function backgroundColor(type: string) {
    if (type === 'but') {
        return 'green';
    }
    if (type === 'carton') {
        return '#FFF176';
    }
    return '';
}

function textColor(type: string) {
    if (type === 'but') {
        return 'white';
    }
    return 'black';
}

function Remplacement({ item }: { item: Item }) {
    if (item.objet.texte === 'remplace') {
        return (
            <div className='flex w-[85%] p-2'>
                <div>{item.objet.attachment?.remplacement?.entrant.nom_abrege}</div>
                <div className='ml-[5px] mr-[5px]'>{"->"}</div>
                <div>{item.objet.attachment?.remplacement?.sortant.nom_abrege}</div>
            </div>
        );
    }
    return <div />;
}

interface Props {
    fluxData: FootballFlux;
}
function FootballFluxDisplay({ fluxData }: Props) {
    return (
        <div className="flex flex-col w-full overflow-scroll border-t-2 border-gray-300 pt-2">
            <div className="w-full text-center text-2xl font-bold">Flux</div>
            {fluxData.items
                .filter((item) => item.objet.texte)
                .map((item) => (
                    <div
                        className="flex border-b-2"
                        style={{
                            background: backgroundColor(item.objet.type),
                            color: textColor(item.objet.type),
                        }}
                    >
                        <div className="flex w-[15%] items-center justify-center">{item.objet.libelle_info}</div>
                        {item.objet.texte === 'remplace' ? (
                            <Remplacement item={item} />
                        ) : (
                            <div className="w-[85%] p-2">{item.objet.texte}</div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export { FootballFluxDisplay };
