import React from "react"
import { Typography, Box } from "@mui/material"
import image from "../../assets/day66travel.png"
import Button from "../../components/Button/Button"
import Logo from "../../components/Logo"
import "../../components/Auth/login.css"
import { useNavigate } from "react-router-dom"

const LoginAdmin = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate("/admin/dashboard")
  }
  return (
    <Box
      height="80%"
      width="80%"
      display="flex"
      flexDirection="row"
      margin="4rem auto"
      className="loginContainer"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", sm: "40%" },
          height: "100%",
          gap: "3rem",
          justifyContent: "start",
          alignItems: "start",
          padding: { xs: "2rem", sm: "5rem 2.5rem" },
        }}
      >
        <Logo width="9rem" />
        <Typography variant="body1" textAlign="left">
          Te damos la bienvenida, por favor inicia sesión para continuar.
        </Typography>
        <Box>
          <Button onClick={handleLogin} width="12rem" sx={{ background: "#F48F007d" }}>
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="60%"
        height="100%"
        sx={{ background: "#F5DBC4", display: { xs: "none", sm: "flex" } }}
      >
        <img width="60%" src={image} alt="" />
      </Box>
    </Box>
  )
}

export default LoginAdmin
