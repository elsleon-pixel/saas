import { createContext, useContext, useEffect, useState } from "react";

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    function goOffline() {
      setIsOffline(true);
    }

    function goOnline() {
      setIsOffline(false);
    }

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline }}>
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  return useContext(OfflineContext);
}