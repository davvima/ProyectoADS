import React, { useState } from "react"
import { Box, Checkbox, TableCell, TableRow } from "@mui/material"
import useFetch from "../../hooks/useFetch"

const TablaPermisos = () => {
  const { data: permisos, loading, error } = useFetch("permisos")

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  const formatResponse = (responseString: string) => {
    const splitedString = responseString?.split("_").join(" ")
    const newString = splitedString.slice(0, 1).toUpperCase() + splitedString.slice(1)
    return newString
  }
  console.log({ permisos })
  return (
    <>
      {permisos.map((permiso) => (
        <TableRow key={permiso}>
          <Box display="flex" width="100%">
            <Checkbox /> <TableCell width="100%">{formatResponse(permiso)}</TableCell>
          </Box>
        </TableRow>
      ))}
    </>
  )
}

export default TablaPermisos
