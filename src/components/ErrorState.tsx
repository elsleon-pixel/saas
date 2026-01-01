import { useTheme } from "../context/ThemeContext";

export default function ErrorState({ message }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        color: theme.textColor,
        padding: "40px 0",
        textAlign: "center",
        fontSize: 16
      }}
    >
      <div style={{ color: "#ef4444", marginBottom: 8, fontWeight: 600 }}>
        Something went wrong
      </div>
      <div style={{ color: "#9ca3af" }}>{message}</div>
    </div>
  );
}