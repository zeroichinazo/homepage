import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/index";
import About from "../pages/About/index";
import Works from "../pages/Works/index";
import Contact from "../pages/Contact/index";
import Layout from "../components/Layout";

const getBase = () => {
  const pub = process.env.PUBLIC_URL || "";
  if (pub) {
    try {
      const u = new URL(pub);
      const p = u.pathname.replace(/\/$/, "");
      return p || "/";
    } catch {
      return pub.startsWith("/") ? pub : "/";
    }
  }
  // 開発時: CRAがhomepageを元に /<repo> で開く場合に対応
  const m = window.location.pathname.match(/^\/(?:([^/]+))(?:\/|$)/);
  return m ? `/${m[1]}` : "/";
};

export const router = createBrowserRouter(
  [
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
  ],
  { basename: getBase() }
);

export default router;
