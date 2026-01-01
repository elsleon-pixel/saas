import { createContext, useContext, useEffect, useState } from "react";
import { useTenant } from "./TenantContext";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const ThemeContext = createContext(null);

// GLOBAL DEFAULTS
const globalDefaults = {
  primaryColor: "#3b82f6",
  accentColor: "#1e40af",
  backgroundColor: "#000000",
  textColor: "#f9fafb",
  logoUrl: null
};

// FUTURE: tenant-specific defaults
function getTenantDefaults(tenant) {
  return globalDefaults;
}

export function ThemeProvider({ children }) {
  const { tenant } = useTenant();

  const [theme, setTheme] = useState(globalDefaults);

  // Load cached theme instantly
  useEffect(() => {
    if (!tenant) {
      setTheme(globalDefaults);
      return;
    }

    const cached = localStorage.getItem(`theme_${tenant}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setTheme(parsed);
      } catch {
        setTheme(globalDefaults);
      }
    }
  }, [tenant]);

  // Fetch fresh theme from Firestore
  useEffect(() => {
    async function loadTheme() {
      if (!tenant) {
        setTheme(globalDefaults);
        return;
      }

      const tenantDefaults = getTenantDefaults(tenant);

      const ref = doc(db, "tenants", tenant, "settings", "theme");
      const snap = await getDoc(ref);

      let finalTheme;

      if (!snap.exists()) {
        finalTheme = {
          ...globalDefaults,
          ...tenantDefaults
        };
      } else {
        const overrides = snap.data();
        finalTheme = {
          ...globalDefaults,
          ...tenantDefaults,
          ...overrides
        };
      }

      // Save to state
      setTheme(finalTheme);

      // Cache it
      localStorage.setItem(`theme_${tenant}`, JSON.stringify(finalTheme));
    }

    loadTheme();
  }, [tenant]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}