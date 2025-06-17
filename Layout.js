// src/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Extracted from Home

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Renders the matched route component */}
      </main>
    </>
  );
}
