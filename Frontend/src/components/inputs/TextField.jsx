export default function TextField(param) {
  return (
    <div
      className={`flex flex-col justify-start items-start gap-2.5 ${param.class}`}
    >
      <div className="text-zinc-600 text-sm font-medium">
        {param.title}
        {param.required && <span className="text-red-500 ml-1">*</span>}
      </div>
      <input
        className="inline-flex gap-2.5 px-4 py-2.5 bg-gray-100 rounded-md justify-start items-center w-full"
        type="text"
        placeholder={param.placeholder}
        defaultValue={param.value}
        onInput={(e)=>param.callback(e.target.value)}
      />
    </div>
  );
}
