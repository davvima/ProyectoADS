// src/theme.js
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".container": {
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
          padding: "3rem",
          maxWidth: "1900px",
          margin: "auto",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#F48F00",
      "500": "#F48F0080",
    },
    secondary: {
      main: "#4AD991",
    },
    common: {
      white: "#fff",
    },
    info: {
      main: "#fff",
    },
    background: {
      default: "#F5F6FA",
    },
    customColors: {
      yellow: "#FEC53D",
      blue: "#9B9AFF",
      red: "#F73B00",
      orange: "#FF9500",
      green: "#008134",
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
