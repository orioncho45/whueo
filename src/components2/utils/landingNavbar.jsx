import { AppBar, Box, Button, Toolbar } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PlayArrow } from "@mui/icons-material"
import theme from "../../theme"
// --- NEW: Landing page specific navbar (keeps global navbar untouched) ---
export function LandingNavbar() {
  const navigate = useNavigate()
  const [isSticky, setIsSticky] = useState(false)
  const t = theme.palette.t
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    navigate("/#" + sectionId)
  }

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <AppBar
        position={"fixed"}
        elevation={isSticky ? 3 : 0}
        sx={{
          backgroundColor: isSticky ? "brand.dark" : "transparent",
          borderBottom: isSticky ? 1 : "none",
          borderColor: "divider",
          color: "white",
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          transition: "all 200ms ease",
        }}
      >
        <Toolbar sx={{ minHeight: 64, display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", width: 100, objectFit: "contain", opacity: isSticky ? "1" : "0" }}
          />

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button color="inherit" onClick={() => scrollToSection("how-to-play")}>How To Play</Button>
            <Button color="inherit" onClick={() => scrollToSection("how-it-works")}>How it works</Button>
            <Button variant="contained" color="primary" 
              sx={{
                boxShadow: "none",
                "&:hover": { boxShadow: `0 0 28px ${t.boxShadow}` },
              }}
              onClick={()=>navigate("/play")} ><PlayArrow/> Play Now</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* spacer so content doesn't jump when AppBar becomes fixed */}
      {isSticky && <Toolbar sx={{ minHeight: 64 }} />}
    </>
  )
}