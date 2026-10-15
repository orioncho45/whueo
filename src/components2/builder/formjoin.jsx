import { useState } from "react"
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { getSocket, saveSession } from "../../socket/test"
import { useDispatch } from "react-redux"
import { setPersonal, setUsername as setUsernameState } from "../../store/features/personal"
import { setRoomData } from "../../store/features/roomData"
import logEvent from "../../helper/logevent"

export default function JoinRoomForm({
  roomId,
  isOwn = false,
  onJoined = () => {},
  showAlert = () => {}
}) {
  const dispatch = useDispatch();
  const socket = getSocket()
  const [username, setUsername] =
    useState("")

  const [loading, setLoading] =
    useState(false)


  const joinRoom = () => {

    if (!username.trim()) {

      showAlert(
        "error",
        "Username required"
      )

      return
    }

    // CREATE ROOM FLOW
    if (isOwn) {

      onJoined({
        success: true,
        roomId,
        username
      })
      dispatch(setUsernameState(username))

      return
    }

    // JOIN ROOM FLOW
    setLoading(true)
    dispatch(setUsernameState(username))
    // If socket is already connected
    socket.emit(
      "join_room",
      {
        roomId,
        username
      },
      ({userId, socketId, sessionToken, ...response}) => {
        setLoading(false)
        //console.log(g(response)
        if (!response.success) {

          showAlert(
            "error",
            response.message || 
            "Failed to join room"
          )

          return
        }
        dispatch(setPersonal({username, userId, socketId}))
        saveSession(roomId, sessionToken)
        dispatch(setRoomData(response.roomData))
        onJoined({...response, username})
        logEvent({type: "JOIN", roomCode: roomId, username})
      }
    )
  }

  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
      sx={{
        px: 4
      }}
    >

      <Paper
        elevation={8}
        sx={{
          width: 450,
          p: 4,
          
          borderRadius: 5,
          // bgcolor: "brand.light",
          overflow: "hidden",
          position: "relative",
          bgcolor: "transparent",
          color: "var(--whueo-hex_ffffff)",
          border: "3px solid var(--whueo-hex_374151)"
        }}
      >
        {/* GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              bgcolor: "var(--whueo-rgba_21_255_0_0p12)",
              filter: "blur(100px)",
              top: -120,
              right: -100,
              pointerEvents: "none"
            }}
          />

        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{color:"var(--whueo-hex_ffffff)"}}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{color:"var(--whueo-hex_ffffff)"}}
          >
            {
              isOwn
                ? "Create Room"
                : "Join Room"
            }
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{color:"var(--whueo-hex_ffffff)"}}
          >
            Room ID: {roomId}
          </Typography>

          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                joinRoom()
              }
            }}
            sx={{input:{color:"var(--whueo-hex_ffffff)"}}}
          />

          <Button
            variant="contained"
            size="large"
            disabled={!isOwn && loading}
            onClick={joinRoom}
          >
            {
              isOwn
                ? "Create Room"
                : loading
                  ? "Joining..."
                  : "Join Room"
            }
          </Button>

        </Box>

      </Paper>

    </Box>
  )
}
