import React, { useState, useEffect, useCallback } from "react"
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button as MuiButton,
  Dialog,
} from "@mui/material"
import Container from "../components/Container"
import useFetch from "../hooks/useFetch"
import TableBox from "../components/Table/TableBox"
import Button from "../components/Button/Button"
import { useTheme } from "@emotion/react"
import CentrosForm from "../components/Centros/CentrosForm"

export interface CentroReciclado {
  centroId: string
  nombreCentro: string
  direccion: string
  nombreEncargado: string[]
  telefonoEncargado: string
}

const GestionCentrosReciclaje = () => {
  const { data, loading, error } = useFetch("centros")
  const [centros, setCentros] = useState<CentroReciclado[]>([])
  const [filteredCentros, setFilteredCentros] = useState<CentroReciclado[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [currentCentro, setCurrentCentro] = useState<CentroReciclado | null>(null)

  const { palette } = useTheme()

  // Fetch data and filter based on search term
  useEffect(() => {
    if (data?.centros) {
      setCentros(data.centros)
      setFilteredCentros(data.centros) // Initial filter state
    }
  }, [data])

  // Callback for filtering
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setSearch(value)
      const filtered = centros.filter((centro) =>
        centro.nombreCentro.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCentros(filtered)
    },
    [centros]
  )

  const handleOpenModal = (centro?: CentroReciclado) => {
    setCurrentCentro(centro || null) // Set centro if editing, or null for creating
    setIsModalOpen(!isModalOpen)
  }

  const handleNuevoCentro = (data: CentroReciclado) => {
    console.log("Nuevo centro", data)
  }

  if (loading) return <Typography>Cargando centros...</Typography>
  if (error) return <Typography>Error al cargar los centros.</Typography>
  console.log({ filteredCentros })
  return (
    <Container title="Gestión de Centros de Reciclaje">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: "1rem",
        }}
      >
        <Box
          display="flex"
          gap="2rem"
          sx={{
            background: "#F9F9FB",
            height: "4.5rem",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
            boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
            borderRadius: "1rem",
            border: "0.6px solid #D5D5D5",
            width: "45rem",
          }}
        >
          <TextField
            sx={{
              width: "100%",
              "& .MuiInputBase-formControl": {
                borderRadius: "10rem",
              },
            }}
            label="Buscar por Nombre"
            name="nombreCentro"
            value={search}
            onChange={handleSearchChange}
          />
        </Box>
        <Button
          variant="contained"
          sx={{ background: palette.primary["500"] }}
          onClick={() => handleOpenModal()}
        >
          Nuevo Centro
        </Button>
      </Box>

      <TableBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del Centro</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Encargado</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCentros.map((centro) => (
                <TableRow key={centro.centroId}>
                  <TableCell>{centro.nombreCentro}</TableCell>
                  <TableCell>{centro.direccion}</TableCell>
                  {centro.nombreEncargado?.length > 0 &&
                    centro.nombreEncargado?.map((encargado) => (
                      <TableCell key={encargado}>{encargado}</TableCell>
                    ))}
                  <TableCell>{centro.telefonoEncargado}</TableCell>
                  <TableCell align="center">
                    <MuiButton
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenModal(centro)}
                    >
                      Editar
                    </MuiButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableBox>

      <Dialog
        open={isModalOpen}
        onClose={() => handleOpenModal()}
        sx={{
          "& .MuiDialog-paper": {
            background: "#F2F2F2",
            width: "80vw",
            height: "75vh",
            maxHeight: "45rem",
            maxWidth: "100rem",
            borderRadius: "0.875rem",
            padding: { xs: "1rem", sm: "2rem 4rem" },
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
          {currentCentro ? "Editar Centro" : "Nuevo Centro"}
        </Typography>
        <CentrosForm
          onSubmit={handleNuevoCentro}
          onClose={() => handleOpenModal()}
          edtiData={currentCentro}
        />
      </Dialog>
    </Container>
  )
}

export default GestionCentrosReciclaje
