import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import theme from "./theme"
import { ThemeProvider } from "@mui/material/styles"
import { Auth0Provider } from "@auth0/auth0-react"

import "./index.css"
import { BrowserRouter } from "react-router-dom"

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin + "/admin" }}
  >
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Auth0Provider>
)
