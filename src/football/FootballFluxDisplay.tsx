import { FootballFlux } from '../types/football/flux';

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
                        className="flex"
                        style={{
                            background: backgroundColor(item.objet.type),
                            color: textColor(item.objet.type),
                        }}
                    >
                        <div className="flex w-[15%] items-center justify-center">{item.objet.libelle_info}</div>
                        <div className="w-[85%] border-b-2 p-2">{item.objet.texte}</div>
                    </div>
                ))}
        </div>
    );
}

export { FootballFluxDisplay };
