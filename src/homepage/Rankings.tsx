import { useNavigate } from 'react-router-dom';
import { COMPETITION_TO_SLUG } from '../types/slugs';

function Rankings() {
    const rankings = Object.keys(COMPETITION_TO_SLUG);

    const navigate = useNavigate();

    function navigateToRankings(competition: string) {
        const competitionData = COMPETITION_TO_SLUG[competition as keyof typeof COMPETITION_TO_SLUG];
        if (competitionData) {
            navigate(`/ranking/${competitionData.sport}/${competitionData.slug}`);
        }
    }

    return (
        <div
            className="flex flex-col h-full gap-2 items-center pt-4 overflow-scroll scrollable"
            style={{ height: 'calc(100vh - 50px)' }}
        >
            {rankings.map((competition) => (
                <div
                    className="text-xl m-1 p-2 flex w-[80%] justify-center"
                    onClick={() => navigateToRankings(competition)}
                >
                    <p>{competition}</p>
                </div>
            ))}
            <div className="mb-[30px]" />
        </div>
    );
}

export { Rankings };
