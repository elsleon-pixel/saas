import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  function openModal(content) {
    setModal(content);
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#111",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
              maxWidth: "90vw",
              color: "#f9fafb"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {modal}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}