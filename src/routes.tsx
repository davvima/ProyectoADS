import React from "react"
import { Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Usuarios from "./pages/Usuarios"
import Roles from "./pages/Roles"
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
    <Route path="/admin/dashboard" element={ProtectedRouteWrapper(<Dashboard />)} />
    <Route path="/admin/usuarios" element={ProtectedRouteWrapper(<Usuarios />)} />
    <Route path="/admin/roles" element={ProtectedRouteWrapper(<Roles />)} />
    <Route path="/admin/comercios" element={ProtectedRouteWrapper(<Comercios />)} />
    <Route
      path="/admin/solicitudes-comercios"
      element={ProtectedRouteWrapper(<SolicitudesComercios />)}
    />
    <Route path="/admin/estadisticas" element={ProtectedRouteWrapper(<Estadisticas />)} />
    <Route path="/admin/notificaciones" element={ProtectedRouteWrapper(<Notificaciones />)} />
    <Route path="/admin/configuracion" element={ProtectedRouteWrapper(<Configuracion />)} />
    <Route path="/registro-comercio" element={<RegistroComercio />} />
  </>
)

export default routes
