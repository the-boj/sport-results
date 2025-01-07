function FeedItemSkeleton({ width }: { width: string }) {
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="flex justify-center w-[98%] h-[90px] border-b-2">
                <div className="flex justify-between w-[98%]">
                    <div className={`flex flex-col w-[${width}] justify-center`}>
                        <div className="h-[25px] w-[90%] bg-gray-200" />
                        <div className="h-[25px] mt-1 bg-gray-200" />
                    </div>
                    <div className="flex flex-col w-[20%] justify-center">
                        <div className="h-[25px] bg-gray-200" />
                        <div className="h-[25px] mt-1 bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeedSportSkeleton({ items }: { items: string[] }) {
    return (
        <div className="flex flex-col w-full h-full pl-5 pt-7">
            <div className="h-[40px] w-[25%] bg-gray-300" />
            <div className="h-[30px] w-[40%] ml-2 mt-3 bg-gray-300" />
            <div className="h-[25px] w-[35%] ml-4 mt-3 bg-gray-300" />
            {items.map((width, i) => (
                <FeedItemSkeleton key={`${width}${i}`} width={width} />
            ))}
        </div>
    );
}

function DataDisplaySkeleton() {
    return (
        <div className="flex flex-col w-full h-full">
            <FeedSportSkeleton items={["40%", "25%", "35%"]} />
            <FeedSportSkeleton items={["20%", "40%", "25%"]} />
            <FeedSportSkeleton items={["35%", "25%", "40%"]} />
        </div>
    );
}

export { DataDisplaySkeleton };
