import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { saveLastPage } from "../services/sessionRecoveryService";

export default function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Ignore non-meaningful pages
    if (
      path === "/select" ||
      path.includes("/login") ||
      path.includes("/logout") ||
      path.includes("/404")
    ) {
      return;
    }

    saveLastPage(path);
  }, [location.pathname]);

  return null;
}