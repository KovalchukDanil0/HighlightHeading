import Browser from "webextension-polyfill";

export interface ISubHeadings {
  nodes: NodeListOf<HTMLHeadingElement>;
  color: string;
  index: number;
}

export interface IHeadings {
  h1: ISubHeadings;
  h2: ISubHeadings;
  h3: ISubHeadings;
  h4: ISubHeadings;
  h5: ISubHeadings;
  h6: ISubHeadings;
}

export function setBadge() {
  Browser.action.setBadgeText({ text: "ACT" });
  Browser.action.setBadgeBackgroundColor({ color: "#2ED825" });
}

export type ConfigurationModeType = "production" | "development";

export type SavedData = { isActive: boolean };
