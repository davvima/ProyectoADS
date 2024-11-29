import { Box, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Button from "./Button/Button"
import { ArrowBack } from "@mui/icons-material"
import { useTheme } from "@emotion/react"
import { useLocation, useNavigate } from "react-router-dom"

const Container = ({ title, children }) => {
  const [activeBack, setActiveBack] = useState(false)
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log({ location })
    console.log(
      location?.pathname.includes("admin") &&
        !location?.pathname.includes("dashboard") &&
        !location?.pathname.includes("login")
    )
    if (
      location?.pathname.includes("admin") &&
      !location?.pathname.includes("dashboard") &&
      !location?.pathname.includes("login")
    ) {
      console.log("hago setactive true")
      setActiveBack(() => true)
    } else {
      setActiveBack(false)
    }
  }, [location])

  const handleClick = () => {
    navigate("/admin/dashboard")
  }
  console.log({ activeBack })
  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        <Typography variant="h1" gutterBottom sx={{ maxWidth: "45rem" }}>
          {title}
        </Typography>
        {activeBack && (
          <Button
            variant="text"
            onClick={handleClick}
            sx={{
              color: theme.palette.primary.main,
              justifyContent: "end",
              border: "none",
              height: "2rem",
              width: { xs: "100%", sm: "unset" },
              maxWidth: "unset",
              placeContent: { xs: "center", sm: "unset" },
              ":focus": {
                background: "none",
                outline: "none",
              },
              ":hover": {
                background: "none",
                textDecoration: "underline",
              },
            }}
          >
            <ArrowBack /> Volver al incio
          </Button>
        )}
      </Box>

      {children}
    </div>
  )
}

export default Container
