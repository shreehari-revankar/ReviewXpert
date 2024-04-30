export default function SelectField(param) {
  return (
    <div className={`flex flex-col justify-start items-start gap-2.5 ${param.class}`}>
      <div className="text-zinc-600 text-sm font-medium">
        {param.title}
        {param.required && <span className="text-red-500 ml-1">*</span>}
      </div>
      <select
        className="inline-flex gap-2.5 px-4 py-3 bg-gray-100 rounded-md justify-start items-center w-full"
        type="text"
        defaultValue={param.selected}
        onInput={(e) => param.callback(e.target.value)}
      >
        {param.options.map((option, index) => {
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
    </div>
  );
}
