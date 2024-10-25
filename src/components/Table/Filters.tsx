import React from "react"
import { useTheme } from "@emotion/react"
import { Box, FormControl, InputLabel } from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"

function Filters({ children }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: theme.palette.common.white,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "1rem",
      }}
    >
      <FilterListIcon />
      <InputLabel>Filtrar por</InputLabel>
      <FormControl variant="outlined" sx={{ width: "10rem" }}>
        {children}
      </FormControl>
    </Box>
  )
}

export default Filters
