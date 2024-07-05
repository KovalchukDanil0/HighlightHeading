import React from "react";
import Draggable from "react-draggable";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { IHeadings, ISubHeadings } from "../../shared";
import "./index.scss";

const headingAnimation = "highlight-headings-gelatine";
const yOffset = -100;

function ClickHeading(headingsArray: ISubHeadings) {
  if (headingsArray.index >= headingsArray.nodes.length) {
    headingsArray.index = 0;
  }

  const element = headingsArray.nodes[headingsArray.index];
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });

  element.classList.add(headingAnimation);

  headingsArray.index++;
}

type Props = {
  headings: IHeadings;
};

export default function Headings(props: Readonly<Props>): React.JSX.Element {
  const iconProps = { color: "black", size: "25px" };

  return (
    <Draggable>
      <div className="highlight-headings-headings-popup">
        {Object.keys(props.headings).map((h, idx) => {
          const nodes: ISubHeadings =
            props.headings[h as keyof typeof props.headings];
          nodes.nodes.forEach((node) => {
            node.addEventListener("animationend", function () {
              node.classList.remove(headingAnimation);
            });
          });

          return (
            <div
              key={idx}
              className={`highlight-headings-headings-container${nodes.nodes.length === 0 ? " highlight-headings-fade-out" : ""}`}
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
                    onClick={() => ClickHeading(nodes)}
                  />
                </IconContext.Provider>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </Draggable>
  );
}
