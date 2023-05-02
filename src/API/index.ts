import ExtensionReader from "./AddonReader";
import Bookmark from "./Bookmark";
import ContextItem from "./ContextItem";
import History from "./History";
import Keybind, { KeybindQuery } from "./Keybind";
import Protocol from "./Protocol";
import RuntimeModifier from "./RuntimeModifier";
import Tab from "./Tab";
import { bindIFrameMousemove } from "~/components/ContextMenu";
import { bookmarks, protocols, tabs, keybinds } from "~/data/appState";

const velocity = {
  Tab,
  getTabs: tabs,
  Protocol,
  getProtocols: protocols,
  Bookmark,
  getBookmarks: bookmarks,
  ContextItem,
  Keybind,
  getKeybinds: keybinds,
  getKeybind: (query: KeybindQuery) =>
    keybinds().find((keybind) => {
      for (let [k, v] of Object.entries(query)) {
        if (keybind[k as keyof Keybind] === v) return true;
      }
      return false;
    }),
  bindIFrameMousemove,
  history: new History(),
  postManifest: false,
  ExtensionReader,
  RuntimeModifier
};

declare global {
  var Velocity: typeof velocity;
  interface Window {
    Velocity: typeof velocity;
  }
}
globalThis.Velocity = velocity;
if (!import.meta.env.SSR) window.Velocity = velocity;

export default velocity;
