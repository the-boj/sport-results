import { Thumb } from '../utils/thumb';

interface Props {
    courseItem: ItemLiveCourse;
}
function FeedCourseDisplay({ courseItem }: Props) {
    const { statut } = courseItem;
    const { classement } = courseItem.specifics;

    if (!classement) {
        return (
            <div className="flex justify-center w-full">
                <div className="flex justify-center w-[98%] border-b-2">
                    <div className="flex p-2 pl-5 w-[98%]">
                        <span>{statut.libelle}</span>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-center w-[98%] border-b-2">
                <div className="flex p-2 pr-0 w-[98%]">
                    <span>{classement[0]?.title?.text}</span>
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
