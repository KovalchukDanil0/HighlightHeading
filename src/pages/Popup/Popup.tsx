import { Spinner, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import Browser from "webextension-polyfill";
import "./Popup.css";

let isActive: boolean | null = null;

function activateHeadings() {
  isActive = !isActive;
  let name = "Headings is ";

  Browser.storage.local.set({ isActive });

  setTimeout(() => {
    window.close();
  }, 2000);

  if (isActive) {
    name += "active";
  } else {
    name += "deactivated";
  }

  return name;
}

export default function Popup(): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  async function getState() {
    if (isActive != null) {
      return;
    }

    const data: Record<string, any> =
      await Browser.storage.local.get("isActive");
    isActive = data.isActive;

    setIsLoaded(true);
  }

  useEffect(() => {
    getState();
  });

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <Toast className="rounded-none">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-red-800 text-red-200" : "bg-green-800 text-green-200"}`}
      >
        {isActive ? <HiX /> : <HiCheck />}
      </div>
      <div className="ml-3 text-sm font-normal">{activateHeadings()}</div>
    </Toast>
  );
}
