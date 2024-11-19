import { useEffect, useState } from 'react';
import { requestApi } from '../utils/api';
import { DataDisplay } from '../listing/DataDisplay';
import { DataDisplaySkeleton } from '../skeleton/DataDisplaySkeleton';
import DateSelector from './DateSelector';

function App() {
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

export { App };
