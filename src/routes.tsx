import React from "react"
import { Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Usuarios from "./pages/Usuarios"
import GestionRoles from "./pages/GestionRoles"
import Atracciones from "./pages/Atracciones"
import SolicitudesComercios from "./pages/SolicitudesComercios"
import Estadisticas from "./pages/Estadisticas"
import Notificaciones from "./pages/Notificaciones"
import ConfiguracionVolumenes from "./pages/ConfiguracionVolumenes"
import RegistroComercio from "./pages/RegistroComercio"
import Login from "./pages/Auth/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import DetalleSolicitudes from "./components/Solicitudes/DetalleSolicitudes"
import RegistroAtraccion from "./components/RegistroAtraccion"
import NuevoUsuario from "./pages/Usuarios/NuevoUsuario"
import Videos from "./pages/Videos"
import Centros from "./pages/Centros"
import Informes from "./pages/Informes"
import LoginAdmin from "./pages/Auth/LoginAdmin"

// Función para crear rutas protegidas
const ProtectedRouteWrapper = (element) => <ProtectedRoute>{element}</ProtectedRoute>

const routes = (
  <>
    <Route path="/login/registro-comercio" element={<Login />} />
    <Route path="/login/admin" element={<LoginAdmin />} />
    <Route path="/" element={<Navigate to="/login/registro-comercio" replace />} />
    <Route path="/admin" element={<Navigate to="/login/admin" replace />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/usuarios" element={<Usuarios />} />
    <Route path="/admin/usuarios/nuevo" element={<NuevoUsuario />} />
    <Route path="/admin/roles" element={<GestionRoles />} />
    <Route path="/admin/atracciones" element={<Atracciones />} />
    <Route path="/admin/atracciones/nueva" element={<RegistroAtraccion />} />
    <Route path="/admin/solicitudes-comercios" element={<SolicitudesComercios />} />
    <Route path="/admin/solicitudes-comercios/:solicitudId" element={<DetalleSolicitudes />} />
    <Route path="/admin/estadisticas" element={<Estadisticas />} />
    <Route path="/admin/notificaciones" element={<Notificaciones />} />
    <Route path="/admin/centros" element={<Centros />} />
    <Route path="/admin/configuracion" element={<ConfiguracionVolumenes />} />
    <Route path="/admin/videos" element={<Videos />} />
    <Route path="/admin/informes" element={<Informes />} />
    <Route path="/registro-comercio" element={<RegistroComercio />} />
  </>
)

export default routes
