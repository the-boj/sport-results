import { useState } from 'react';

interface Props {
    image: string;
}
function Thumb({ image }: Props) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <div
                style={{ display: isLoaded ? 'none' : 'block' }}
                className="w-[20px] h-[20px] mr-[4px] bg-gray-200 animate-pulse"
            ></div>
            <img
                style={{ display: isLoaded ? 'block' : 'none' }}
                alt="thumbnail"
                className="w-[20px] h-[20px] mr-[4px] object-contain"
                src={image}
                onLoad={() => setIsLoaded(true)}
            />
        </>
    );
}

export { Thumb };
