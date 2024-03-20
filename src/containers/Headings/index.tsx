import React from "react";
import Draggable from "react-draggable";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { IHeadings, ISubHeadings } from "../../shared";
import "./styles.css";

type Props = {
  headings: IHeadings;
};

const headingAnimation = "gelatine";
const yOffset = -100;

function ClickHeading(headingsArray: ISubHeadings) {
  if (headingsArray.index >= headingsArray.nodes.length) {
    headingsArray.nodes[0].classList.remove(headingAnimation);
    headingsArray.index = 0;
  }

  const element = headingsArray.nodes[headingsArray.index];
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });

  if (headingsArray.index !== 0) {
    headingsArray.nodes[headingsArray.index - 1].classList.remove(
      headingAnimation,
    );
  }
  element.classList.add(headingAnimation);

  headingsArray.index++;
}

export default function Headings(props: Readonly<Props>): React.JSX.Element {
  const iconProps = { color: "black", size: "25px" };
  return (
    <Draggable>
      <div className="highlight-headings-headings-popup">
        {Object.keys(props.headings).map((h, idx) => {
          const nodes = props.headings[h as keyof typeof props.headings];
          return (
            <div
              key={idx}
              className="highlight-headings-headings-container"
              style={{
                opacity: nodes.nodes.length > 0 ? "100%" : "50%",
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
