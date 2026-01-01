import { useTheme } from "../context/ThemeContext";

export default function EmptyState({ message }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: "40px 0",
        textAlign: "center",
        color: theme.textColor,
        opacity: 0.85
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>{message}</h2>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        Nothing to show here yet.
      </p>
    </div>
  );
}