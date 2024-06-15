import { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import Browser from "webextension-polyfill";
import Headings from "../../containers/Headings";
import { IHeadings } from "../../shared";
import "./index.css";

const rootId = "highlight-headings-root";

const headings: IHeadings = {
  h1: {
    nodes: document.querySelectorAll("h1"),
    color: "rgb(220, 38, 38)",
    index: 0,
  },
  h2: {
    nodes: document.querySelectorAll("h2"),
    color: "rgb(37, 99, 235)",
    index: 0,
  },

  h3: {
    nodes: document.querySelectorAll("h3"),
    color: "rgb(250, 204, 21)",
    index: 0,
  },
  h4: {
    nodes: document.querySelectorAll("h4"),
    color: "rgb(8, 145, 178)",
    index: 0,
  },
  h5: {
    nodes: document.querySelectorAll("h5"),
    color: "rgb(22, 163, 74)",
    index: 0,
  },
  h6: {
    nodes: document.querySelectorAll("h6"),
    color: "rgb(202, 138, 4)",
    index: 0,
  },
};

const headingsElm: ReactElement = Headings({
  headings,
});

function InitStyle() {
  const style = `
  :root {
    --color-h1: ${headings.h1.color};
    --color-h2: ${headings.h2.color};
    --color-h3: ${headings.h3.color};
    --color-h4: ${headings.h4.color};
    --color-h5: ${headings.h5.color};
    --color-h6: ${headings.h6.color};
  }`;
  const styleElm = document.createElement("style");
  styleElm.innerHTML = style;
  document.body.appendChild(styleElm);
}

async function ShowHeadings() {
  const isActive: Record<string, any> =
    await Browser.storage.local.get("isActive");

  if (!isActive.isActive) {
    return;
  }

  document.body.classList.add("highlight-headings-body");

  let div: HTMLElement = document.getElementById(rootId)!;
  if (div == null) {
    div = document.body.appendChild(document.createElement("div"));
    div.id = rootId;
  }

  const root = createRoot(div);
  root.render(headingsElm);
}

Browser.runtime.onMessage.addListener(function (msg) {
  if (msg.context !== "addRemovePopup") {
    return;
  }

  const popup: HTMLElement = document.getElementById(rootId)!;
  if (popup != null) {
    document.body.classList.remove("highlight-headings-body");
    popup.remove();
    Browser.action.setBadgeText({ text: "" });
  } else {
    ShowHeadings();
  }
  document.getElementById(rootId)?.remove();
});

(function Main() {
  InitStyle();
  ShowHeadings();
})();
