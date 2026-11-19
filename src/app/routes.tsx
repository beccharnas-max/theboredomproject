import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "../components/SiteChrome";
import Home from "../pages/Home";
import Services from "../pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
