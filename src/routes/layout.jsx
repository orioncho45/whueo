import { Outlet } from "react-router-dom"
import useAlertDialog from "../hooks/alert"
import { useSelector } from "react-redux"
import { Box, ThemeProvider } from "@mui/material"
import GameUtils from "../components2/gameUtils"
import theme from "../theme"
import Navbar from "../components2/utils/navbar"
import useConfirmAction from "../hooks/confirmAction"
import SettingsDialog from "../components2/utils/settings"
import useSound from "../sounds/player"
import { useEffect } from "react"

export default function Layout() {
  const { AlertDialog, showAlert } = useAlertDialog()
  const roomData = useSelector(state=>state.roomData.value);
// const roomData = {}
const { ConfirmDialog, confirmAction } = useConfirmAction()
const playSound = useSound();
  useEffect(() => {
    
    const handleClick = (e) => {
      const isButton = e.target.closest(
        "button, [role='button']"
      );

      if (isButton) {
        playSound({type: "click"})
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  
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
                    bgcolor: "brand.dark",
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
                >
        
                    <AlertDialog />
                    <ConfirmDialog />
                    <GameUtils showAlert={showAlert} confirmAction={confirmAction}/>
                    <Outlet context={{showAlert, confirmAction}}/>
                
                </Box>
            </Box>
        
    </ThemeProvider>
  )
}