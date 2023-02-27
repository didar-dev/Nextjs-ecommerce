export default function Widgets({ data }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold">Widgets</h1>
      <ul className="flex flex-col items-center justify-center w-full">
        {data.map((widget: any) => (
          <li key={widget.id} className="text-xl">
            {widget.Title}
          </li>
        ))}
      </ul>
    </div>
  );
}
