import { useEffect, useState } from "react"
import atracciones from "../data/atracciones.json"
import dashboardData from "../data/dashboardData.json"
import detalleSolicitud from "../data/detalleSolicitud.json"
import notificaciones from "../data/notificaciones.json"
import roles from "../data/roles.json"
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

const BASE_URL = "https://recreas.net/backend"

export function useFetch(initialResource?: keyof typeof dataFiles | string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
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
        const url = endpoint.startsWith("http") ? endpoint : BASE_URL + endpoint
        const response = await fetch(url, {
          method: options.method || "GET",
          headers:
            options.body instanceof FormData
              ? {}
              : {
                  "Content-Type": "application/json",
                  ...(options.headers || {}),
                },
          body: options.body instanceof FormData ? options.body : JSON.stringify(options.body),
        })
        console.log({ responsefetch: response })

        if (!response.ok) {
          let errorDetails = `Error ${response.status} ${response.statusText}:${response.type}`
          console.error(`Error en solicitud ${options.method} ${endpoint}`, errorDetails)
          return response
        }
        console.log("response.status", response.status)
        try {
          const responseData = await response.json()
          setData(() => responseData)
          return responseData
        } catch {
          return response
        }
      }
    } catch (err: any) {
      console.log("entro al catch")
      setError(() => err || "Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialResource) {
      fetchData(initialResource)
    }
  }, [initialResource])

  const refetch = (refetchResource?: string) => {
    const endpoint = refetchResource ?? initialResource
    if (endpoint) {
      fetchData(endpoint)
    }
  }

  const execute = (
    endpoint: string,
    method: "POST" | "PUT" | "DELETE" | "GET" = "GET",
    body?: any,
    headers?: Record<string, string>
  ) => fetchData(endpoint, { method, body, headers })

  return { data, loading, error, refetch, execute }
}

export default useFetch
