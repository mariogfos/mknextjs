import { useSyncExternalStore } from "react";

export const useLocalStorageState = (key: string, defaultValue: any) => {
  let state: any = "";
  const subscribe = (callback: any) => {
    const listener = (e: any) => {
      if (e.storageArea === localStorage && e.key === key) {
        callback();
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  };

  // Get the current state from localStorage
  const getSnapshot = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  };

  const setState = (val: any) => {
    console.log("set state", key, val);
    localStorage.setItem(key, JSON.stringify(val));
  };
  // Synchronize state to the localStorage key
  return [useSyncExternalStore(subscribe, getSnapshot), setState];
};
