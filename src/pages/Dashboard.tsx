import React from "react"
import { Typography, Card, CardContent, Box, CircularProgress, Alert } from "@mui/material"
import useFetch from "../hooks/useFetch"

const Dashboard = () => {
  const { data, loading, error } = useFetch("dashboardData")

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Panel de Administración
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ margin: "20px -10px" }} // Margen negativo para compensar el margen en los Card
      >
        {data?.panelOptions.map((option: { nombre: string; link: string }) => (
          <Box key={option.nombre} p={1} sx={{ justifyContent: "space-around" }}>
            <a href={option.link}>
              <Card
                sx={{
                  boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
                  borderRadius: "0.875rem",
                  width: "24rem",
                  height: "13.875rem",
                  padding: "1.5rem",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: " 1.75rem",
                      fontWeight: "700",
                      letterSpacing: "0.0625rem",
                    }}
                    variant="h5"
                  >
                    {option.nombre}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default Dashboard
