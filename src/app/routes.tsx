import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "../components/SiteChrome";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
