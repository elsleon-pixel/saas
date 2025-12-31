import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const TenancyContext = createContext({
  currentClub: null,
  location: null,
});

export function TenancyProvider({ children }) {
  let location = null;

  try {
    location = useLocation();
  } catch {
    // Router not ready yet — return fallback context
    return (
      <TenancyContext.Provider
        value={{
          currentClub: null,
          location: null,
        }}
      >
        {children}
      </TenancyContext.Provider>
    );
  }

  // TODO: Replace this with your real tenancy logic
  const currentClub = null;

  return (
    <TenancyContext.Provider value={{ currentClub, location }}>
      {children}
    </TenancyContext.Provider>
  );
}

export const useTenancy = () => useContext(TenancyContext);