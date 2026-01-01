import { useTheme } from "../context/ThemeContext";

export function Button({ children, ...props }) {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      style={{
        padding: "10px 16px",
        backgroundColor: theme.primaryColor,
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: 600,
        opacity: props.disabled ? 0.6 : 1
      }}
    >
      {children}
    </button>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: "10px 12px",
        backgroundColor: "#111",
        color: "#f9fafb",
        border: "1px solid #333",
        borderRadius: 6,
        width: "100%",
        boxSizing: "border-box"
      }}
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      style={{
        padding: "10px 12px",
        backgroundColor: "#111",
        color: "#f9fafb",
        border: "1px solid #333",
        borderRadius: 6,
        width: "100%",
        minHeight: 120,
        boxSizing: "border-box"
      }}
    />
  );
}