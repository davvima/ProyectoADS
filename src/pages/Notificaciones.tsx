import React, { useState } from "react"
import { Box, Dialog, Typography } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Calendar from "../components/Notificaciones/Calendar"
import Container from "../components/Container"
import Button from "../components/Button/Button"
import NotificationList from "../components/Notificaciones/NotificationList"
import useFetch from "../hooks/useFetch"
import dayjs from "dayjs"
import NotificationForm from "../components/Notificaciones/NotificationForm"

dayjs.locale("es")

const Notificaciones: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: notificaciones, loading, error } = useFetch("notificaciones")

  const handleAddNotification = (notification) => {
    console.log("Nueva notificación", notification)
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container title="Envío de Notificaciones">
        <Box
          height="100vh"
          justifyContent="space-between"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "2rem",
            height: { xs: "100%", sm: "100vh" },
          }}
        >
          <Box
            flex="auto"
            sx={{
              background: "white",
              borderRadius: "1rem",
              border: "0.3px solid #e4e4e4",
              maxWidth: { xs: "unset", sm: "30%" },
            }}
          >
            <Box
              sx={{
                overflowY: "auto",
                padding: "1.5rem",
                height: "100%",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: "#F48F007d",
                  maxWidth: "80%",
                  height: "3rem",
                  display: "flex",
                  justifySelf: "center",
                }}
                onClick={handleOpenModal}
              >
                Nueva Notificación
              </Button>
              <NotificationList
                notifications={notificaciones}
                onDelete={() => console.log("delete notification")}
                onEdit={() => console.log("onEdit notification")}
              />
            </Box>
          </Box>
          <Box
            flex="1"
            height="100%"
            maxWidth="60rem"
            overflow="scroll"
            sx={{
              display: { xs: "none", sm: "flex" },
              borderRadius: "0.875rem",
              border: "0.3px solid #e4e4e4",
              background: "#FFF",
              padding: "1rem 2rem",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
              "& .MuiDateCalendar-root": {
                margin: "0",
                width: "100%",
                "& .MuiDayCalendar-header": {
                  justifyContent: "space-between",
                },
                "& .MuiDayCalendar-weekContainer": {
                  justifyContent: "space-between",
                },
                "& .css-1pv2de5-MuiDayCalendar-weekContainer": {
                  margin: "0",
                },
                "& .MuiDayCalendar-monthContainer": {
                  border: "0.15px solid #e4e4e4",
                },
                "& .MuiBadge-root": {
                  border: "0.15px solid #e4e4e4",
                  justifyContent: "end",
                  fontWeight: "700",
                  position: "relative",
                },
                "& .MuiBadge-root button": {
                  fontWeight: "700",
                  fontSize: "1rem",
                },
                "& .MuiPickersCalendarHeader-root": {
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                },
                "& .MuiPickersCalendarHeader-labelContainer": {
                  position: "absolute",
                  fontSize: "1.5rem",
                  top: "0",
                },
                "& .MuiPickersArrowSwitcher-root": {
                  width: "60%",
                  maxWidth: "300px",
                  justifyContent: "space-between",
                },
              },
            }}
          >
            <Calendar notifications={notificaciones} />
          </Box>
        </Box>
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{
            "& .MuiDialog-paper": {
              background: "#F2F2F2",
              width: "80vw",
              height: "70vh",
              maxHeight: "40rem",
              maxWidth: "100rem",
              borderRadius: "0.875rem",
              padding: { xs: "1rem", sm: "2rem 4rem" },
            },
          }}
        >
          <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
            Nueva Notificación
          </Typography>
          <NotificationForm onSubmit={handleAddNotification} onClose={handleCloseModal} />
        </Dialog>
      </Container>
    </LocalizationProvider>
  )
}

export default Notificaciones
