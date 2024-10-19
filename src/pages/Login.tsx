import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Button, Container, Typography, Box } from "@mui/material"

const Login = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Iniciar Sesión</Typography>
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2 }}>
          Iniciar Sesión con Auth0
        </Button>
      </Box>
    </Container>
  )
}

export default Login
