// src/App.tsx
import React, { useState } from "react"
import { CssBaseline } from "@mui/material"
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header"
import routes from "./routes" // Importa las rutas
import { Routes, useLocation } from "react-router-dom"

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }
  const isMobile = window?.matchMedia("(max-width: 600px)")?.matches
  const showMenu = isMobile
    ? location?.pathname.includes("/admin/dashboard")
    : location?.pathname?.startsWith("/admin")

  if (location.pathname.startsWith("/backend") || location.pathname.startsWith("/assests")) {
    return null
  }
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Header onToggleSidebar={toggleSidebar} />

      <div
        style={{
          position: "absolute",
          top: "4rem",
          width: "100%",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          height: "calc(100vh - 4.4rem)",
          overflowY: "scroll",
        }}
      >
        {showMenu && <Sidebar open={sidebarOpen} />}
        <main style={{ width: "100%", padding: "4rem 2 rem", background: "#F5F6FA" }}>
          {/* Rutas para el contenido principal */}
          <Routes>{routes}</Routes>
        </main>
      </div>
    </div>
  )
}

export default App
