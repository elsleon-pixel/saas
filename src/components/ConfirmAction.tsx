import { Button } from "./UI";

export default function ConfirmAction({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel
}) {
  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>

      <p style={{ marginBottom: 20, color: "#9ca3af" }}>{message}</p>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  );
}