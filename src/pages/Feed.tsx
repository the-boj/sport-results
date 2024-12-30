import { useEffect, useState } from 'react';
import { requestApi } from '../utils/api';
import { DataDisplay } from '../listing/DataDisplay';
import { DataDisplaySkeleton } from '../skeleton/DataDisplaySkeleton';
import { ApiResponse } from '../types/api';

interface DateSelectorProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

function DateSelector({ selectedDate, setSelectedDate }: DateSelectorProps) {
    const today = new Date();
    const days: Date[] = [];

    for (let i = -2; i <= 2; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

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

function Feed() {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [_error, setError] = useState<string>();
    const [apiData, setApiData] = useState<ApiResponse>();

    async function fetchData() {
        if (!loading) {
            setLoading(true);
            try {
                const data = await requestApi(selectedDate);
                setApiData(data);
            } catch (error) {
                setError("Couldn't fetch the data from the server");
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    if (!loading && !apiData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col">
            <div className="h-[55px] mb-[10px]">
                <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div style={{ height: 'calc(100vh - 65px)' }} className="overflow-scroll scrollable">
                {loading ? (
                    <DataDisplaySkeleton />
                ) : (
                    apiData?.data.map((item, i) => <DataDisplay key={`ROOT-${i}`} data={item} />)
                )}
            </div>
        </div>
    );
}

export { Feed };
