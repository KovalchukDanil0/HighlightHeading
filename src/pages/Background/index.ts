import Browser from "webextension-polyfill";
import { SetBadge } from "../../shared";

async function Main() {
  const data: Record<string, any> = await Browser.storage.local.get("isActive");
  const isActive = data.isActive;

  if (isActive) {
    SetBadge();
  }
}

Browser.runtime.onStartup.addListener(Main);
