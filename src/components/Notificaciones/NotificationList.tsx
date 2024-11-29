// src/components/NotificationList.tsx
import React from "react"
import { List, ListItem, ListItemText, IconButton, Box, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

interface Notification {
  notificacionId: number
  fechaEnvio: string
  estado: string
  titulo: string
}

interface NotificationListProps {
  notifications: Notification[]
  onDelete: (id: number) => void
  onEdit: (notification: Notification) => void
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onDelete, onEdit }) => {
  return (
    <Box>
      <Typography variant="h4" margin="2rem 0">
        Notificaciones programadas
      </Typography>
      <List>
        {notifications.map((notification) => {
          const date = new Date(notification.fechaEnvio)
          return (
            <ListItem
              sx={{
                padding: "0",
              }}
              key={notification.notificacionId}
              // secondaryAction={
              //   <>
              //     <IconButton edge="end" onClick={() => onEdit(notification)}>
              //       <EditIcon />
              //     </IconButton>
              //     <IconButton edge="end" onClick={() => onDelete(notification.notificacionId)}>
              //       <DeleteIcon />
              //     </IconButton>
              //   </>
              // }
            >
              <Box display="flex" flexDirection="column">
                <ListItemText
                  primary={notification.titulo}
                  secondary={`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`}
                  title="hola"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    width: "100%",
                  }}
                />
                <ListItemText
                  secondary={`${notification.estado.toLocaleUpperCase()}`}
                  title="hola"
                />
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default NotificationList
