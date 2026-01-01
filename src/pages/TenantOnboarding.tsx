import { useTenant } from "../context/TenantContext";

export default function TenantOnboarding() {
  const { tenant } = useTenant();

  return (
    <div style={{ color: "#f9fafb" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Tenant Onboarding</h1>

      <p style={{ color: "#9ca3af" }}>
        This is where new clubs will complete their initial setup.
      </p>

      {tenant && (
        <p style={{ marginTop: 12, color: "#6b7280" }}>
          Active tenant: <strong>{tenant}</strong>
        </p>
      )}
    </div>
  );
}