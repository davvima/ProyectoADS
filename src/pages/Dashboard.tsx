import React from "react"
import {
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material"
import { Link } from "react-router-dom" // Importa Link
import useFetch from "../hooks/useFetch"
import "../components/Dashboard/dashboard.css"
import {
  People,
  Group,
  Store,
  Assignment,
  BarChart,
  Notifications,
  Settings,
} from "@mui/icons-material"
import Container from "../components/Container"

const Dashboard = () => {
  const { data, loading, error } = useFetch("dashboardData")
  const { palette } = useTheme()

  const iconMap = {
    "Gestión de Usuarios": { icon: <People sx={{ fontSize: 40 }} />, color: palette.primary.main },
    "Gestión de Roles": { icon: <Group sx={{ fontSize: 40 }} />, color: palette.customColors.blue },
    "Gestión de Comercios": {
      icon: <Store sx={{ fontSize: 40 }} />,
      color: palette.customColors.yellow,
    },
    "Aprobación de Comercios": {
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: palette.customColors.red,
    },
    "Informes y Estadísticas": {
      icon: <BarChart sx={{ fontSize: 40 }} />,
      color: palette.secondary.main,
    },
    Notificaciones: { icon: <Notifications sx={{ fontSize: 40 }} />, color: palette.primary.main },
    "Configuración del Sistema": {
      icon: <Settings sx={{ fontSize: 40 }} />,
      color: palette.customColors.blue,
    },
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Container title="Panel de Administración">
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" rowGap="3rem">
        {data?.data?.panelOptions.map((option: { nombre: string; link: string }) => (
          <Box
            key={option.nombre}
            width="30%"
            minWidth="24rem"
            maxWidth="40rem"
            sx={{ justifyContent: "space-around" }}
          >
            <Link to={option.link} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
                  borderRadius: "0.875rem",
                  height: "13.875rem",
                  padding: "1.5rem",
                }}
              >
                <CardContent sx={{ padding: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: " 1.75rem",
                        fontWeight: "700",
                        letterSpacing: "0.0625rem",
                        maxWidth: "232px",
                      }}
                      variant="h5"
                    >
                      {option.nombre}
                    </Typography>
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        background: iconMap[option.nombre].color + "50",
                        color: iconMap[option.nombre].color,
                        borderRadius: "22px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {iconMap[option.nombre].icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default Dashboard
