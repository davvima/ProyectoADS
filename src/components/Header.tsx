// src/components/Header.tsx
import React from "react"
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useAuth0 } from "@auth0/auth0-react"

interface HeaderProps {
  onToggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const auth = useAuth0()
  const { user, isAuthenticated } = useAuth0()
  console.log({ auth })
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Dashboard
        </Typography>
        {isAuthenticated && (
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user?.name}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
