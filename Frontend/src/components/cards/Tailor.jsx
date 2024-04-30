const Tailor = card => {
    return (

        <div className="flex-col justify-start items-start gap-4 transform transition-transform hover:scale-110">
            <div className="w-16 h-16 relative">
                <img
                    className="w-16 h-16 left-[-0px] top-0 absolute p-[5px]"
                    src={card.data.image}
                />
            </div>
            <div className="self-stretch text-slate-900 text-1xl font-bold leading-relaxed">
                {card.data.head}
            </div>
            <div className="text-slate-600 text-md font-normal leading-[28px]">
                {card.data.body}<br />
            </div>
        </div>
    )
};

export default Tailor;