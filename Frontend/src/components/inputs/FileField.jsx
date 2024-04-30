export default function FileField(param) {
  return (
    <div
      className={`flex flex-col justify-start items-start gap-2.5 ${param.class}`}
    >
      <div className="text-zinc-600 text-sm font-medium">
        {param.title}
        {param.required && <span className="text-red-500 ml-1">*</span>}
      </div>
      <input
        className="inline-flex px-2 py-1.5 bg-gray-100 rounded-md
          justify-start items-center w-full file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-orange-100 file:text-[#FD7603]
          hover:file:bg-orange-200 file:cursor-pointer"
        type="file"
        placeholder={param.placeholder}
        onInput={(e)=>param.callback(e.target.files)}
      />
    </div>
  );
}
