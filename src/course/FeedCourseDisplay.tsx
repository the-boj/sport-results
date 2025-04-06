import { useNavigate } from 'react-router-dom';
import { ItemLiveCourse, Sport } from '../types/api';
import { Thumb } from '../utils/thumb';

interface Props {
    sport: Sport;
    courseItem: ItemLiveCourse;
}
function FeedCourseDisplay({ sport, courseItem }: Props) {
    const { statut } = courseItem;
    const { classement } = courseItem.specifics;

    const navigate = useNavigate();

    function navigateToLive() {
        if (sport !== 'Cyclisme sur route') {
            return;
        }
        const { id } = courseItem;
        navigate(`/cycling/${id}`);
    }

    if (!classement) {
        return (
            <div className="flex justify-center w-full" onClick={navigateToLive}>
                <div className="flex justify-center w-[98%] border-b-2">
                    <div className="flex p-2 pl-5 w-[98%]">
                        <p style={{ color: statut.type === 'encours' ? 'red' : 'black' }}>{statut.libelle}</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-center w-[98%] border-b-2">
                <div className="flex p-2 pr-0 w-[98%]">
                    <span style={{ color: statut.type === 'encours' ? 'red' : 'black' }}>
                        {classement[0]?.title?.text}
                    </span>
                    <div className="flex ml-5">
                        <Thumb image={classement[0]?.person?.pays?.url_drapeau} />
                        <span>{classement[0]?.person?.nom_complet}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { FeedCourseDisplay };
