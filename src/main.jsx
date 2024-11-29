import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import theme from "./theme"
import { ThemeProvider } from "@mui/material/styles"

import "./index.css"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
