import { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import Browser from "webextension-polyfill";
import "../../assets/css/tailwind-no-overlap.css";
import Headings from "../../containers/Headings";
import { IHeadings } from "../../shared";

(async function Main() {
  const isActive: Record<string, any> =
    await Browser.storage.local.get("isActive");

  if (!isActive.isActive) {
    return;
  }

  const headings: IHeadings = {
    h1: {
      nodes: document.querySelectorAll("h1"),
      color: "bg-red-600",
    },
    h2: {
      nodes: document.querySelectorAll("h2"),
      color: "bg-blue-600",
    },
    h3: {
      nodes: document.querySelectorAll("h3"),
      color: "bg-yellow-400",
    },
    h4: {
      nodes: document.querySelectorAll("h4"),
      color: "bg-cyan-600",
    },
    h5: {
      nodes: document.querySelectorAll("h5"),
      color: "bg-green-600",
    },
    h6: {
      nodes: document.querySelectorAll("h6"),
      color: "bg-yellow-600",
    },
  };

  const headingsElm: ReactElement = Headings({
    headings,
  });

  Object.keys(headings).map((h) => {
    const hElm = headings[h as keyof typeof headings];
    hElm.nodes.forEach((elm) => elm.classList.add(hElm.color));
  });

  const div: HTMLDivElement = document.createElement("div");
  const test = createRoot(document.body.appendChild(div));
  test.render(headingsElm);
})();
