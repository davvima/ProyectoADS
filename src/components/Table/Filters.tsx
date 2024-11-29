import React from "react"
import { useTheme } from "@emotion/react"
import { Box, FormControl, InputLabel } from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"

function Filters({ sx, children }: { sx?: any; children: any }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: "#F9F9FB",
        minHeight: "4.5rem",
        height: "100%",
        maxWidth: "90vw",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "2rem",
        boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "1rem",
        border: "0.6px solid #D5D5D5",
        ...sx,
      }}
    >
      <FilterListIcon />
      <InputLabel>Filtrar por</InputLabel>
      <FormControl
        variant="outlined"
        sx={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          flexGrow: "1",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {children}
      </FormControl>
    </Box>
  )
}

export default Filters
