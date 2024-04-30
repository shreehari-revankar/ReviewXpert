

function Topauthor({title,auther,value,link}) {



    return (
        <>
            <div className="h-[100%] md:p-5 p-2 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
                <div className="flex justify-between items-center px-[20px]">
                    <p className="sentencecase font-bold text-lg my-4">{title}</p>
                </div>
                <div className="">
                    <table className="w-full bg-white  border-gray-300 border-2">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">{title}</th>
                                <th className="p-2 border-b">Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auther.map((country, index) => (
                                <tr key={index}>
                                <td className="p-2 border-b"><a href={link[index]}>{country}</a></td>
                                <td className="p-2 border-b">{value[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Topauthor;
