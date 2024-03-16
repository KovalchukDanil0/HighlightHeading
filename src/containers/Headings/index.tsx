import React from "react";
import Draggable from "react-draggable";
import { IHeadings } from "../../shared";

type Props = {
  headings: IHeadings;
};

export default function Headings(props: Readonly<Props>): React.JSX.Element {
  return (
    <Draggable>
      <div
        id="headings-popup"
        className="fixed bottom-0 left-0 right-0 top-0 z-[1000] ml-5 mt-5 h-fit w-56 cursor-grab"
      >
        <div className="flex-1 flex-col">
          {Object.keys(props.headings).map((h, idx) => {
            const nodes = props.headings[h as keyof typeof props.headings];
            return (
              <div key={idx} className={`my-1 text-center ${nodes.color}`}>
                <h2 className="inline-block font-serif text-2xl text-black">
                  {h.toUpperCase()}
                </h2>
                <h3 className="ml-2 inline-block font-serif text-2xl text-black">
                  count: {nodes.nodes.length}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Draggable>
  );
}
