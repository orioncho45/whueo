import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material"

import {
  Menu as MenuIcon,
  PlayArrow,
  Close,
  HelpOutline,
  InfoOutlined,
} from "@mui/icons-material"

import theme from "../../theme"
import scrollToSection from "../../helper/scrolltoSection"

// --- Landing page specific navbar (keeps global navbar untouched) ---
export function LandingNavbar() {
  const navigate = useNavigate()

  const [isSticky, setIsSticky] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = theme.palette.t

  

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 20)

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeDrawer = () => setMobileOpen(false)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isSticky ? 3 : 0}
        sx={{
          backgroundColor: isSticky ? "brand.dark" : "transparent",
          borderBottom: isSticky ? 1 : "none",
          borderColor: "divider",
          color: "var(--whueo-hex_ffffff)",
          transition: "all 200ms ease",
        }}
      >
        <Toolbar
          sx={{
            minHeight: 64,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              width: { xs: 80, sm: 100 },
              objectFit: "contain",
              opacity: isSticky ? 1 : 0,
              transition: "opacity 200ms",
            }}
          />

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              color="inherit"
              onClick={() => scrollToSection("how-to-play",navigate)}
            >
              How To Play
            </Button>

            <Button
              color="inherit"
              onClick={() => scrollToSection("how-it-works", navigate)}
            >
              How It Works
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/play")}
              sx={{
                boxShadow: "none",
                "&:hover": {
                  boxShadow: `0 0 28px ${t.boxShadow}`,
                },
              }}
            >
              <PlayArrow sx={{ mr: 0.5 }} />
              Play Now
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "var(--whueo-hex_ffffff)",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "brand.dark",
            color: "var(--whueo-hex_ffffff)",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{
              width: 90,
            }}
          />

          <IconButton
            onClick={closeDrawer}
            sx={{ color: "var(--whueo-hex_ffffff)" }}
          >
            <Close />
          </IconButton>
        </Toolbar>

        <List>
          <ListItemButton
            onClick={() => {
              scrollToSection("how-to-play", navigate)
              closeDrawer()
            }}
          >
            <ListItemIcon sx={{ color: "var(--whueo-hex_ffffff)" }}>
              <HelpOutline />
            </ListItemIcon>

            <ListItemText primary="How To Play" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              scrollToSection("how-it-works", navigate)
              closeDrawer()
            }}
          >
            <ListItemIcon sx={{ color: "var(--whueo-hex_ffffff)" }}>
              <InfoOutlined />
            </ListItemIcon>

            <ListItemText primary="How It Works" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              navigate("/play")
              closeDrawer()
            }}
          >
            <ListItemIcon sx={{ color: "var(--whueo-hex_ffffff)" }}>
              <PlayArrow />
            </ListItemIcon>

            <ListItemText primary="Play Now" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Spacer */}
      {isSticky && <Toolbar sx={{ minHeight: 64 }} />}
    </>
  )
}