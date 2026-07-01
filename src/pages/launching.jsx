import { useEffect, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"

import banner from "../assets/banner/hero.png"
import Timer from "../components2/timer"
import theme from "../theme"
const t = theme.palette.t
const displayFont = "'Playfair Display', Georgia, serif"

// Wednesday at 10:00 PM — adjust the date to the correct upcoming Wednesday
const LAUNCH_DATE = (new Date("2026-07-01T22:30:00")).getTime()

export default function LaunchingSoonHero() {
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(id)
  }, [])

  return (
    <Box sx={{
      position: "relative",
      width: "100%",
      height: "100dvh",
      overflow: "hidden",
    }}>
      <Box
        component="img"
        src={banner}
        alt=""
        sx={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark vignette */}
      <Box sx={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse at center, rgba(8,14,10,0.2) 0%, rgba(8,14,10,0.72) 100%),
          linear-gradient(180deg, rgba(8,14,10,0.1) 0%, rgba(8,14,10,0.9) 100%)
        `,
      }} />

      {/* Centered content with fade + rise animation */}
      <Box sx={{
        position: "absolute", inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Box sx={{
          textAlign: "center",
          px: 3,
          maxWidth: 680,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)",
        }}>
          {/* Badge */}
          <Stack
            direction="row" spacing={1} alignItems="center"
            justifyContent="center"
            sx={{
              mb: 3,
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.1s 0.3s",
            }}
          >
            <Box sx={{
              width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
              bgcolor: t.accent,
              "@keyframes livePulse": {
                "0%,100%": { opacity: 1 },
                "50%":      { opacity: 0.3 },
              },
              animation: "livePulse 2.2s ease-in-out infinite",
            }} />
            <Typography sx={{ fontSize: "0.76rem", color: t.textLow }}>
              Launching Wednesday at 10PM
            </Typography>
          </Stack>

          {/* Title */}
          <Typography sx={{
            fontFamily: displayFont,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            fontSize: { xs: "3rem", sm: "4rem", md: "5.5rem" },
            color: t.textHi,
            textShadow: "0 6px 40px rgba(0,0,0,0.6)",
            mb: 2.5,
          }}>
            Whueo?<Box component="span" sx={{ color: t.accent }}>io</Box>
          </Typography>

          {/* Tagline */}
          <Typography sx={{
            fontSize: { xs: "1rem", md: "1.15rem" },
            lineHeight: 1.65,
            color: t.textMid,
            mb: 5,
          }}>
            One canvas each. One word to hide.<br/>
            Draw your truth — or fake it till they vote you out.
          </Typography>

          {/* Countdown */}
          <Box sx={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1.1s 0.4s",
          }}>
            <Timer
                startTime={Date.now()}
                totalTime={Math.floor((LAUNCH_DATE - Date.now()) / 1000)}
                />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}