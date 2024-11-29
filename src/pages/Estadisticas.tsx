import React from "react"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import { DeleteSweep, Group, KeyboardArrowRight, Landscape, Store } from "@mui/icons-material"
import Container from "../components/Container"
import useFetch from "../hooks/useFetch"
import CardEstadisticas from "../components/Estadisticas/CardEstadisticas"
import CardGrafica from "../components/Estadisticas/CardGrafica"
import { Link } from "react-router-dom"

const Estadisticas = () => {
  const { palette } = useTheme()
  const { data: estadisticas, loading, error } = useFetch("estadisticas")
  const isMobile = window.innerWidth <= 768

  console.log({ estadisticas })
  const residuosPorTipo = estadisticas?.data?.["residuos_por_tipo"]
  const comerciosPorestado = estadisticas?.data?.["comercios_por_estado"]

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <Container title="Informes y estadísticas">
      <Box display="flex" flexDirection="column" gap={4}>
        <Link to="/admin/informes">
          <Box
            sx={{
              boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.875rem",
              height: "4rem",
              minWidth: "18rem",
              display: "flex",
              alignItems: "center",
              flex: "1",
              justifyContent: "space-between",
              padding: "1.5rem",
              background: palette.primary["600"],
            }}
          >
            <Typography
              sx={{
                color: "#202224",
                fontSize: " 1rem",
                fontWeight: "600",
                maxWidth: "232px",
              }}
              variant="h4"
            >
              Generar Informes
            </Typography>
            <KeyboardArrowRight />
          </Box>
        </Link>

        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
          <CardEstadisticas
            titulo="Residuos Recolectados"
            valor={estadisticas.data.residuos_total_recolectados}
            color={palette.primary.main}
            icono={<DeleteSweep sx={{ fontSize: 40 }} />}
          />
          <CardEstadisticas
            titulo="Recolectores Activos"
            valor={estadisticas.data.recolectores_activos}
            color={palette.customColors.blue}
            icono={<Group sx={{ fontSize: 40 }} />}
          />
          <CardEstadisticas
            titulo="Comercios Registrados"
            valor={estadisticas.data.comercios_registrados}
            color={palette.secondary.main}
            icono={<Store sx={{ fontSize: 40 }} />}
          />
          <CardEstadisticas
            titulo="Atracciones Publicadas"
            valor={estadisticas.data.atracciones_publicadas}
            color={palette.customColors.red}
            icono={<Landscape sx={{ fontSize: 40 }} />}
          />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={2}>
          {/* Gráfico de residuos por tipo */}
          <CardGrafica
            titulo="Residuos por Tipo"
            data={[
              { id: 0, value: residuosPorTipo["PET"], label: isMobile ? undefined : "Pet" },
              { id: 1, value: residuosPorTipo["Vidrio"], label: isMobile ? undefined : "Vidrio" },
              {
                id: 2,
                value: residuosPorTipo["Aluminio"],
                label: isMobile ? undefined : "Aluminio",
              },
            ]}
          />

          {/* Gráfico de comercios por estado */}
          <CardGrafica
            titulo="Comercios por Estado"
            data={[
              {
                id: 0,
                value: comerciosPorestado?.pendientes,
                label: isMobile ? undefined : "Pendientes",
              },
              {
                id: 1,
                value: comerciosPorestado?.aprobados,
                label: isMobile ? undefined : "Aprobados",
              },
              {
                id: 2,
                value: comerciosPorestado?.rechazados,
                label: isMobile ? undefined : "Rechazados",
              },
            ]}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Estadisticas
