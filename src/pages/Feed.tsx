import { useEffect, useMemo, useState } from 'react';
import { requestApi } from '../utils/api';
import { DataDisplay } from '../listing/DataDisplay';
import { DataDisplaySkeleton } from '../skeleton/DataDisplaySkeleton';
import { ApiResponse } from '../types/api';
import { getScrollToId } from '../utils/ids';
import { FilterSkeleton } from '../skeleton/FiltersSkeleton';
import { useSearchParams } from 'react-router-dom';
import { DateSelector } from '../app/DateSelector';

function isSelectedClasses(filter?: string, selected?: string | null) {
    let baseClasses = "flex flex-col justify-center pl-3 pr-3 mx-2 h-[40px] rounded text-center text-sm cursor-pointer"
    return filter === selected ? `${baseClasses} bg-black text-white` : `${baseClasses} bg-gray-200 text-black`;
}

function Feed() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filterParam = searchParams.get('filter');
    const dateParam = searchParams.get('date');

    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(dateParam ? new Date(dateParam) : new Date());
    const [apiData, setApiData] = useState<ApiResponse>();

    const filters = useMemo(() => {
        return apiData?.data[0].content.feed.items
            .filter((item) => item.__type === 'live_listing_widget')
            .map((item, i) => item.title?.text)
            .filter((item) => item)
            .sort();
    }, [apiData]);

    // This function will do a smooth scroll to the DOM element whose id we know
    function handleFilterClick(filterTitle?: string, onLoad?: boolean) {
        // Create or match the same ID you used in your rendered item
        // e.g. `scroll-to-My Event Name` becomes `scroll-to-my-event-name`
        if (!filterTitle) {
            return;
        }
        if (filterTitle === filterParam && !onLoad) {
            setSearchParams({ ...(dateParam ? { date: dateParam } : {}) });
            const el = document.getElementById("top-of-feed");
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const safeId = getScrollToId(filterTitle);
            const el = document.getElementById(safeId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                setSearchParams({ ...(dateParam ? { date: dateParam } : {}), filter: filterTitle });
            }
        }
    }

    function handleDateClick(date: Date) {
        setSelectedDate(date);
        setSearchParams({ date: date.toISOString(), ...(filterParam ? { filter: filterParam } : {}) });
    }

    async function fetchData() {
        if (!loading) {
            setLoading(true);
            try {
                const data = await requestApi(selectedDate);
                setApiData(data);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    useEffect(() => {
        if (apiData && filterParam) {
            handleFilterClick(filterParam, true);
        }
    }, [apiData, filterParam]);

    if (!loading && !apiData) {
        return <div>No data</div>;
    }
    return (
        <div className="flex flex-col">
            <div className="h-[55px] mb-[10px]">
                <DateSelector selectedDate={selectedDate} handleDateClick={handleDateClick} />
            </div>
            <div className="filters w-full pb-[5px]">
                {loading ? (
                    <FilterSkeleton />
                ) : (
                    filters?.map((filter, i) => (
                        <div
                            onClick={() => handleFilterClick(filter)}
                            className={isSelectedClasses(filter, filterParam)}
                            key={`FILTER-${i}`}
                        >
                            {filter}
                        </div>
                    ))
                )}
            </div>
            <div style={{ height: 'calc(100vh - 115px)' }} className="overflow-scroll scrollable">
                <div id="top-of-feed" />
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
