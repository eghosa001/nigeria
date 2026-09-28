"use client";
import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    const local = ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
    if (!local && "serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return null;
}
