import { AppBar, Toolbar, Box, Button, IconButton, Badge, CircularProgress, Typography } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import { useDispatch, useSelector } from "react-redux"
import { closeChat, openChat } from "../../store/features/chat"
import { closePlayers, openPlayers } from "../../store/features/players"
import { closeSocket, getSocket } from "../../socket/test"
import { useState } from "react"
import { useEffect } from "react"
import { Group, Settings } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { closeSettings, openSettings } from "../../store/features/settings"
import { setRoomData } from "../../store/features/roomData"

export default function Navbar({showAlert=()=>{}, confirmAction = () => {}}) {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const { unreadCount } = useSelector(state => state.chat.value)
  const roomData = useSelector(state=>state.roomData.value)
  const socketId = useSelector(state=>state.personal.value?.socketId)
  const inGame = roomData?.state === "lobby" || roomData?.state === "started"
  const isHost = roomData?.hostId === socketId;
  const isImposter = roomData?.imposters?.includes(socketId)
  const socket = getSocket()
  const [voteLoading, setVoteLoading] = useState(false);
  const reset = ()=>{
    dispatch(closeSettings());
    dispatch(closeChat())
    dispatch(closePlayers())
    dispatch(setRoomData(null));
    closeSocket();
    Navigate("/play")
  }
  const startVote = (data)=>{
    //console.log(data)
    setVoteLoading(true)
    socket.emit("vote_start",{}, (response)=>{
      if (!response.success) {
        showAlert('error', response.message);
        setVoteLoading(false);
      }
    })
  }
  useEffect(()=>{
    if (roomData?.state === "started") {
      setVoteLoading(false);
    }
    
  }, [roomData])
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "transparent !important",
        bgcolor: "brand.dark",
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          onClick={e=>{
            e.preventDefault()
            if (inGame || roomData?.state === "vote") {
              confirmAction({
                type: "danger",
                title: "Leave Room?",
                message: "Do you want to leave game?",
                onConfirm: ()=>reset()
              })
            }else{
              reset()
            }
          }}
          src="/logo.png"
          
          alt="Logo"
          sx={{
            cursor: "pointer",
            width: inGame ? 60 : 100,
            height: inGame ? 60 : 100,
            objectFit: "contain",
            transition: "all 0.3s ease",
            "@media (max-width: 768px)": {
              width: inGame ? 50 : 70,
              height: inGame ? 50 : 70,
            },
            zIndex: 100000

          }}
        />

  
        {
          !isImposter && roomData?.state==="started" &&  (
            <center>
              <Typography variant="h6" color="error" >Word: {roomData?.word}</Typography>
            </center>
          )
        }

        {/* Push everything else to the right */}
        <Box sx={{ flexGrow: 1 }} />
         
          {
            roomData && (
              <IconButton
                onClick={() => {
                  dispatch(closeChat());
                  dispatch(openPlayers());
                  dispatch(closeSettings())
                }}
                color="inherit"
              >
                <Group />
              </IconButton>
            )
          }
        {/* Chat and Vote buttons - Only show when in game */}
        <Box sx={{ display: "flex", gap: 1 }}>
            {isHost && roomData.state === "started" && (
              <Button
                disabled={voteLoading}
                onClick={startVote}
                variant="outlined"
                startIcon={<HowToVoteIcon />}
                color="inherit"
              >
                {voteLoading ? <CircularProgress size={24}/> : "Vote"}
              </Button>
            )}

            {
              (roomData && (inGame || roomData.state==="vote")) && (
                  <Badge
                    badgeContent={unreadCount}
                    color="error"
                  >
                    <IconButton
                      onClick={() => {
                        dispatch(closePlayers());
                        dispatch(openChat())
                        dispatch(closeSettings())
                      }}
                      color="inherit"
                    >
                      <ChatIcon />
                    </IconButton>
                  </Badge>
              )
            }
            <IconButton
              onClick={() => {
                dispatch(openSettings());
                dispatch(closeChat())
                dispatch(closePlayers())
              }}
              color="inherit"
            >
              <Settings />
            </IconButton>
          </Box>
      </Toolbar>
    </AppBar>
  )
}