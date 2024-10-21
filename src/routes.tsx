import React from "react"
import { Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Usuarios from "./pages/Usuarios"
import GestionRoles from "./pages/GestionRoles"
import Comercios from "./pages/Comercios"
import SolicitudesComercios from "./pages/SolicitudesComercios"
import Estadisticas from "./pages/Estadisticas"
import Notificaciones from "./pages/Notificaciones"
import Configuracion from "./pages/Configuracion"
import RegistroComercio from "./pages/RegistroComercio"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

// Función para crear rutas protegidas
const ProtectedRouteWrapper = (element) => <ProtectedRoute>{element}</ProtectedRoute>

const routes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/" element={<Navigate to="/registro-comercio" replace />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/usuarios" element={<Usuarios />} />
    <Route path="/admin/roles" element={<GestionRoles />} />
    <Route path="/admin/comercios" element={<Comercios />} />
    <Route path="/admin/solicitudes-comercios" element={<SolicitudesComercios />} />
    <Route path="/admin/estadisticas" element={<Estadisticas />} />
    <Route path="/admin/notificaciones" element={<Notificaciones />} />
    <Route path="/admin/configuracion" element={<Configuracion />} />
    <Route path="/registro-comercio" element={<RegistroComercio />} />
  </>
)

export default routes
