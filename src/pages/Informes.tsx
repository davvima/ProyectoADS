import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import Container from "../components/Container"
import Button from "../components/Button/Button"
import useFetch from "../hooks/useFetch"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import logoUrl from "../assets/logo.jpeg"

const Informes = () => {
  const [selectedReport, setSelectedReport] = useState({ value: "", label: "" })
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reportData, setReportData] = useState<any>(null)
  const [currentReport, setCurrentReport] = useState("")
  const { data, refetch } = useFetch("")
  const reportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReportData(data)
  }, [data])

  const handleGenerateReport = () => {
    setCurrentReport(selectedReport.value)
    refetch("informes")
  }

  const handleDownloadPDF = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      // Ajusta los márgenes
      const marginTop = 40
      const marginLeft = 10

      // Agrega el logo y encabezado
      pdf.addImage(logoUrl, "JPEG", marginLeft, 10, 30, 20) // Logo en la parte superior izquierda
      pdf.setFontSize(16)
      pdf.text(selectedReport.label, pdfWidth / 2, 20, { align: "center" })

      // Agrega el contenido con márgenes
      pdf.addImage(imgData, "PNG", marginLeft, marginTop, pdfWidth - 2 * marginLeft, pdfHeight)
      pdf.save(currentReport + ".pdf")
    }
  }

  const renderReportContent = () => {
    if (!reportData) return <Typography>No hay datos para mostrar</Typography>

    switch (currentReport) {
      case "trazabilidad":
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Circuito</TableCell>
                  <TableCell>Recolector</TableCell>
                  <TableCell>Volumen Recolectado</TableCell>
                  <TableCell>Puntos Visitados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.trazabilidad.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.circuito}</TableCell>
                    <TableCell>{item.recolector}</TableCell>
                    <TableCell>
                      {Object.entries(item.volumenRecolectado).map(([material, volumen]) => (
                        <Typography key={material}>{`${material}: ${volumen}`}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>{item.puntosVisitados}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )

      case "actividadRecolectores":
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Recolector</TableCell>
                  <TableCell>Puntos Visitados</TableCell>
                  <TableCell>Volumen Recolectado</TableCell>
                  <TableCell>Horario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.actividadRecolectores.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.recolector}</TableCell>
                    <TableCell>{item.puntosVisitados}</TableCell>
                    <TableCell>
                      {Object.entries(item.volumenRecolectado).map(([material, volumen]) => (
                        <Typography key={material}>{`${material}: ${volumen} L`}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>{`${item.horarioInicio} - ${item.horarioFin}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )

      case "cumplimientoComercios":
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Comercio</TableCell>
                  <TableCell>Volumen Separado</TableCell>
                  <TableCell>Faltas de Separación</TableCell>
                  <TableCell>Alertas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.cumplimientoComercios.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.comercio}</TableCell>
                    <TableCell>
                      {Object.entries(item.volumenSeparado).map(([material, volumen]) => (
                        <Typography key={material}>{`${material}: ${volumen} L`}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>{item.faltasSeparacion}</TableCell>
                    <TableCell>
                      {item.alertas?.map((alerta: string, i: number) => (
                        <Typography key={i} color="error">{`Alerta: ${alerta}`}</Typography>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )

      case "recepcionCentrosReciclado":
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Centro</TableCell>
                  <TableCell>Volumen Reportado</TableCell>
                  <TableCell>Volumen Validado</TableCell>
                  <TableCell>Discrepancias</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.recepcionCentrosReciclado.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.centro}</TableCell>
                    <TableCell>
                      {Object.entries(item.volumenReportado).map(([material, volumen]) => (
                        <Typography key={material}>{`${material}: ${volumen} L`}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>
                      {Object.entries(item.volumenValidado).map(([material, volumen]) => (
                        <Typography key={material}>{`${material}: ${volumen} L`}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.discrepancias?.map((discrepancia: string, i: number) => (
                        <Typography
                          key={i}
                          color="error"
                        >{`Discrepancia: ${discrepancia}`}</Typography>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )

      default:
        return (
          <Typography>
            Selecciona un tipo de informe y genera el reporte para ver los datos.
          </Typography>
        )
    }
  }

  return (
    <Container title="Generación de Informes">
      <Box
        sx={{
          background: "#F9F9FB",
          padding: { xs: "0.5rem", sm: "2rem" },
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          borderRadius: "1rem",
          width: "100%",
          boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box flex="1">
            <Typography variant="h5" mb={2}>
              Tipo de Informe
            </Typography>
            <RadioGroup
              value={selectedReport.value}
              onChange={(e) =>
                setSelectedReport({
                  value: e.target.value,
                  label: e.target?.labels?.[0].innerText ?? "",
                })
              }
              sx={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}
            >
              <FormControlLabel
                value="trazabilidad"
                control={<Radio />}
                label="Informe de Trazabilidad"
              />
              <FormControlLabel
                value="actividadRecolectores"
                control={<Radio />}
                label="Informe de Actividad de Recolectores"
              />
              <FormControlLabel
                value="cumplimientoComercios"
                control={<Radio />}
                label="Informe de Cumplimiento de Comercios"
              />
              <FormControlLabel
                value="recepcionCentrosReciclado"
                control={<Radio />}
                label="Informe de Recepción en Centro"
              />
            </RadioGroup>
          </Box>

          <Box flex="1">
            <Typography variant="h5" mb={2}>
              Rango de Fechas
            </Typography>
            <TextField
              label="Fecha Inicio"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: "0.5rem" }}
            />
            <TextField
              label="Fecha Fin"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: "1rem" }}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" width="100%">
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            sx={{ alignSelf: "center", height: "3.25rem", background: "#F48F007d" }}
          >
            Generar Informe
          </Button>

          {currentReport && (
            <Button
              variant="contained"
              onClick={handleDownloadPDF}
              sx={{ alignSelf: "center", height: "3.25rem", background: "#F48F007d", mt: 2 }}
            >
              Descargar PDF
            </Button>
          )}
        </Box>
      </Box>

      <Box ref={reportRef}>{renderReportContent()}</Box>
    </Container>
  )
}

export default Informes
