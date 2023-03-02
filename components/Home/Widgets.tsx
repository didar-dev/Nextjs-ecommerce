import Style1 from "../Widget_Styles/Style1";
import Style2 from "../Widget_Styles/Style2";
import Style3 from "../Widget_Styles/Style3";
import React from "react";

export default function Widgets({ data }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ul className="flex flex-col items-center justify-center w-full">
        {data
          .sort((a: any, b: any) => a.Slot - b.Slot)
          .map((widget: any) => (
            <>
              {widget.Type === "1" && <Style1 data={widget} />}
              {widget.Type === "2" && <Style2 data={widget} />}
              {widget.Type === "3" && <Style3 data={widget} />}
            </>
          ))}
      </ul>
    </div>
  );
}
