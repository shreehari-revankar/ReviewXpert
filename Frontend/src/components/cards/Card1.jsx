export default function Card1(param) {
  return (
    <>
      <div className=" py-1 md:py-0 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
        <div className="border-b-2 py-4 px-4 uppercase">{param.title}</div>
        <div className="p-4">{param.children}</div>
      </div>
    </>
  );
}
