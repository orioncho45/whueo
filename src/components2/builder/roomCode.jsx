import { useEffect, useState, useRef } from "react"
import {
  Box, Button, CircularProgress, Paper, Stack,
  TextField, Typography, IconButton, Tooltip
} from "@mui/material"
import { Search, JoinInner } from "@mui/icons-material"
import { closeSocket, connectSocket, getSocket } from "../../socket/test"
import OrbitingPlayers from "../orbitingPlayers"
import { useNavigate } from "react-router-dom"
import { setRoomData } from "../../store/features/roomData"
import { useDispatch } from "react-redux"

export default function RoomCodeForm({ onJoin = () => {}, showAlert = () => {}, join_code }) {
  const [roomCode, setRoomCode] = useState(join_code || "")
  const [loading, setLoading] = useState(false)
  const [roomData, setRoomDataLocal] = useState(null)
  const [showForm, setShowForm] = useState(!join_code)
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  // Ref so socket handlers always see fresh roomData without re-registering
  const roomDataRef = useRef(roomData)
  useEffect(() => { roomDataRef.current = roomData }, [roomData])

  const resetToForm = (message) => {
    closeSocket()
    setRoomDataLocal(null)
    setRoomCode("")
    setShowForm(true)
    if (message) showAlert("error", message)
  }

  const fetchRoom = () => {
    if (loading) return
    if (!roomCode.trim()) { showAlert("error", "Room code required"); return }
    setLoading(true)
    connectSocket(roomCode, (newSocket) => {
      newSocket.onopen = () => {
        newSocket.emit("get_room", roomCode, (response) => {
          setLoading(false)
          console.log(response)
          if (!response.success) {
            showAlert("error", response.message || "Room not found")
            dispatch(setRoomData(null))
            Navigate("/")
            closeSocket()
            return
          }
          setRoomDataLocal(response.roomData)
          setShowForm(false)
        })
      }
      newSocket.onerror = () => {
        setLoading(false)
        showAlert("error", "Socket connection failed")
      }
    })
  }

  useEffect(() => {
    if (join_code) fetchRoom()
  }, [join_code])

  // ============================
  // SOCKET HANDLERS (pre-join only)
  // ============================
  useEffect(() => {
    if (!roomData) return   // only register once we're in the lobby view
    const socket = getSocket()
    if (!socket) return

    const handleUserJoined = ({ roomData: updated }) => {
      setRoomDataLocal(updated)
    }

    const handleUserLeft = ({ roomData: updated }) => {
      setRoomDataLocal(updated)
    }

    // Room started without us — we can't join anymore, go back
    const handleStartRoom = () => {
      resetToForm("Game already started, too late to join!")
    }

    // Host closed the room
    const handleCleanup = () => {
      resetToForm("Room was closed")
    }

    socket.on("user_joined", handleUserJoined)
    socket.on("user_left", handleUserLeft)
    socket.on("start_room", handleStartRoom)
    socket.on("cleanup", handleCleanup)

    return () => {
      socket.off("user_joined", handleUserJoined)
      socket.off("user_left", handleUserLeft)
      socket.off("start_room", handleStartRoom)
      socket.off("cleanup", handleCleanup)
    }
  }, [roomData != null])  // re-register only when lobby presence changes

  const players = roomData?.players ? Object.entries(roomData.players) : []
  const isSaturated = roomData?.players &&
    Object.keys(roomData.players).length >= roomData.settings.maxMembers

  // ============================
  // FORM VIEW
  // ============================
  if (showForm) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%" bgcolor="transparent">
        <Paper elevation={8} sx={{
          width: 450, position: "relative", bgcolor: "transparent",
          overflow: "hidden", p: 4, borderRadius: 5, color: "white", border: "3px solid #374151"
        }}>
          <Box sx={{
            position: "absolute", width: 300, height: 300, borderRadius: "50%",
            bgcolor: "rgba(21, 255, 0, 0.12)", filter: "blur(100px)",
            top: -120, right: -100, pointerEvents: "none"
          }} />
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight="bold" textAlign="center">Enter Room Code</Typography>
            <TextField
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="ROOM CODE"
              fullWidth
              onKeyDown={(e) => { if (e.key === "Enter") fetchRoom() }}
              sx={{ input: { color: "white", textAlign: "center", fontWeight: "bold", letterSpacing: 4, fontSize: 22 } }}
            />
            <Button variant="contained" size="large" onClick={fetchRoom} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Find Room"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  }

  // ============================
  // LOBBY VIEW
  // ============================
  if (!roomData) return null

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%" bgcolor="brand.dark">
      <Box sx={{ position: "relative", width: "100%", width: "100%", height: "100%", overflow: "visible", bgcolor: "transparent" }}>
        <OrbitingPlayers players={players} hostId={roomData.hostId} />

        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", zIndex: 1000,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textAlign: "center"
        }}>
          <Box>
            <Box sx={{ fontSize: "16px", letterSpacing: "0.22em", color: "rgba(255,255,255)", textTransform: "uppercase", mb: 0.5 }}>
              Waiting...
            </Box>
            <Box sx={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", mb: 0.5 }}>
              room code
            </Box>
            <Box sx={{ fontSize: { xs: "28px", sm: "36px" }, fontWeight: 800, color: "white", letterSpacing: "0.1em", lineHeight: 1 }}>
              {roomData.id}
            </Box>
          </Box>

          <Box display="flex" gap={1.5} alignItems="center">
            <Tooltip title="Find another room" placement="bottom">
              <IconButton onClick={() => resetToForm()} sx={{
                width: 48, height: 48, border: "1.5px solid rgba(255,255,255,0.2)",
                bgcolor: "rgba(255,255,255,0.06)", color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)", borderColor: "rgba(255,255,255,0.45)" }
              }}>
                <Search fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isSaturated ? "Room full" : "Join room"} placement="bottom">
              <span>
                <IconButton
                  onClick={() => { if (!isSaturated) onJoin({ roomId: roomCode, roomData }) }}
                  disabled={isSaturated}
                  sx={{
                    width: 56, height: 56, border: "1.5px solid rgba(90,200,120,0.45)",
                    bgcolor: "rgba(90,200,120,0.1)", color: "rgba(90,200,120,1)",
                    "&:hover": { bgcolor: "rgba(90,200,120,0.22)", borderColor: "rgba(90,200,120,0.8)" },
                    "&.Mui-disabled": { opacity: 0.5, color: "rgba(90,200,120,0.6)" }
                  }}
                >
                  <JoinInner />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          {/* Player count — highlights when full */}
          <Box sx={{
            fontSize: "11px", letterSpacing: "0.06em",
            color: isSaturated ? "rgba(255,120,120,0.9)" : "rgba(255,255,255,0.28)",
            transition: "color 0.3s"
          }}>
            {players.length}/{roomData.settings?.maxMembers ?? "?"} players
            {isSaturated && " · room full"}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}