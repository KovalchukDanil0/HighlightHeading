import React from "react";
import { IHeadings } from "../../shared";

type Props = {
  headings: IHeadings;
};

export default function Headings(props: Readonly<Props>): React.JSX.Element {
  function dragElement(elmnt: HTMLElement) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
      elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <div
      id="headings-popup"
      className="fixed bottom-0 left-0 right-0 top-0 z-[1000] ml-5 mt-5 h-fit w-56 hover:opacity-25 active:pointer-events-none"
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
  );
}
