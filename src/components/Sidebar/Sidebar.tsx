// src/components/Sidebar/Sidebar.tsx
import React from "react"
import { NavLink } from "react-router-dom"
import { List, ListItem, ListItemText } from "@mui/material"
import {
  People as UsersIcon,
  Group as RolesIcon,
  Store as CommerceIcon,
  Assignment as ApprovalIcon,
  BarChart as ReportsIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material"

const panelOptions = [
  { nombre: "Dashboard", link: "/admin/dashboard", icon: <DashboardIcon /> },
  { nombre: "Gestión de Usuarios", link: "/admin/usuarios", icon: <UsersIcon /> },
  { nombre: "Gestión de Roles", link: "/admin/roles", icon: <RolesIcon /> },
  { nombre: "Gestión de Comercios", link: "/admin/comercios", icon: <CommerceIcon /> },
  {
    nombre: "Aprobación de Comercios",
    link: "/admin/solicitudes-comercios",
    icon: <ApprovalIcon />,
  },
  { nombre: "Informes y Estadísticas", link: "/admin/estadisticas", icon: <ReportsIcon /> },
  { nombre: "Notificaciones", link: "/admin/notificaciones", icon: <NotificationsIcon /> },
  { nombre: "Configuración del Sistema", link: "/admin/configuracion", icon: <SettingsIcon /> },
]

const Sidebar = ({ open }: { open: boolean }) => {
  return (
    <div
      style={{
        width: open ? 240 : 80,
        overflow: "hidden",
        transition: "width 0.3s",
        background: "#f0f0f0",
      }}
    >
      <List>
        {panelOptions.map((option) => (
          <ListItem
            component={NavLink}
            to={option.link}
            key={option.link}
            sx={{
              color: "gray",
              padding: "10px 20px",
              "&.active": {
                color: "orange",
                borderLeft: "4px solid orange",
              },
              "&:hover": {
                color: "orange",
              },
            }}
            className="list-item"
            style={{
              height: "4rem",
            }}
          >
            {option.icon}
            {open && <ListItemText primary={option.nombre} style={{ marginLeft: 16 }} />}{" "}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Sidebar
