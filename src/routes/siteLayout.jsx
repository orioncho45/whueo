import { Outlet, useLocation } from "react-router-dom"
import { Box } from "@mui/material"
import { LandingNavbar } from "../pages/landing"
import Footer from "../components2/utils/footer"

export default function SiteLayout() {
  // ensure navbar can react to location if needed
  const location = useLocation()
  return (
    <>
      <LandingNavbar key={location.pathname} />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
