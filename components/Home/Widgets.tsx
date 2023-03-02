import Style1 from "../Widget_Styles/Style1";
import Style2 from "../Widget_Styles/Style2";
import React from "react";

export default function Widgets({ data }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ul className="flex flex-col items-center justify-center w-full">
        {data.map((widget: any) => (
          <>
            {widget.Style === 1 ? (
              <Style1 data={widget} />
            ) : widget.Style === 2 ? (
              <Style2 data={widget} />
            ) : (
              <div>Style not found</div>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
