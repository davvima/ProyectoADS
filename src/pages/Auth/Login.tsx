import React, { useState } from "react"
import { Typography, Box, TextField, Link, CircularProgress } from "@mui/material"
import Button from "../../components/Button/Button"
import Logo from "../../components/Logo"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import "../../components/Auth/login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("email")
    const storedPassword = localStorage.getItem("password")
    if (!storedEmail || !storedPassword) {
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
    }
    navigate("/registro-comercio")
  }

  const handleRegister = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRegisterSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
      setLoading(false)
      setSuccess(true)
    }, 2000)
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
          gap: "2rem",
          justifyContent: "start",
          alignItems: "start",
          padding: { xs: "2rem", sm: "5rem 2.5rem" },
        }}
      >
        <Logo width="9rem" />
        <Typography variant="h2" textAlign="left" fontWeight="400">
          Alta de comercio
        </Typography>
        <Typography variant="body1" textAlign="left">
          Te damos la bienvenida, por favor inicia sesión para continuar.
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box>
          <Button onClick={handleLogin} width="12rem" sx={{ background: "#F48F007d" }}>
            Iniciar Sesión
          </Button>
        </Box>
        <Typography variant="body2">
          ¿No tienes una cuenta?{" "}
          <Link component="button" onClick={handleRegister}>
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="60%"
        height="100%"
        sx={{ background: "#F5DBC4", display: { xs: "none", sm: "flex" } }}
      >
        <img width="60%" src="path_to_image" alt="" />
      </Box>

      {/* Modal de Registro */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ minWidth: "50vw", width: "100%", maxWidth: "95vw" }}
      >
        {success ? (
          <Box
            sx={{
              minWidth: "600px",
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Typography variant="h3">Registrado Exitosamente</Typography>
            <Button
              onClick={() => navigate("/registro-comercio")}
              width="10rem"
              sx={{ background: "#F48F007d", alignSelf: "center" }}
            >
              Continuar
            </Button>
          </Box>
        ) : (
          <>
            <DialogTitle>Registro</DialogTitle>
            <DialogContent sx={{ minWidth: "600px" }}>
              <Typography variant="h6" mb={2}>
                Regístrate para continuar
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Repetir Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="secondary">
                Cancelar
              </Button>
              <Button
                onClick={handleRegisterSubmit}
                variant="contained"
                sx={{ background: "#F48F007d" }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Registrarse"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default Login
