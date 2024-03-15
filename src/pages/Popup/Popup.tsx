import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Browser from "webextension-polyfill";
import "./Popup.css";

let isActive = false;

function getStateButton() {
  let name: string;

  if (isActive) {
    name = "Deactivate";
  } else {
    name = "Activate";
  }

  return name;
}

function activateHeadings(event: React.MouseEvent) {
  isActive = !isActive;
  Browser.storage.local.set({ isActive });

  event.currentTarget.textContent = getStateButton();

  setTimeout(() => {
    window.close();
  }, 2000);
}

export default function Popup(): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  async function getState() {
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
    <main className="h-screen bg-fuchsia-700 px-5 py-5">
      <div className="h-full rounded-full bg-red-600 px-5 py-5">
        <div className="relative h-full rounded-full bg-emerald-600 px-5 py-5">
          <Button
            className="absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 text-xl text-white"
            onClick={activateHeadings}
            color="blue"
          >
            {getStateButton()}
          </Button>
        </div>
      </div>
    </main>
  );
}
