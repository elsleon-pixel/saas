import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { TenancyProvider } from "./context/TenancyContext";
import { TournamentProvider } from "./context/TournamentContext";

export default function App() {
  return (
    <AuthProvider>
      <TenancyProvider>
        <TournamentProvider>
          <RouterProvider router={router} />
        </TournamentProvider>
      </TenancyProvider>
    </AuthProvider>
  );
}