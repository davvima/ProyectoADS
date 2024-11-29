// src/components/RecipientFilter.tsx
import React from "react"
import { Box, Select, MenuItem, InputLabel, SelectChangeEvent } from "@mui/material"

interface RecipientFilterProps {
  selectedFilter: string
  onChangeFilter: (filter: string) => void
}

const RecipientFilter: React.FC<RecipientFilterProps> = ({ selectedFilter, onChangeFilter }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <InputLabel>Segmentar destinatarios</InputLabel>
      <Select
        value={selectedFilter}
        onChange={(e: SelectChangeEvent) => onChangeFilter(e.target.value)}
      >
        <MenuItem value="activos">Turistas Activos</MenuItem>
        <MenuItem value="inactivos">Turistas Inactivos</MenuItem>
        <MenuItem value="region">Por Región</MenuItem>
      </Select>
    </Box>
  )
}

export default RecipientFilter
