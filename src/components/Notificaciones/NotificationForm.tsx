import React, { useState } from "react"
import { Box, TextField } from "@mui/material"
import Button from "../Button/Button"
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

interface NotificationFormProps {
  onSubmit: (title: string, description: string, date: string | null) => void
  onClose: () => void
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateTime, setDateTime] = useState<string | null>(null)

  const handleSubmit = () => {
    onSubmit(title, description, date)
    onClose()
  }

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxHeight="25rem"
      margin="2rem 0"
      sx={{
        gap: { xs: "0.5rem", sm: "3rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
          gap: { xs: "1rem", sm: "2rem" },
        }}
      >
        <DateTimePicker
          label="Fecha y Hora"
          value={dayjs(dateTime)}
          onChange={(newValue) => setDateTime(newValue?.toString() || null)}
          sx={{
            background: "#fff",
            width: "100%",
            "& .MuiMultiSectionDigitalClockSection-root": {
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            },
          }}
        />
        <TextField
          label="Título de la Notificación"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ background: "#fff" }}
          fullWidth
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ background: "#fff" }}
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" sx={{ background: "#F48F007d" }} onClick={handleSubmit}>
          Enviar
        </Button>
      </Box>
    </Box>
  )
}

export default NotificationForm
