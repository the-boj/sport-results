interface DateSelectorProps {
    selectedDate: Date;
    handleDateClick: (date: Date) => void;
}

function DateSelector({ selectedDate, handleDateClick }: DateSelectorProps) {
    const today = new Date();
    const days: Date[] = [];

    for (let i = -2; i <= 2; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }

    return (
        <div className="flex w-full items-center overflow-x-auto p-2">
            {days.map((date, i) => {
                const isSelected = selectedDate.toDateString() === date.toDateString();
                return (
                    <div
                        key={date.toISOString()}
                        onClick={() => handleDateClick(date)}
                        className={`flex flex-col justify-center w-[18%] h-[50px] mx-2 rounded text-center 
                            ${isSelected ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {i === 2 ? (
                            <span>Today</span>
                        ) : (
                            <>
                                <span className="w-full">{date.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                                <span>{date.toLocaleDateString('en-GB', { day: 'numeric' })}</span>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export { DateSelector };