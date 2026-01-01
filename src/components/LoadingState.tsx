import { useTheme } from "../context/ThemeContext";

export default function LoadingState({ message = "Loading..." }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        color: theme.textColor,
        opacity: 0.8,
        padding: "40px 0",
        textAlign: "center",
        fontSize: 16
      }}
    >
      {message}
    </div>
  );
}