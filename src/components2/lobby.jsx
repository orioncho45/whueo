import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material"
import { ContentCopy, CheckCircle, PlayArrow } from "@mui/icons-material"
import { useState, useRef } from "react"
import { getSocket } from "../socket/test"
import { useSelector } from "react-redux"
import OrbitingPlayers from "./orbitingPlayers"
import DisplayTimerPill from "./utils/displayTimer"
import { LOBBY_TTL } from "../helper/ttls"

export default function GameLobby({ showAlert = () => {}}) {
  const roomData = useSelector((state) => state.roomData.value)
  const socketId = useSelector((state) => state.personal.value?.socketId)
  const isHost = roomData.hostId === socketId
  const socket = getSocket()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef(null)
  

  const players = roomData?.players ? Object.entries(roomData.players) : []

  const inviteLink = `${window.location.origin}/play/room/${roomData.id}`
  const triggerCopiedState = () => {
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1800)
  }
  const handleCopyInvite = async () => {
  // Check if modern clipboard API is available and in a secure context
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(inviteLink);
      triggerCopiedState()
    } catch (err) {
      showAlert("error", "Failed to copy link");
    }
  } else {
    // Fallback method for HTTP mobile testing / older browsers
    const textArea = document.createElement("textarea");
    textArea.value = inviteLink;
    
    // Prevent scrolling and keep it hidden
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        triggerCopiedState()
      } else {
        showAlert("error", "Failed to copy link");
      }
    } catch (err) {
      showAlert("error", "Failed to copy link");
    }
    
    document.body.removeChild(textArea);
  }
};

  const handleStartGame = () => {
    if (loading || Object.values(roomData.players).length<3) return
    setLoading(true)
    socket.emit("start_room", roomData.id, (response) => {
      if (!response?.success) {
        showAlert("error", response?.message || "Failed to start game")
        setLoading(false)
      }
    })
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
      p={2}
    >
      <Box sx={{position:"fixed", bottom: 40, left: "50%", transform: 'translateX(-50%)'}}>
        <DisplayTimerPill startTime={roomData.created} totalTime={LOBBY_TTL} text={"Lobby ends in"} />
      </Box>
      <Box
        ref={containerRef}
        sx={{
           position: "relative",
            width: "100%",
            maxWidth: 640,
            height: 520,
            overflow: "visible",
            bgcolor: "transparent"
        }}
      >

        {/* orbiting players moved to reusable component */}
        <OrbitingPlayers players={players} hostId={roomData.hostId} />

        {/* Center hub */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                fontSize: "16px",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Waiting...
            </Box>
            <Box
              sx={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              room code
            </Box>
            <Box
              sx={{
                fontSize: { xs: "28px", sm: "36px" },
                fontWeight: 800,
                color: "white",
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              {roomData.id}
            </Box>
          </Box>

          <Box display="flex" gap={1.5} alignItems="center">
            <Tooltip
              title={copied ? "Copied!" : "Copy invite link"}
              placement="bottom"
            >
              <IconButton
                onClick={handleCopyInvite}
                sx={{
                  width: 48,
                  height: 48,
                  border: copied
                    ? "1.5px solid rgba(90,200,120,0.6)"
                    : "1.5px solid rgba(255,255,255,0.2)",

                  bgcolor: copied
                    ? "rgba(90,200,120,0.12)"
                    : "rgba(255,255,255,0.06)",

                  color: copied
                    ? "rgba(90,200,120,1)"
                    : "white",

                  transition: "all 0.25s ease",

                  "&:hover": {
                    bgcolor: copied
                      ? "rgba(90,200,120,0.18)"
                      : "rgba(255,255,255,0.14)",

                    borderColor: copied
                      ? "rgba(90,200,120,0.9)"
                      : "rgba(255,255,255,0.45)",
                  },
                }}
              >
                {copied ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <ContentCopy fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            {isHost && (
              <Tooltip title={loading ? "Starting…" : "Start game"} placement="bottom">
                <span>
                  <IconButton
                    onClick={handleStartGame}
                    disabled={loading || Object.values(roomData.players).length<3}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "1.5px solid rgba(90,200,120,0.45)",
                      bgcolor: "rgba(90,200,120,0.1)",
                      color: "rgba(90,200,120,1)",
                      "&:hover": {
                        bgcolor: "rgba(90,200,120,0.22)",
                        borderColor: "rgba(90,200,120,0.8)",
                      },
                      "&.Mui-disabled": {
                        opacity: 0.5,
                        color: "rgba(90,200,120,0.6)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={20} sx={{ color: "rgba(90,200,120,0.8)" }} />
                    ) : (
                      <PlayArrow />
                    )}
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Box>

          <Box
            sx={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.06em",
            }}
          >
            {players.length}/{roomData.settings?.maxMembers ?? "?"} players
          </Box>
        </Box>
      </Box>
    </Box>
  )
}