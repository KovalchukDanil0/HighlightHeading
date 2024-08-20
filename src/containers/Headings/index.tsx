import React from "react";
import Draggable from "react-draggable";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { IHeadings, ISubHeadings } from "../../shared";
import "./index.scss";

const headingGelatine = "highlight-headings-gelatine";

function clickHeading(headingsArray: ISubHeadings) {
  if (headingsArray.index >= headingsArray.nodes.length) {
    headingsArray.index = 0;
  }

  const element = headingsArray.nodes[headingsArray.index];
  const yOffset = element.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top: yOffset, behavior: "smooth" });

  element.classList.add(headingGelatine);

  headingsArray.index++;
}

const iconProps = { color: "black", size: "25px" };

type Props = {
  headings: IHeadings;
};

const Headings = ({ headings }: Readonly<Props>): React.JSX.Element => (
  <Draggable>
    <div className="highlight-headings-popup">
      {Object.keys(headings).map((h) => {
        const nodes: ISubHeadings = headings[h as keyof typeof headings];
        nodes.nodes.forEach((node) => {
          node.addEventListener("animationend", function () {
            node.classList.remove(headingGelatine);
          });
        });

        return (
          <div
            key={h}
            className={twMerge(
              "highlight-headings-popup-container",
              nodes.nodes.length === 0 && "highlight-headings-fade-out",
            )}
            style={{
              backgroundColor: nodes.color,
            }}
          >
            <p style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}>
              {h.toUpperCase()}
            </p>
            <p
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
            >
              count: {nodes.nodes.length}
            </p>
            {nodes.nodes.length > 0 ? (
              <IconContext.Provider value={iconProps}>
                <FaArrowRight
                  nodes-heading={h}
                  style={{
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => clickHeading(nodes)}
                />
              </IconContext.Provider>
            ) : (
              false
            )}
          </div>
        );
      })}
    </div>
  </Draggable>
);

export default Headings;
