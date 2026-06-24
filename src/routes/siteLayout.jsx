import { Outlet, useLocation } from "react-router-dom"
import { Box } from "@mui/material"
import Footer from "../components2/utils/footer"
import { LandingNavbar } from "../components2/utils/landingNavbar"

export default function SiteLayout() {
  // ensure navbar can react to location if needed
  const location = useLocation()
  return (
    <>
      <LandingNavbar key={location.pathname} path = {location.pathname} />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
