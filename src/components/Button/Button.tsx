import React from "react"
import { Button as ButtonMaterial, ButtonProps, SxProps } from "@mui/material"
import { OverridableStringUnion } from "@mui/types"

interface CustomButtonProps {
  onClick?: () => void
  children: React.ReactNode
  width?: string
  startIcon?: any
  variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonProps["variant"]>
  sx?: SxProps
  disabled?: boolean
}

function Button({
  onClick,
  children,
  width = "20rem",
  variant = "contained",
  startIcon = null,
  sx = {},
  disabled = false,
}: CustomButtonProps) {
  return (
    <ButtonMaterial
      disabled={disabled}
      variant={variant}
      startIcon={startIcon}
      sx={{
        width: width,
        height: { xs: "2.5rem", sm: "3rem" },
        lineHeight: "1rem",
        maxWidth: "50vw",
        borderRadius: "20rem",
        alignSelf: "end",
        color: "black",
        margin: "0",
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </ButtonMaterial>
  )
}

export default Button
