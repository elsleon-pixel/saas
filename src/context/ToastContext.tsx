import { createContext, useContext, useState, ReactNode } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type = "success") {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999
        }}
      >
        {toasts.map(t => (
          <div
            key={t.id}
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              backgroundColor: t.type === "error" ? "#b91c1c" : "#16a34a",
              color: "white",
              minWidth: 200,
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}