import { useTheme } from "../context/ThemeContext";

export default function Skeleton({ width = "100%", height = 16, style = {} }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 6,
        background: `linear-gradient(90deg,
          ${theme.backgroundColor} 0%,
          ${theme.accentColor}33 50%,
          ${theme.backgroundColor} 100%
        )`,
        backgroundSize: "200% 100%",
        animation: "skeleton-loading 1.4s ease infinite",
        ...style
      }}
    />
  );
}