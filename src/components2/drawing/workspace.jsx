import { useEffect, useRef, useState } from "react"
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import DrawingCanvas from "./drawingCanvas"
import ViewerCanvas from "./viewerCanvas"
import { useSelector } from "react-redux"
import { getSocket } from "../../socket/test"
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import GridViewIcon from "@mui/icons-material/GridView";
import DisplayTimerPill from "../utils/displayTimer"
import ConnectionStatus from "../utils/connectionStatus"
import { START_TTL } from "../../helper/ttls"
const labelStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
  px: 1.5,
  py: 0.5,
  borderRadius: 2,
  fontSize: 13,
  color: "var(--whueo-hex_ffffff)",
  bgcolor: "var(--whueo-rgba_0_0_0_0p55)",
  backdropFilter: "blur(6px)"
}
const EMPTY_STROKES = []

const CanvasTile = ({
  player,
  onClick,
  selectedCanvas,
  viewMode,
  liveChunk,
  finalStroke,
  initialStrokes,
  isOwn=false,
  viewerRef=null,
  isEliminated=false
}) => {
  // UPDATED: read username from personal slice
  const username = useSelector(state=>state.personal.value?.username)
  const isSelected = isOwn? true : selectedCanvas?.username === player.username
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: viewMode === "grid" ? 110 : 130,
        minHeight: 0,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "var(--whueo-hex_111111)",
        border: isSelected ? "2px solid var(--whueo-hex_1976d2)" : "1px solid var(--whueo-hex_222222)",
        cursor: "pointer",
        transition: "0.2s ease",
        "&:hover": { transform: "scale(1.02)" },
        "& canvas": {
          width: "100% !important",
          height: "100% !important",
          display: "block"
        }
      }}
    >
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <ViewerCanvas
          ref={viewerRef}
          onClick={onClick}
          liveChunk={liveChunk}
          finalStroke={finalStroke}
          initialStrokes={initialStrokes}
          isEliminated={isEliminated}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 6,
          right: 6,
          px: 1,
          py: 0.3,
          borderRadius: 1,
          fontSize: 11,
          color: "var(--whueo-hex_ffffff)",
          bgcolor: "var(--whueo-rgba_0_0_0_0p6)",
          backdropFilter: "blur(4px)"
        }}
      >
        {isOwn ? `${username} (You)` : player.username}
        <ConnectionStatus connected={isOwn || player?.connected !== false} />
      </Box>
    </Box>
  )
}

