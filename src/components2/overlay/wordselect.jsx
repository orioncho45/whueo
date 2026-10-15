import { useState } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { getSocket } from "../../socket/test"
import DisplayTimerPill from "../utils/displayTimer"
import { WORD_TTL } from "../../helper/ttls"
export default function WordSelectOverlay({ words = [], started, showAlert = () => {} }) {
  const [loadingWord, setLoadingWord] = useState(null)
  const socket = getSocket()

  const handleSelect = (word) => {
    if (!socket || loadingWord) return

    setLoadingWord(word)

    socket.emit("word_select", { word }, response=>{
      if (!response.success) {
        setLoadingWord(null);
        if (response.message !== "Word selection is unavailable") showAlert("error", response.message || "Something went wrong!")
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
              "radial-gradient(var(--whueo-rgba_255_255_255_0p045) 1px, transparent 1px)",
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
        <DisplayTimerPill startTime={started} text={"Autoselects in: "} totalTime={WORD_TTL} onFinish={()=>{ if (words[0]) handleSelect(words[0]) }} />
        <Typography
          sx={{
            color: "var(--whueo-hex_ffffff)",
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
              key={word.player}
              fullWidth
              disabled={!!loadingWord}
              onClick={() => handleSelect(word)}
              sx={{
                position: "relative",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: 16,
                color: "var(--whueo-hex_ffffff)",
                border: "1px solid var(--whueo-hex_444444)",
                background: "var(--whueo-rgba_255_255_255_0p05)",
                "&:hover": {
                  background: "var(--whueo-rgba_255_255_255_0p1)"
                }
              }}
            >
              {word.player}

              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    right: 12,
                    color: "var(--whueo-hex_4fc3f7)"
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
