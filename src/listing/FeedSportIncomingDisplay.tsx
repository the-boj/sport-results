import { Thumb } from '../utils/thumb';

interface Props {
    domicileValue: string;
    domicileImage: string;
    exterieurValue: string;
    exterieurImage: string;
    text?: string;
}
function FeedSportIncomingDisplay({ domicileValue, domicileImage, exterieurValue, exterieurImage, text }: Props) {
    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-center w-[98%] border-b-2">
                <div className="flex justify-between w-[98%]">
                    <div className="flex flex-col p-2">
                        <div className="flex p-1">
                            <Thumb image={domicileImage}/>
                            <span>{domicileValue}</span>
                        </div>
                        <div className="flex p-1">
                            <Thumb image={exterieurImage}/>
                            <span>{exterieurValue}</span>
                        </div>
                    </div>
                    <span className="flex items-center">{text}</span>
                </div>
            </div>
        </div>
    );
}

export { FeedSportIncomingDisplay };
