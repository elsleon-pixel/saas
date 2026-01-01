import { useTenant } from "../context/TenantContext";

export default function Profile() {
  const { tenant } = useTenant();

  return (
    <div style={{ color: "#f9fafb" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Your Profile</h1>
      <p style={{ color: "#9ca3af" }}>
        Profile details will appear here soon.
      </p>

      {tenant && (
        <p style={{ marginTop: 12, color: "#6b7280" }}>
          Active tenant: <strong>{tenant}</strong>
        </p>
      )}
    </div>
  );
}