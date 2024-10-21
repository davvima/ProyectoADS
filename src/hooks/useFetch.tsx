// src/hooks/useFetch.tsx
import { useEffect, useState } from "react"
import dashboardData from "../data/dashboardData.json"
import solicitudes from "../data/solicitudes.json"
import usuarios from "../data/usuarios.json"

const dataFiles = {
  dashboardData: dashboardData,
  solicitudes: solicitudes,
  usuarios: usuarios,
}

export function useFetch(filename: keyof typeof dataFiles) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      setError(null)
      try {
        const jsonData = dataFiles[filename]
        console.log({ dataFiles, filename })
        setData(jsonData)
      } catch (err) {
        console.error(err)
        setError("Error al cargar los datos")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filename])

  return { data, loading, error }
}

export default useFetch
