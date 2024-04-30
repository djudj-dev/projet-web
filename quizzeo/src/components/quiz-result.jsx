export const QuizResult = ({
    title,
    score,
    date
}) => {
    return (
        <div className="flex flex-col gap-3 w-11/12 m-auto shadow-tile bg-white rounded p-[10px] text-sm">
            {/* Conteneur principal avec styles pour la tuile */}
            <div className="flex justify-between">
                <p className="font-bold">{title}</p>
            <p className="text-[#6A6363] flex items-center justify-center">
                Fait le {new Intl.DateTimeFormat('en-US').format(new Date(date))}
            </p>
                {/* Conteneur pour le statut et la date de création */}
            </div>
                <div className=" flex items-center justify-center w-[80px] h-[33px] rounded px-[6px] py-2 bg-[#FFC9C1] text-[#6A0808]">
                    <p className="font-bold">{score*100} %</p>
                </div>
        </div>
    );
};