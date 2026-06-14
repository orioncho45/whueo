import { useState } from "react"
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { getSocket } from "../../socket/test"
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
      ({userId, socketId, ...response}) => {
        setLoading(false)
        console.log(response)
        if (!response.success) {

          showAlert(
            "error",
            response.message || 
            "Failed to join room"
          )

          return
        }
        dispatch(setPersonal({username, userId, socketId}))
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
      bgcolor="brand.dark"
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
          color: "white",
          border: "3px solid #374151"
        }}
      >
        {/* GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              bgcolor: "rgba(21, 255, 0, 0.12)",
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
          sx={{color:"white"}}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{color:"white"}}
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
            sx={{color:"white"}}
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
            sx={{input:{color:"white"}}}
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