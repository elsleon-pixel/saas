import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Venues from "./pages/Venues";
import Standings from "./pages/Standings";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Tenant pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// ADDED: RequireAuth import
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tournaments", element: <Tournaments /> },
      { path: "venues", element: <Venues /> },
      { path: "standings", element: <Standings /> },
      { path: "profile", element: <Profile /> },
      { path: "support", element: <Support /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogPost /> },
      { path: "*", element: <NotFound /> }
    ]
  },

  // Tenant-aware routes
  {
    path: "/:tenant",
    element: <MainLayout />,