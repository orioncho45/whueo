import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"

// 👉 replace with your actual image paths
import goodMascot from "../../assets/mascot/good.png"
import badMascot from "../../assets/mascot/bad.png"

export default function RoleRevealOverlay({ isImposter, onDone = () => {} }) {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1400)

    const removeTimer = setTimeout(() => {
      setVisible(false)
      onDone()
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [onDone])

  if (!visible) return null

  const role = isImposter ? "IMPOSTER" : "CREWMATE"
  const mascot = isImposter ? badMascot : goodMascot
  const glowColor = isImposter ? "#ff3b3b" : "#4fc3f7"

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#000",

        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.03)" : "scale(1)",
        transition: "opacity 600ms ease, transform 600ms ease",
      }}
    >
      {/* MASCOT */}
      <Box
        component="img"
        src={mascot}
        alt="role mascot"
        sx={{
          width: { xs: 160, md: 220 },
          height: "auto",
          mb: 2,
          filter: isImposter
            ? "drop-shadow(0 0 25px rgba(255,0,0,0.6))"
            : "drop-shadow(0 0 25px rgba(79,195,247,0.6))",
          animation: "popIn 300ms ease-out"
        }}
      />

      {/* YOU ARE */}
      <Typography
        sx={{
          fontSize: { xs: 34, md: 56 },
          fontWeight: 900,
          letterSpacing: 6,
          color: "#ddd",
          textShadow: "0 0 20px rgba(0,0,0,0.8)",
          mb: 1
        }}
      >
        YOU ARE
      </Typography>

      {/* ROLE */}
      <Typography
        sx={{
          fontSize: { xs: 52, md: 84 },
          fontWeight: 1000,
          letterSpacing: 8,
          color: glowColor,
          textShadow: `0 0 15px ${glowColor}, 0 0 35px rgba(0,0,0,0.9)`,
        }}
      >
        {role}
      </Typography>

      {/* optional keyframes */}
      <style>
        {`
          @keyframes popIn {
            0% { transform: scale(0.6); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  )
}