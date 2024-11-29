import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { Add } from "@mui/icons-material"
import Container from "../components/Container"
import Button from "../components/Button/Button"
import useFetch from "../hooks/useFetch"
import TableBox from "../components/Table/TableBox"

interface Material {
  material_id: string
  nombre_material: string
  volumen: number
  puntos: number
  new?: boolean
}

const ConfiguracionVolumenes = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [showPoints, setShowPoints] = useState(false)
  const { data, loading, error } = useFetch("materiales")
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    if (data?.materiales) {
      setMaterials(data.materiales)
    }
  }, [data])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      material_id: (materials.length + 1).toString(),
      nombre_material: `Material ${materials.length + 1}`,
      volumen: 0,
      puntos: 0,
      new: true,
    }
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial])
  }

  const handleSaveChanges = () => {
    // Simulación de guardar cambios en los materiales
    console.log("Cambios guardados")
  }

  if (loading) return <Typography>Cargando datos...</Typography>
  if (error) return <Typography>Error al cargar los datos</Typography>

  return (
    <Container title="Configuración de Volúmenes y Puntos por Material Reciclado">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: "1rem",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            background: "#F9F9FB",
            height: "4.5rem",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
            boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
            borderRadius: "1rem",
            border: "0.6px solid #D5D5D5",
            "& .MuiTabs-scroller": {
              overflowX: { xs: "scroll!important", sm: "hidden!important" },
            },
          }}
        >
          <Tab
            label="Vecino"
            sx={{
              width: "10rem",
            }}
          />
          <Tab label="Comercio" sx={{ width: "10rem" }} />
          <Tab label="Turista" sx={{ width: "10rem" }} />
        </Tabs>
        <Button variant="outlined" startIcon={<Add />} onClick={handleAddMaterial}>
          Crear Nuevo Material
        </Button>
      </Box>

      <TableBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material</TableCell>
                <TableCell>Litros por Recipiente</TableCell>
                <TableCell>Puntos por Litro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials?.map((material) => (
                <TableRow key={material.material_id}>
                  <TableCell>
                    {material.new ? (
                      <TextField defaultValue={material.nombre_material} type="text" />
                    ) : (
                      material.nombre_material
                    )}
                  </TableCell>

                  <TableCell>
                    <TextField defaultValue={material.volumen} type="number" />
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={material.puntos} type="number" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableBox>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", sm: "space-between" },
          marginTop: "2rem",
        }}
      >
        <Box>
          <Typography variant="h3">Habilitar/Deshabilitar Puntos en App del Turista</Typography>
          <FormControlLabel
            control={
              <Checkbox checked={showPoints} onChange={(e) => setShowPoints(e.target.checked)} />
            }
            label="Mostrar puntos en la App del Turista"
          />
        </Box>
        <Button
          variant="contained"
          sx={{ background: "#F48F007d", alignSelf: { xs: "center", sm: "unset" } }}
          onClick={handleSaveChanges}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Container>
  )
}

export default ConfiguracionVolumenes
