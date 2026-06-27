import { useRef, useState } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { getSocket } from "../../socket/test"
import DisplayTimerPill from "../utils/displayTimer"
import { WORD_TTL } from "../../helper/ttls"
export default function WordSelectOverlay({ words = [], showAlert }) {
  const [loadingWord, setLoadingWord] = useState(null)
  const socket = getSocket()
  const timeRef = useRef(Date.now()).current

  const handleSelect = (word) => {
    if (!socket || loadingWord) return

    setLoadingWord(word)

    socket.emit("word_select", { word }, response=>{
      if (!response.success) {
        setLoadingWord(null);
        showAlert("error", "Something went wrong!")
      }
      
      
    })

  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "brand.dark",
          backgroundImage:
              "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          padding: 4,
          minWidth: 300,
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
        <DisplayTimerPill startTime={timeRef} text={"Autoselects in: "} totalTime={WORD_TTL} onFinish={()=>handleSelect(words[0])} />
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            letterSpacing: 2
          }}
        >
          PICK A WORD
        </Typography>

        {words.map((word) => {
          const isLoading = loadingWord === word

          return (
            <Button
              key={word}
              fullWidth
              disabled={!!loadingWord}
              onClick={() => handleSelect(word)}
              sx={{
                position: "relative",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
                border: "1px solid #444",
                background: "rgba(255,255,255,0.05)",
                "&:hover": {
                  background: "rgba(255,255,255,0.1)"
                }
              }}
            >
              {word}

              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    right: 12,
                    color: "#4fc3f7"
                  }}
                />
              )}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}