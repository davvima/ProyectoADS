import React, { useState } from "react"
import Container from "../components/Container"
import {
  Box,
  TextField,
  Button as ButtonMUI,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import useFetch from "../hooks/useFetch"
import Button from "../components/Button/Button"

const Videos = () => {
  const theme = useTheme()
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const { data } = useFetch("videos")

  const handleAddVideo = () => {
    console.log("Video añadido:", { title, url })
    setTitle("")
    setUrl("")
  }

  const handleMarkAsMain = (id: number) => {
    console.log("Marcar como principal:", id)
  }

  const handleDeleteVideo = (id: number) => {
    console.log("Eliminar video:", id)
  }

  return (
    <Container title="Gestión de Videos">
      <Box
        display="flex"
        flexWrap="wrap"
        gap="1.5rem"
        padding="1.5rem"
        borderRadius="0.875rem"
        sx={{ background: theme.palette.common.white }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "70%" }}>
          <TextField
            label="Título del Video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="URL de Inserción"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="center" mt={2} flexGrow="1" maxWidth="20rem">
          <Button
            variant="contained"
            sx={{ background: theme.palette.primary["500"], width: "100%" }}
          >
            Agregar Video
          </Button>
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" gap="1.5rem" mt={4}>
        {data?.videos?.map(
          (video: {
            id: number
            titulo: string
            codigo_insercion: string
            es_principal: boolean
          }) => (
            <Card
              key={video.id}
              sx={{ width: "100%", maxWidth: "320px", borderRadius: "0.875rem" }}
            >
              <CardMedia
                component="iframe"
                src={video.codigo_insercion}
                title={video.titulo}
                sx={{ height: "19rem", width: "100%", aspectRatio: "1 / 1" }}
              />
              <CardContent
                sx={{
                  background: video["es_principal"] ? theme.palette.primary["500"] : "none",
                  padding: "1.6rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3.5rem",
                }}
              >
                <Typography variant="h4">{video.titulo}</Typography>
                <CardActions sx={{ justifyContent: "space-evenly" }}>
                  <ButtonMUI
                    variant="contained"
                    size="small"
                    sx={{ textTransform: "unset", borderRadius: "0.75rem" }}
                    color="inherit"
                    onClick={() => handleMarkAsMain(video.id)}
                  >
                    Marcar como Principal
                  </ButtonMUI>
                  <ButtonMUI
                    size="small"
                    color="warning"
                    sx={{ textTransform: "unset" }}
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    Eliminar
                  </ButtonMUI>
                </CardActions>
              </CardContent>
            </Card>
          )
        )}
      </Box>
    </Container>
  )
}

export default Videos
