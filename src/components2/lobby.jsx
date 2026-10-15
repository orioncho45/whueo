import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material"
import { ContentCopy, CheckCircle, PlayArrow, SettingsOutlined } from "@mui/icons-material"
import { useState, useRef } from "react"
import { getSocket } from "../socket/test"
import { useSelector } from "react-redux"
import OrbitingPlayers from "./orbitingPlayers"
import DisplayTimerPill from "./utils/displayTimer"
import { LOBBY_TTL } from "../helper/ttls"
import ServerSettings from "./serverSettings"

export default function GameLobby({ showAlert = () => {}}) {
  const roomData = useSelector((state) => state.roomData.value)
  const socketId = useSelector((state) => state.personal.value?.socketId)
  const isHost = roomData.hostId === socketId
  const socket = getSocket()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false);
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
                color: "var(--whueo-rgba_255_255_255)",
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
                color: "var(--whueo-rgba_255_255_255_0p35)",
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
                color: "var(--whueo-hex_ffffff)",
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
                    ? "1.5px solid var(--whueo-rgba_90_200_120_0p6)"
                    : "1.5px solid var(--whueo-rgba_255_255_255_0p2)",

                  bgcolor: copied
                    ? "var(--whueo-rgba_90_200_120_0p12)"
                    : "var(--whueo-rgba_255_255_255_0p06)",

                  color: copied
                    ? "var(--whueo-rgba_90_200_120_1)"
                    : "var(--whueo-hex_ffffff)",

                  transition: "all 0.25s ease",

                  "&:hover": {
                    bgcolor: copied
                      ? "var(--whueo-rgba_90_200_120_0p18)"
                      : "var(--whueo-rgba_255_255_255_0p14)",

                    borderColor: copied
                      ? "var(--whueo-rgba_90_200_120_0p9)"
                      : "var(--whueo-rgba_255_255_255_0p45)",
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
              <Tooltip title={"Change game settings"} placement="bottom">
                <span>
                  <IconButton
                    onClick={()=>setSettingsOpen(!settingsOpen)}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "1.5px solid var(--whueo-rgba_90_200_120_0p45)",
                      bgcolor: "var(--whueo-rgba_90_200_120_0p1)",
                      color: "var(--whueo-rgba_90_200_120_1)",
                      "&:hover": {
                        bgcolor: "var(--whueo-rgba_90_200_120_0p22)",
                        borderColor: "var(--whueo-rgba_90_200_120_0p8)",
                      },
                      "&.Mui-disabled": {
                        opacity: 0.5,
                        color: "var(--whueo-rgba_90_200_120_0p6)",
                      },
                    }}
                  >
                    <SettingsOutlined/>
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {isHost && (
              <Tooltip title={loading ? "Starting…" : "Start game"} placement="bottom">
                <span>
                  <IconButton
                    onClick={handleStartGame}
                    disabled={loading || Object.values(roomData.players).length<3}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "1.5px solid var(--whueo-rgba_90_200_120_0p45)",
                      bgcolor: "var(--whueo-rgba_90_200_120_0p1)",
                      color: "var(--whueo-rgba_90_200_120_1)",
                      "&:hover": {
                        bgcolor: "var(--whueo-rgba_90_200_120_0p22)",
                        borderColor: "var(--whueo-rgba_90_200_120_0p8)",
                      },
                      "&.Mui-disabled": {
                        opacity: 0.5,
                        color: "var(--whueo-rgba_90_200_120_0p6)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={20} sx={{ color: "var(--whueo-rgba_90_200_120_0p8)" }} />
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
              color: "var(--whueo-rgba_255_255_255_0p28)",
              letterSpacing: "0.06em",
            }}
          >
            {players.length}/{roomData.settings?.maxMembers ?? "?"} players
          </Box>
        </Box>
      </Box>
      <ServerSettings settingsOpen={settingsOpen} closeSettings={()=>setSettingsOpen(false)} showAlert={showAlert} />
    </Box>
  )
}