import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TenantProvider } from "./context/TenantContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { OfflineProvider } from "./context/OfflineContext";
import { ToastProvider } from "./context/ToastContext";
import { ModalProvider } from "./context/ModalContext";

import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageContainer from "./components/PageContainer";

import OfflineBanner from "./components/OfflineBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import TenantErrorBoundary from "./components/TenantErrorBoundary";

import TenantGuard from "./components/TenantGuard";
import DeepLinkGuard from "./components/DeepLinkGuard";
import CanonicalURLGuard from "./components/CanonicalURLGuard";
import SessionRecoveryGuard from "./components/SessionRecoveryGuard";
import NavigationTracker from "./components/NavigationTracker";

import TenantSelect from "./pages/TenantSelect";
import NotFound from "./pages/NotFound";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import CreateTournament from "./pages/CreateTournament";
import TenantSettings from "./pages/TenantSettings";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTournaments from "./pages/admin/AdminTournaments";
import AdminUsers from "./pages/admin/AdminUsers";
import EditTournament from "./pages/admin/EditTournament";
import TenantBranding from "./pages/admin/TenantBranding";

function AppWrapper() {
  const { theme } = useTheme();

  return (
    <ErrorBoundary>
      <div style={{ backgroundColor: theme.backgroundColor, minHeight: "100vh" }}>
        <GlobalStyles />
        <OfflineBanner />
        <Header />
        <NavigationTracker />

        <PageContainer>
          <Routes>
            <Route path="/select" element={<TenantSelect />} />

            <Route
              path="/:tenant/*"
              element={
                <SessionRecoveryGuard>
                  <CanonicalURLGuard>
                    <TenantGuard>
                      <TenantErrorBoundary>
                        <DeepLinkGuard>
                          <Routes>
                            <Route path="" element={<Tournaments />} />
                            <Route path="tournaments" element={<Tournaments />} />
                            <Route path="tournaments/create" element={<CreateTournament />} />
                            <Route path="tournaments/:id" element={<TournamentDetail />} />
                            <Route path="settings" element={<TenantSettings />} />

                            <Route
                              path="admin"
                              element={
                                <AdminLayout>
                                  <AdminDashboard />
                                </AdminLayout>
                              }
                            />

                            <Route
                              path="admin/tournaments"
                              element={
                                <AdminLayout>
                                  <AdminTournaments />
                                </AdminLayout>
                              }
                            />

                            <Route
                              path="admin/tournaments/:id/edit"
                              element={
                                <AdminLayout>
                                  <EditTournament />
                                </AdminLayout>
                              }
                            />

                            <Route
                              path="admin/users"
                              element={
                                <AdminLayout>
                                  <AdminUsers />
                                </AdminLayout>
                              }
                            />

                            <Route
                              path="admin/branding"
                              element={
                                <AdminLayout>
                                  <TenantBranding />
                                </AdminLayout>
                              }
                            />

                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </DeepLinkGuard>
                      </TenantErrorBoundary>
                    </TenantGuard>
                  </CanonicalURLGuard>
                </SessionRecoveryGuard>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageContainer>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <TenantProvider>
      <ThemeProvider>
        <OfflineProvider>
          <ToastProvider>
            <ModalProvider>
              <Router>
                <AppWrapper />
              </Router>
            </ModalProvider>
          </ToastProvider>
        </OfflineProvider>
      </ThemeProvider>
    </TenantProvider>
  );
}