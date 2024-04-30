import accesstimeSvg from "/svg/access_time.svg";

export default function TimeSelect(param) {
  const hour_options = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const min_options = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  return (
    <div className="md:flex md:gap-2 md:flex-row flex flex-col">

      <input
        className="p-4"
        type="checkbox"
        defaultChecked={param.open ? true : false}
      />

      <h1 className="text-lg p-5 px-2 text-gray-500">{param.day}</h1>
      <div className="flex  justify-end bg-gray-100 px-4 rounded-md relative">
        <label className="absolute top-0 left-0 text-sm text-gray-500 p-1">
          Start at
        </label>
        <img className=" mt-5 md:mt-0 pt-3" src={accesstimeSvg} alt="accesstimeSvg" />
        <select
          className="inline-flex md:mt-0 mt-5 gap-2 px-1 pt-3 bg-gray-100 rounded-md justify-start items-center w-full"
          type="text"
          defaultValue={param.start_at.split(":")[0]}
        >
          {hour_options.map((option, index) => {
            return (
              <option
                key={index}
                className=" rounded bg-[#ecf0f0] text-[#475156]"
              >
                {option}
              </option>
            );
          })}
        </select>
        <span className="pl-2 pt-7">hr</span>
        <select
          className="inline-flex md:mt-0 mt-5 gap-2 px-1 pt-3 bg-gray-100 rounded-md justify-start items-center w-full"
          type="text"
          defaultValue={param.start_at.split(":")[1]}
        >
          {min_options.map((option, index) => {
            return (
              <option
                key={index}
                className=" rounded bg-[#ecf0f0] text-[#475156]"
              >
                {option}
              </option>
            );
          })}
        </select>
        <span className="pl-2 pt-7">min</span>
      </div>
      <div className="flex justify-end bg-gray-100 px-4 rounded-md relative">
        <label className="absolute  top-0 left-0 text-sm text-gray-500 p-1">
          End at
        </label>
        <img className=" mt-5 md:mt-0 pt-3" src={accesstimeSvg} alt="accesstimeSvg" />
        <select
          className="inline-flex mt-5 md:mt-0 gap-2 px-1 pt-3 bg-gray-100 rounded-md justify-start items-center w-full"
          type="text"
          defaultValue={param.end_at.split(":")[0]}
        >
          {hour_options.map((option, index) => {
            return (
              <option
                key={index}
                className=" rounded bg-[#ecf0f0] text-[#475156]"
              >
                {option}
              </option>
            );
          })}
        </select>
        <span className="pl-2 pt-7">hr</span>
        <select
          className="inline-flex  mt-4 md:mt-0 gap-2 px-1 pt-3 bg-gray-100 rounded-md justify-start items-center w-full"
          type="text"
          defaultValue={param.end_at.split(":")[1]}
        >
          {min_options.map((option, index) => {
            return (
              <option
                key={index}
                className=" rounded bg-[#ecf0f0] text-[#475156]"
              >
                {option}
              </option>
            );
          })}
        </select>
        <span className="pl-2 pt-7">min</span>
      </div>
    </div>
  );
}
