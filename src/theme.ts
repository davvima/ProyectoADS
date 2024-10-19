// src/theme.js
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9500",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",

    h1: {
      color: "#202224",
      fontSize: "2rem",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
    },
    h4: {
      color: "#202224",
      fontSize: "1.25rem",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
    },
  },
})

export default theme
