import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/index";
import About from "../pages/About/index";
import Works from "../pages/Works/index";
import Contact from "../pages/Contact/index";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>ページが見つかりませんでした。</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "works", element: <Works /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;
