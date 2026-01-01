import AdminSidebar from "../components/AdminSidebar";
import { useTheme } from "../context/ThemeContext";

export default function AdminLayout({ children }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.backgroundColor,
        color: theme.textColor
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "24px 32px",
          boxSizing: "border-box"
        }}
      >
        {children}
      </main>
    </div>
  );
}