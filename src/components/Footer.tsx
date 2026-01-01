import { useTenant } from "../context/TenantContext";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { tenant } = useTenant();
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: "100%",
        padding: "16px 20px",
        marginTop: 40,
        borderTop: "1px solid #222",
        color: "#9ca3af",
        fontSize: 14,
        textAlign: "center",
        backgroundColor: theme.backgroundColor
      }}
    >
      {tenant ? `${tenant.toUpperCase()} • ` : ""}
      ChipTalk © {new Date().getFullYear()}
    </div>
  );
}
