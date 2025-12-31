import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import { AuthProvider } from "./context/AuthContext";
import { TenancyProvider } from "./context/TenancyContext";
import { TournamentProvider } from "./context/TournamentContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <TenancyProvider>
        <TournamentProvider>
          <RouterProvider router={router} />
        </TournamentProvider>
      </TenancyProvider>
    </AuthProvider>
  </React.StrictMode>
);