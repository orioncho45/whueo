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
import { useEffect, useRef } from "react"
import { connectSocket, getSavedSession } from "../socket/test"
import { useDispatch } from "react-redux"
import { setPersonal } from "../store/features/personal"
import { setRoomData } from "../store/features/roomData"

export default function Layout() {
  const dispatch = useDispatch()
  const { AlertDialog, showAlert } = useAlertDialog()
  const roomData = useSelector(state=>state.roomData.value);
  // const roomData = {}
  const { ConfirmDialog, confirmAction } = useConfirmAction()
  const playSound = useSound();
  const playSoundRef = useRef(playSound);
  useEffect(() => {
    const saved = getSavedSession()
    if (!saved) return
    const socket = connectSocket(saved.roomId)
    const restore = ({ roomData, socketId, username, userId, drawings }) => {
      dispatch(setPersonal({ socketId, username, userId }))
      dispatch(setRoomData({ ...roomData, drawings }))
    }
    socket.on("session_restored", restore)
    return () => socket.off("session_restored", restore)
  }, [dispatch])
  useEffect(() => {
    playSoundRef.current = playSound;
  }, [playSound]);
  useEffect(() => {
    
    const handleClick = (e) => {
      const isButton = e.target.closest(
        "button, [role='button']"
      );

      if (isButton) {
        playSoundRef.current({type: "click"})
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
                        "radial-gradient(var(--whueo-rgba_255_255_255_0p045) 1px, transparent 1px)",
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