export default function CanvasWorkspace({
  liveChunk,
  finalStroke,
}) {

  const [selectedCanvas, setSelectedCanvas] = useState(null)
  const [viewMode, setViewMode] = useState("compact")
  const [initialCanvas, setInitialCanvas] = useState(null)
  const [ownLiveChunk, setOwnLiveChunk] = useState(null)
  const [ownFinalStroke, setOwnFinalStroke] = useState(null)
  const firstCanvasRef = useRef();
  const roomData = useSelector(state => state.roomData.value)
  const socket = getSocket()
  const players = roomData?.players ? roomData.players : {}
  const username = useSelector(state => state.personal.value?.username)
  const socketId = useSelector(state => state.personal.value?.socketId)
  const otherPlayers = Object.values(players).filter((p) => p.username !== username)
  const isEliminated = roomData?.players?.[socketId]?.eliminated
  useEffect(()=>{
    if (isEliminated) {
      firstCanvasRef.current?.click();  
    }
    
  },[isEliminated])
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "8fr 4fr" },
        gridTemplateRows: { xs: "50vh 50vh", md: "1fr" },
        bgcolor: "transparent",
        overflow: "hidden"
      }}
    >
      {/* ========================================= */}
      {/* LEFT / TOP — MAIN CANVAS */}
      {/* ========================================= */}
      <Box
        sx={{
          // p: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            flex: 1,
            // borderRadius: 4,
            overflow: "hidden",
            bgcolor: "transparent",
            border: "1px solid var(--whueo-hex_222222)",
            position: "relative",
            boxShadow: "0 0 30px var(--whueo-rgba_0_0_0_0p4)"
          }}
        >
          {selectedCanvas ? (
            <>
              <ViewerCanvas
                liveChunk={liveChunk?.[selectedCanvas.socketId]}
                finalStroke={finalStroke?.[selectedCanvas.socketId] || null}
                initialCanvas={initialCanvas}
                initialStrokes={initialCanvas ? EMPTY_STROKES : roomData.drawings?.[selectedCanvas.socketId] || EMPTY_STROKES}
              />
              <Box sx={labelStyle}>{selectedCanvas.username}</Box>
            </>
          ) : (
            <>
              <DrawingCanvas
                isEliminated={isEliminated}
                username={username}
                initialCanvas={initialCanvas}
                initialStrokes={initialCanvas ? EMPTY_STROKES : roomData.drawings?.[socketId] || EMPTY_STROKES}
                onChunk={(chunk) => {
                  socket.emit("stroke_chunk", { chunk })
                  setOwnLiveChunk(chunk)
                 
                }}
                onDrawing={(stroke) => {
                  socket.emit("stroke_complete", { stroke })
                  setOwnFinalStroke(stroke);                  
                }}
              
              />

              <Box sx={labelStyle}>{username} (You)</Box>
            </>
          )}
          <Box sx={{position: "absolute", top:36, right: 16}}><DisplayTimerPill startTime={roomData.started} totalTime={START_TTL} text={"Vote starts in"} /></Box>
        </Box>
      </Box>

      {/* ========================================= */}
      {/* RIGHT / BOTTOM — SIDEBAR */}
      {/* ========================================= */}
      <Box
        sx={{
          position: "relative",
          borderLeft: { xs: "none", md: "1px solid var(--whueo-hex_1e1e1e)" },
          borderTop: { xs: "1px solid var(--whueo-hex_1e1e1e)", md: "none" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "transparent"
        }}
      >
        {/* OVERLAY TOGGLE */}
        <Box
          sx={{
            position: "absolute",
            top: 5,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            p: 0.5,
            borderRadius: 3,
            bgcolor: "var(--whueo-rgba_21_21_21_0p75)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--whueo-hex_222222)",
            display: "flex",
            gap: 0.5
          }}
        >
          <ToggleButtonGroup
            exclusive
            value={viewMode}
            onChange={(e, val) => {
              if (val) setViewMode(val);
            }}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                color: "var(--whueo-hex_bbbbbb)",
                border: "none",
                px: 1,
                py: 0.5,
                minWidth: 36
              },
              "& .Mui-selected": {
      
                color: "var(--whueo-hex_ffffff)"
              }
            }}
          >
            <ToggleButton value="compact">
              {/* icon-only */}
              <ViewCompactIcon fontSize="small" />
            </ToggleButton>

            <ToggleButton value="grid">
              <GridViewIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* THUMBNAIL LIST */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 1.5,
            display: "grid",
            gridTemplateColumns: viewMode === "grid" ? "1fr 1fr" : "1fr",
            gap: 1.5,
            alignContent: "start"
          }}
        >
          {!isEliminated && (
            <CanvasTile
              finalStroke={ownFinalStroke}
              initialStrokes={roomData.drawings?.[socketId] || EMPTY_STROKES}
              liveChunk={ownLiveChunk}
              viewMode={viewMode}
              isOwn={true}
              onClick={(image) => {
                setSelectedCanvas(null);
                setInitialCanvas(image);
              }}
              key={"own"}
            />
          )}

          {otherPlayers.map((player, index) => (
            <CanvasTile
              
              finalStroke={finalStroke[player.socketId]}
              initialStrokes={roomData.drawings?.[player.socketId] || EMPTY_STROKES}
              liveChunk={liveChunk[player.socketId]}
              selectedCanvas={selectedCanvas}
              viewMode={viewMode}
              viewerRef={index === 0 ? firstCanvasRef : null}
              isEliminated={roomData?.players?.[player.socketId]?.eliminated || player.eliminated}
              onClick={(image) => {
                setInitialCanvas(image);
                setSelectedCanvas(player);
              }}
              key={player.socketId}
              player={player}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
