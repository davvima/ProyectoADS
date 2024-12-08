import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Typography,
  Alert,
  Divider,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
  Snackbar,
} from "@mui/material"
import Button from "../Button/Button"
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
import CircularLoading from "../Utils/CircularLoading"
import { ArrowBack } from "@mui/icons-material"
import StateCell from "../Table/Statecell"

const DetalleSolicitudes = () => {
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState("")
  const [comment, setComment] = useState("")
  const [success, setSuccess] = useState(false)

  const { data: solicitud, loading, error, execute } = useFetch()
  const navigate = useNavigate()
  const { solicitudId } = useParams()
  const theme = useTheme()

  useEffect(() => {
    if (solicitudId) {
      execute(`/Tur_comercio/getByPk?cuit=${solicitudId}`, "GET")
    }
  }, [solicitudId])

  const handleOpenModal = (type) => {
    setActionType(type)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setComment("")
  }

  const handleConfirmAction = async (event) => {
    const { target } = event
    console.log({ actionType, target })
    const mensaje = "Este es un mensaje de ejemplo con caracteres especiales como #, &, %, etc."
    const mensajeEncoded = encodeURIComponent(mensaje)
    const estado = actionType === "aprobar" ? "Aprobado" : "Rechazado"
    console.log({ mensaje, mensajeEncoded, estado })
    try {
      await execute(
        `/Tur_comercio/CambioEstado?cuit=${solicitudId}&estado=${estado}&mensaje=${mensajeEncoded}`,
        "POST"
      )
    } catch (error) {
      console.error("Error al cambiar el estado de la solicitud:", error)
    } finally {
      setSuccess(true)
      handleCloseModal()
      setTimeout(() => {
        setSuccess(false)
      }, 6000)
    }
  }

  if (loading) return <CircularLoading />

  const {
    nombre_fantacia = "",
    razon_social = "",
    cuit = "",
    direccion = "",
    codigo_insercion_maps = "",
    whatsapp = "",
    images = "",
    descripcion = "",
  } = solicitud || {}
  let imageArray
  try {
    if (images) {
      imageArray = JSON.parse(images)
    }
  } catch (error) {
    imageArray = []
    console.error("Error al parsear la prop 'images':", error)
  }

  return (
    <Container title="Detalles de solicitud">
      <Box>
        <Button
          variant="text"
          onClick={() => navigate(`/admin/solicitudes-comercios`)}
          sx={{
            color: theme.palette.primary.main,
            justifyContent: "end",
            border: "none",
            height: "2rem",
            width: { xs: "100%", sm: "unset" },
            maxWidth: "unset",
            placeContent: { xs: "center", sm: "unset" },
            ":focus": {
              background: "none",
              outline: "none",
            },
            ":hover": {
              background: "none",
              textDecoration: "underline",
            },
          }}
        >
          <ArrowBack /> Volver atrás
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: "1rem",
          }}
        >
          <Box
            flex="2"
            padding="1.5rem"
            borderRadius="2rem"
            sx={{ maxWidth: "95vw", width: "70%", background: theme.palette.common.white }}
          >
            {Array.isArray(imageArray) && imageArray?.length > 0 && (
              <Carrusel images={imageArray} />
            )}
            <Box my={4}>
              {solicitud ? (
                <TableContainer>
                  <TableBody sx={{ width: "100%", display: "inline-table" }}>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>Nombre Comercio</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>
                        {nombre_fantacia}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>Razón Social</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>
                        {razon_social}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>CUIT</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>{cuit}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>Dirección</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>
                        {direccion}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>Google Maps</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>
                        {codigo_insercion_maps}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>Whatsapp</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>
                        {whatsapp}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "fit-content", whiteSpace: "pre" }}>
                        <strong>Descripción</strong>
                      </TableCell>
                      <TableCell sx={{ width: "100%", wordBreak: "break-all" }}>
                        {descripcion}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No hay datos para esta solicitud.
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            flexDirection="column"
            justifyContent="space-between"
            padding="1.5rem"
            borderRadius="2rem"
            sx={{
              display: "flex",
              flex: "1",
              maxWidth: "30rem",
              width: "30%",
              background: theme.palette.common.white,
            }}
          >
            <Box>
              {/* <Typography variant="h6">Historial de la solicitud</Typography> */}
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                Estado Actual <StateCell estado={solicitud?.estado} sx={{ border: "none" }} />
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                {[{ evento: "Solicitud recibida", fecha: "05-12-2024 19:02" }].map(
                  (item, index) => (
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
                  )
                )}
              </Timeline> */}
            </Box>
            <Box sx={{ height: "100%" }}>
              {/* <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                <strong>Estado Actual:</strong>{" "}
                <StateCell estado={solicitud?.estado} sx={{ border: "none" }} />
              </Typography> */}

              <Box mt={4} display="flex" justifyContent="space-between">
                <Button
                  variant="text"
                  onClick={() => handleOpenModal("rechazar")}
                  disabled={solicitud?.estado === "Rechazado"}
                >
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
                  onClick={() => handleOpenModal("aprobar")}
                  disabled={solicitud?.estado === "Aprobado"}
                >
                  Aprobar solicitud
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleCloseModal}
        sx={{
          "& .MuiDialog-paper": {
            width: { xs: "80vw", sm: "60vw" },
            maxWidth: "none",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          {!loading && actionType === "aprobar" ? "Aprobar Solicitud" : "Rechazar Solicitud"}
        </DialogTitle>
        <DialogContent sx={{ background: "none" }}>
          <DialogContentText sx={{ textAlign: "center", marginBottom: "1rem" }}>
            {actionType === "aprobar"
              ? "Confirma que deseas aprobar esta solicitud."
              : "Indica la razón del rechazo."}
          </DialogContentText>
          {actionType !== "aprobar" && (
            <TextareaAutosize
              minRows={4}
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                boxSizing: "border-box",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "1rem",
                fontSize: "1rem",
                resize: "none",
                background: "none",
                color: "black",
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: "1rem", padding: "1rem" }}>
          <Button variant="text" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ background: theme.palette.primary["500"] }}
            onClick={handleConfirmAction}
          >
            {loading ? <CircularLoading /> : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={success ? "success" : "error"}>
          {error
            ? `Error al ${actionType} la solicitud`
            : success
              ? `La solicitud ha sido ${actionType === "aprobar" ? "aprobada" : "rechazada"} exitosamente.`
              : ""}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default DetalleSolicitudes
