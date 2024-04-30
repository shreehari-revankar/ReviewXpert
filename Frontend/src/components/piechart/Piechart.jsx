const Piechart = (data) => {
  let positive = Math.floor((data.prop[0] / 100) * 360);
  let neutral = Math.floor((data.prop[1] / 100) * 360);

  const red = "DC2626";
  const yellow = "FDE047";
  const green = "22C55E";

  return (
    <div
      className="mx-auto my-auto w-[270px] h-[270px] rounded-full flex justify-center items-center shadow-lg"
      style={{
        background: `conic-gradient(#${green} 0deg, #${green} ${
          positive + "deg"
        }, #${yellow} ${neutral + "deg"}, #${yellow} ${
          positive + neutral + "deg"
        }, #${red} ${positive + neutral + "deg"})`,
      }}
    >
      <div className="w-[230px] h-[230px] rounded-full bg-white flex flex-col justify-center items-center text-2xl shadow-xl">
        <div>Total Reviews</div>
        <div>{data.count}</div>
      </div>
    </div>
  );
};

export default Piechart;
