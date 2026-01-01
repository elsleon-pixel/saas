export default function PageContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "24px 32px",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      {children}
    </div>
  );
}