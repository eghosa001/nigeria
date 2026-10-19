"use client";
import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    const local = ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
    if (local || !("serviceWorker" in navigator)) return;

    let timer: number | undefined;
    const register = () => {
      // Do not compete with first paint, ads or critical thumbnails on slow
      // mobile connections. The offline worker can install in idle time.
      timer = window.setTimeout(() => {
        navigator.serviceWorker.register("/sw.js").catch(() => undefined);
      }, 4000);
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
