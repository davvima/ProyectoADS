import { useEffect, useState } from "react"
import atracciones from "../data/atracciones.json"
import dashboardData from "../data/dashboardData.json"
import detalleSolicitud from "../data/detalleSolicitud.json"
import notificaciones from "../data/notificaciones.json"
import roles from "../data/roles.json"
import solicitudes from "../data/solicitudes.json"
import usuarios from "../data/usuarios.json"
import videos from "../data/videos.json"
import permisos from "../data/permisos.json"
import estadisticas from "../data/estadisticasGenerales.json"
import materiales from "../data/materiales.json"
import centros from "../data/centros.json"

const dataFiles = {
  atracciones,
  dashboardData,
  detalleSolicitud,
  notificaciones,
  roles,
  solicitudes,
  usuarios,
  videos,
  permisos,
  estadisticas,
  materiales,
  centros,
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  headers?: Record<string, string>
}

export function useFetch(initialResource?: keyof typeof dataFiles | string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (endpoint: string, options: FetchOptions = { method: "GET" }) => {
    setLoading(true)
    setError(null)

    try {
      if (endpoint in dataFiles && options.method === "GET") {
        // Archivos estáticos
        setData(dataFiles[endpoint as keyof typeof dataFiles])
      } else {
        // Modo API real
        const response = await fetch(endpoint, {
          method: options.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : null,
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const responseData = await response.json()
        setData(responseData)
      }
    } catch (err: any) {
      setError(err.message || "Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialResource) {
      fetchData(initialResource)
    }
  }, [initialResource])

  const refetch = () => {
    if (initialResource) {
      fetchData(initialResource)
    }
  }

  // Ejecución dinámica para `POST`, `PUT`, `DELETE` o `GET` a otros endpoints
  const execute = (
    endpoint: string,
    method: "POST" | "PUT" | "DELETE" | "GET" = "GET",
    body?: any,
    headers?: Record<string, string>
  ) => fetchData(endpoint, { method, body, headers })

  return { data, loading, error, refetch, execute }
}

export default useFetch
