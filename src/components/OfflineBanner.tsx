import { useOffline } from "../context/OfflineContext";
import { useTheme } from "../context/ThemeContext";

export default function OfflineBanner() {
  const { isOffline } = useOffline();
  const { theme } = useTheme();

  if (!isOffline) return null;

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 16px",
        backgroundColor: theme.accentColor,
        color: theme.textColor,
        textAlign: "center",
        fontWeight: 600,
        position: "sticky",
        top: 0,
        zIndex: 999
      }}
    >
      You are offline — showing cached data
    </div>
  );
}