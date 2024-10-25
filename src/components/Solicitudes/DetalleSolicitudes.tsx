import React from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import useFetch from "../../hooks/useFetch"
import Container from "../Container"
import Carrusel from "../Carrusel/Carrusel"
import { timelineItemClasses } from "@mui/lab/TimelineItem"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab"

const DetalleSolicitudes = () => {
  const { solicitudId } = useParams()
  const theme = useTheme()
  const { data: solicitud, loading, error } = useFetch(`detalleSolicitud`)

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  const {
    nombreComercio,
    razonSocial,
    cuit,
    direccion,
    link_google_maps,
    link_whatsapp,
    fotos,
    descripcion,
  } = solicitud.data

  return (
    <Container title="Detalles de solicitud">
      <Box display="flex" flexDirection="row" gap="2rem" borderRadius="1rem">
        <Box
          flex="2"
          padding="1.5rem"
          borderRadius="2rem"
          sx={{ background: theme.palette.common.white }}
        >
          <Carrusel images={fotos} />
          <Box my={4}>
            <TableContainer>
              <TableBody sx={{ width: "100%", display: "inline-table" }}>
                <TableRow>
                  <TableCell>
                    <strong>Nombre Comercio</strong>
                  </TableCell>
                  <TableCell>{nombreComercio}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Razón Social</strong>
                  </TableCell>
                  <TableCell>{razonSocial}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>CUIT</strong>
                  </TableCell>
                  <TableCell>{cuit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Dirección</strong>
                  </TableCell>
                  <TableCell>{direccion}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Google Maps</strong>
                  </TableCell>
                  <TableCell>{link_google_maps}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Whatsapp</strong>
                  </TableCell>
                  <TableCell>{link_whatsapp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Descripción</strong>
                  </TableCell>
                  <TableCell>{descripcion}</TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
          </Box>
        </Box>

        <Box
          flex="1"
          padding="1.5rem"
          borderRadius="2rem"
          sx={{ background: theme.palette.common.white }}
        >
          <Typography variant="h6">Historial de la solicitud</Typography>
          <Divider sx={{ mb: 2 }} />

          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {[
              { evento: "Solicitud recibida", fecha: "23-09-2024 19:02" },
              {
                evento: "Se debe completar la descripción del lugar con más detalles.",
                fecha: "Modificada por: Admin",
              },
              { evento: "Solicitud rechazada", fecha: "23-09-2024 19:02" },
              { evento: "Solicitud actualizada por el comercio", fecha: "23-09-2024 19:02" },
              { evento: "Solicitud aprobada", fecha: "23-09-2024 19:02" },
            ].map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: theme.palette.primary.main }} />
                  {index < 4 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="body1" fontWeight="bold">
                    {item.evento}
                  </Typography>
                  <Typography variant="body2">{item.fecha}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="text" color="error">
              Rechazar solicitud
            </Button>
            <Button
              variant="contained"
              sx={{
                background: theme.palette.primary["500"],
                fontWeight: "500",
                borderRadius: "10rem",
                padding: "1rem",
              }}
            >
              Aprobar solicitud
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default DetalleSolicitudes
