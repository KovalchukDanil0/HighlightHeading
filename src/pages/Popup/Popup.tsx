import React from "react";
import { useAsync } from "react-async";
import { Alert, Loading } from "react-daisyui";
import { HiCheck, HiX } from "react-icons/hi";
import Browser, { Tabs } from "webextension-polyfill";
import { SavedData, SetBadge } from "../../shared";

const windowCloseTime = 2000;

let isActive: boolean;

function activateHeadings(tabs: Tabs.Tab[]) {
  isActive = !isActive;
  let name = "Headings is ";

  Browser.storage.local.set({ isActive });

  tabs?.forEach((tab) => {
    if (tab.id != null) {
      Browser.tabs.sendMessage(tab.id, { context: "addRemovePopup" });
    }
  });

  if (isActive) {
    SetBadge();
    name += "active";
  } else {
    Browser.action.setBadgeText({ text: "" });
    name += "deactivated";
  }

  setTimeout(() => {
    window.close();
  }, windowCloseTime);

  return name;
}

async function initVariables(): Promise<Tabs.Tab[]> {
  const data = (await Browser.storage.local.get("isActive")) as SavedData;
  isActive = data.isActive;

  return Browser.tabs.query({ currentWindow: true });
}

export default function Popup() {
  const {
    data: tabs,
    error,
    isPending,
  } = useAsync({ promiseFn: initVariables });

  if (isPending) {
    return <Loading />;
  }

  if (error || tabs == null) {
    return `Something went wrong: ${error?.message ?? "tabs is undefined"}`;
  }

  return (
    <Alert
      className="block rounded-none"
      status={isActive ? "error" : "success"}
      icon={isActive ? <HiX /> : <HiCheck />}
    >
      {activateHeadings(tabs)}
    </Alert>
  );
}
