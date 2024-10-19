import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Cargando...</div> // O un spinner, según prefieras
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
