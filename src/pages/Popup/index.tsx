import React from "react";
import { Root, createRoot } from "react-dom/client";
import Popup from "./Popup";

import "../../assets/css/tailwind.scss";
import "./index.scss";

const container: HTMLElement | null = document.getElementById("app-container");
if (!container) {
  throw new Error("Critical Error - root element is null");
}

const root: Root = createRoot(container);
root.render(<Popup />);
