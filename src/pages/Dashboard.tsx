import { useTenant } from "../context/TenantContext";

export default function Dashboard() {
  const { tenant } = useTenant();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>

      {tenant && (
        <p style={{ marginTop: "12px", opacity: 0.7 }}>
          Active tenant: <strong>{tenant}</strong>
        </p>
      )}
    </div>
  );
}