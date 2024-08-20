import Browser from "webextension-polyfill";
import { SavedData, setBadge } from "../../shared";

async function onStartup() {
  const data: SavedData = (await Browser.storage.local.get(
    "isActive",
  )) as SavedData;

  if (data.isActive) {
    setBadge();
  }
}

Browser.runtime.onStartup.addListener(onStartup);
