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

  const isAdminRoute = location?.pathname?.startsWith("/admin")

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Header onToggleSidebar={toggleSidebar} />

      <div
        style={{
          position: "absolute",
          top: "4rem",
          height: "calc(100vh - 4rem)",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        {isAdminRoute && <Sidebar open={sidebarOpen} />}
        <main style={{ width: "100%", margin: "1rem" }}>
          {/* Rutas para el contenido principal */}
          <Routes>{routes}</Routes>
        </main>
      </div>
    </div>
  )
}

export default App
