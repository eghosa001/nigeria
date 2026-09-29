"use client";
import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    const local = ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
    if (local || !("serviceWorker" in navigator)) return;

    let timer: number | undefined;
    const register = () => {
      timer = window.setTimeout(() => {
        navigator.serviceWorker.register("/sw.js").catch(() => undefined);
      }, 1200);
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("load", register);
    };
  }, []);

  return null;
}
