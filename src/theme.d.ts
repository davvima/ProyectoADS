import "@mui/material/styles"

// Extiende la paleta del tema para incluir 'customColors'
declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      yellow: string
      blue: string
      red: string
    }
  }

  interface PaletteOptions {
    customColors?: {
      yellow?: string
      blue?: string
      red?: string
    }
  }
}
