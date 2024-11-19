interface Props {
    alloItem: ItemLiveAllo;
}
function FeedAlloDisplay({ alloItem }: Props) {
    const { titre } = alloItem;

    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-center w-[98%] border-b-2">
                <div className="flex p-2 pr-0 w-[98%]">
                    <span>{titre}</span>
                </div>
            </div>
        </div>
    );
}

export { FeedAlloDisplay };
