import { Outlet } from "react-router-dom"
import useAlertDialog from "../hooks/alert"
import { useSelector } from "react-redux"
import { Box, ThemeProvider } from "@mui/material"
import GameUtils from "../components2/gameUtils"
import theme from "../theme"
import Footer from "../components2/utils/footer"
import Navbar from "../components2/utils/navbar"
import useConfirmAction from "../hooks/confirmAction"
import SettingsDialog from "../components2/utils/settings"

export default function Layout() {
  const { AlertDialog, showAlert } = useAlertDialog()
  const roomData = useSelector(state=>state.roomData.value);
  const { ConfirmDialog, confirmAction } = useConfirmAction()
  
  return (
    <ThemeProvider theme={theme}>
        <Box
            sx={{
                height: "100dvh",
                display: "grid",
                gridTemplateRows: "auto 1fr",
                overflow: "hidden",
            }}
            >
            <Navbar showAlert={showAlert} confirmAction={confirmAction}/>
            <SettingsDialog/>
                <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflow: roomData?.state==="lobby" ? "visible":"auto",
                    width: "100%",
                    position: "relative",
                }}
                >
        
                    <AlertDialog />
                    <ConfirmDialog />
                    <GameUtils showAlert={showAlert} confirmAction={confirmAction}/>
                    <Outlet context={{showAlert, confirmAction}}/>
                
                </Box>
            <Footer/>
            
            </Box>
        
    </ThemeProvider>
  )
}