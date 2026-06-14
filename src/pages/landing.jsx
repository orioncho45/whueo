import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  MailOutline,
  Paper,
  Stack,
  Toolbar,
  Typography,
  LinearProgress,
  IconButton,
} from "@mui/material"
import MailOutlineIcon from "@mui/icons-material/MailOutline"

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import PublicRoundedIcon from "@mui/icons-material/PublicRounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import LockRoundedIcon from "@mui/icons-material/LockRounded"
import TagRoundedIcon from "@mui/icons-material/TagRounded"
import CodeRoundedIcon from "@mui/icons-material/CodeRounded"
import RouterRoundedIcon from "@mui/icons-material/RouterRounded"
import mascot from "../assets/mascot/success.png"
import Footer from "../components2/utils/footer"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// ─── Brand tokens ────────────────────────────────────────────────────────────
const brand = {
  green:      "brand.light",
  greenLight: "#4ade80",
  greenDim:   "rgba(74,222,128,0.10)",
  greenBorder:"rgba(74,222,128,0.18)",
  bg:         "brand.dark",
  surface:    "rgba(255,255,255,0.04)",
  surfaceHover:"rgba(255,255,255,0.07)",
  border:     "rgba(255,255,255,0.08)",
  borderHover:"rgba(74,222,128,0.30)",
  textMid:    "rgba(255,255,255,0.65)",
  textLow:    "rgba(255,255,255,0.40)",
  textLowest: "rgba(255,255,255,0.25)",
}

// ─── Reusable card sx ────────────────────────────────────────────────────────
const cardSx = (accent = false) => ({
  flex: 1,
  p: 3,
  borderRadius: 4,
  background: brand.surface,
  border: `1px solid ${accent ? brand.greenBorder : brand.border}`,
  backdropFilter: "blur(8px)",
  transition: "border-color 0.2s, transform 0.2s",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: brand.borderHover,
  },
})

// ─── SLOTS (always render 3) ──────────────────────────────────────────────────
const ROOM_SLOTS = 3

// --- NEW: Landing page specific navbar (keeps global navbar untouched) ---
export function LandingNavbar() {
  const navigate = useNavigate()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <AppBar
        position={isSticky ? "fixed" : "static"}
        elevation={isSticky ? 3 : 0}
        sx={{
          backgroundColor: isSticky ? "brand.dark" : "transparent",
          borderBottom: 1,
          borderColor: "divider",
          color: "white",
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          transition: "all 200ms ease",
        }}
      >
        <Toolbar sx={{ minHeight: 64, display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", width: 100, objectFit: "contain" }}
          />

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigate("/how-to-play")}>How To Play</Button>
            <Button color="inherit" onClick={() => navigate("/about")}>About Developer</Button>
            <IconButton color="inherit" onClick={() => navigate("/subscribe")} aria-label="subscribe">
              <MailOutlineIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* spacer so content doesn't jump when AppBar becomes fixed */}
      {isSticky && <Toolbar sx={{ minHeight: 64 }} />}
    </>
  )
}

export default function LandingPage({
  activePlayers = 0,
  publicRooms   = [],
  activeRooms   = 0,
}) {
  const navigate   = useNavigate()
  const liveRooms  = publicRooms.slice(0, ROOM_SLOTS)
  const emptySlots = ROOM_SLOTS - liveRooms.length
  const hasLive    = liveRooms.length > 0
  const hasActivity= activePlayers >= 8 || hasLive

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: brand.bg,
        color: "white",
        overflow: "hidden",
      }}
    >

      {/* ══════════════════════════════════════════════
          HERO  — compact two-column
      ══════════════════════════════════════════════ */}
      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 9, md: 10 }, pb: { xs: 7, md: 8 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 4 }}
          alignItems="center"
          justifyContent="space-between"
        >

          {/* LEFT */}
          <Box flex={1}>
            <Stack spacing={3}>

              <Chip
                icon={<RouterRoundedIcon sx={{ fontSize: 15 }} />}
                label="Realtime Multiplayer · Social Deduction"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: brand.greenDim,
                  border: `1px solid ${brand.greenBorder}`,
                  color: brand.greenLight,
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  borderRadius: "99px",
                }}
              />

              {/* Title with animated underline */}
              <Box sx={{ position: "relative", width: "fit-content" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    fontSize: { xs: "3.8rem", md: "6rem" },
                    "& .accent": { color: brand.greenLight },
                  }}
                >
                  Wh<span className="accent">u</span>eo
                </Typography>
                {/* Sweep underline — CSS animation via sx keyframe */}
                <Box
                  sx={{
                    height: "4px",
                    borderRadius: "2px",
                    background: brand.green,
                    mt: "6px",
                    width: 0,
                    "@keyframes sweepIn": {
                      from: { width: "0%" },
                      to:   { width: "100%" },
                    },
                    animation: "sweepIn 0.7s cubic-bezier(.16,1,.3,1) 0.3s forwards",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.8,
                  maxWidth: 440,
                  color: brand.textMid,
                }}
              >
                Find the imposters before they manipulate the room.
                One hidden word. Endless suspicion.
              </Typography>

              {/* CTA row */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<PlayArrowRoundedIcon />}
                  onClick={() => navigate("/play/public_room")}
                  sx={{
                    px: 4,
                    py: 1.4,
                    borderRadius: 3,
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    // bgcolor: brand.green,
                    // color: "#040d1a",
                    // boxShadow: "none",
                    // "&:hover": { bgcolor: brand.greenLight, boxShadow: "none" },
                  }}
                >
                  Play Now
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => navigate("/how-to-play")}
                  sx={{
                    px: 4,
                    py: 1.4,
                    borderRadius: 3,
                    fontWeight: 700,
                    borderColor: brand.border,
                    color: "primary.main",
                    "&:hover": {
                      borderColor: brand.greenBorder,
                      color: brand.greenLight,
                      bgcolor: "transparent",
                    },
                  }}
                >
                  How To Play
                </Button>
              </Stack>

              {/* Live indicator */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 7, height: 7,
                    borderRadius: "50%",
                    bgcolor: hasActivity ? brand.green : "rgba(255,255,255,0.2)",
                    "@keyframes blink": {
                      "0%,100%": { opacity: 1 },
                      "50%":      { opacity: 0.35 },
                    },
                    animation: hasActivity ? "blink 2s ease-in-out infinite" : "none",
                  }}
                />
                <Typography sx={{ fontSize: "0.84rem", color: brand.textLow }}>
                  {hasActivity
                    ? `${activePlayers} players currently causing chaos.`
                    : "Create a room and begin the deception."}
                </Typography>
              </Stack>

            </Stack>
          </Box>

          {/* RIGHT — mascot */}
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: { xs: 180, md: 220 },
                height: { xs: 180, md: 220 },
                borderRadius: "50%",
                bgcolor: brand.greenDim,
                border: `1px solid ${brand.greenBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "@keyframes float": {
                  "0%,100%": { transform: "translateY(0)" },
                  "50%":      { transform: "translateY(-10px)" },
                },
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <Box
                component="img"
                src={mascot}
                alt="Whueo Mascot"
                sx={{
                  width: "78%",
                  height: "auto",
                  filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.4))",
                }}
              />
            </Box>
          </Box>

        </Stack>
      </Container>

      {/* ══════════════════════════════════════════════
          LIVE ROOMS — hybrid 3-slot grid
      ══════════════════════════════════════════════ */}
      <Box sx={{ borderTop: `1px solid ${brand.border}` }}>
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 7 } }}>
          <Stack spacing={4}>

            {/* Section head */}
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <GroupsRoundedIcon
                  sx={{ fontSize: 18, color: brand.greenLight }}
                />
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: brand.greenLight,
                  }}
                >
                  Live Rooms
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={800}>
                Public Matches
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", color: brand.textLow }}>
                {hasLive
                  ? `${liveRooms.length} of ${ROOM_SLOTS} slots active — rooms open frequently.`
                  : "No rooms live right now. Create one and others will join."}
              </Typography>
            </Stack>

            {/* 3-slot grid */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
            >

              {/* Live room cards */}
              {liveRooms.map(room => {
                const isWaiting = room.state?.toLowerCase() === "waiting"
                const fill = Math.round((room.players / room.maxPlayers) * 100)
                return (
                  <Paper
                    key={room.id}
                    elevation={0}
                    sx={cardSx()}
                  >
                    <Stack spacing={2.5}>

                      {/* Card head */}
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography
                          sx={{ fontSize: "0.78rem", color: brand.textLow, fontWeight: 600 }}
                        >
                          #{room.id}
                        </Typography>
                        <Chip
                          label={room.state}
                          size="small"
                          sx={{
                            bgcolor: isWaiting
                              ? "rgba(251,191,36,0.10)"
                              : brand.greenDim,
                            color: isWaiting ? "#fbbf24" : brand.greenLight,
                            border: `1px solid ${isWaiting ? "rgba(251,191,36,0.2)" : brand.greenBorder}`,
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            borderRadius: "99px",
                          }}
                        />
                      </Stack>

                      {/* Players + bar */}
                      <Stack spacing={1}>
                        <Typography sx={{ fontSize: "0.82rem", color: brand.textMid }}>
                          <Box component="span" sx={{ color: "#fff", fontWeight: 700 }}>
                            {room.players}
                          </Box>
                          {" / "}{room.maxPlayers} players
                        </Typography>
                        <Box
                          sx={{
                            height: 4,
                            bgcolor: "rgba(255,255,255,0.08)",
                            borderRadius: "99px",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${fill}%`,
                              bgcolor: brand.green,
                              borderRadius: "99px",
                              transition: "width 0.4s ease",
                            }}
                          />
                        </Box>
                      </Stack>

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          borderRadius: 2.5,
                          py: 1.1,
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          bgcolor: brand.greenDim,
                          color: brand.greenLight,
                          border: `1px solid ${brand.greenBorder}`,
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "rgba(74,222,128,0.18)",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Join Room
                      </Button>

                    </Stack>
                  </Paper>
                )
              })}

              {/* Empty ghost slots */}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <Paper
                  key={`empty-${i}`}
                  elevation={0}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.07)",
                    opacity: 0.5,
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: "0.78rem", color: brand.textLowest }}>
                      —
                    </Typography>
                    <Chip
                      label="Empty"
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.04)",
                        color: brand.textLowest,
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "99px",
                        fontSize: "0.7rem",
                      }}
                    />
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      color: brand.textLowest,
                      textAlign: "center",
                      py: 1,
                    }}
                  >
                    No room in this slot
                  </Typography>
                  <Box
                    sx={{
                      height: 36,
                      borderRadius: 2.5,
                      bgcolor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  />
                </Paper>
              ))}

            </Stack>

            {/* Live note */}
            {hasLive && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 6, height: 6,
                    borderRadius: "50%",
                    bgcolor: brand.green,
                    "@keyframes blink2": {
                      "0%,100%": { opacity: 1 },
                      "50%": { opacity: 0.3 },
                    },
                    animation: "blink2 2s ease-in-out infinite",
                  }}
                />
                <Typography sx={{ fontSize: "0.78rem", color: brand.textLowest }}>
                  {activePlayers} players active across all rooms
                </Typography>
              </Stack>
            )}

          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════
          MORE WAYS TO PLAY — always visible
      ══════════════════════════════════════════════ */}
      <Box sx={{ borderTop: `1px solid ${brand.border}` }}>
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 7 } }}>
          <Stack spacing={4}>

            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: brand.greenLight,
                }}
              >
                Jump in
              </Typography>
              <Typography variant="h5" fontWeight={800}>
                More Ways To Play
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", color: brand.textLow }}>
                Public matches, private rooms, or join a friend instantly.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
            >

              {/* Public */}
              <Paper elevation={0} sx={{ ...cardSx(true), flex: 1 }}>
                <Stack spacing={2.5}>
                  <PublicRoundedIcon sx={{ fontSize: 36, color: brand.greenLight }} />
                  <Box>
                    <Typography variant="h6" fontWeight={700} mb={0.5}>
                      Public Match
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.75, color: brand.textMid }}>
                      Join live public rooms and compete with players around the world.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/play/public_room")}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.2,
                      fontWeight: 700,
                      // bgcolor: brand.green,
                      boxShadow: "none",
                      // "&:hover": { bgcolor: brand.greenLight, boxShadow: "none" },
                    }}
                  >
                    Find Match
                  </Button>
                </Stack>
              </Paper>

              {/* Private */}
              <Paper elevation={0} sx={{ ...cardSx(), flex: 1 }}>
                <Stack spacing={2.5}>
                  <LockRoundedIcon sx={{ fontSize: 36, color: "#fbbf24" }} />
                  <Box>
                    <Typography variant="h6" fontWeight={700} mb={0.5}>
                      Private Room
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.75, color: brand.textMid }}>
                      Play privately with friends using fully customisable room settings.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/play/create_username")}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.2,
                      fontWeight: 700,
                      borderColor: brand.border,
                      color: "white",
                      "&:hover": {
                        borderColor: brand.greenBorder,
                        color: brand.greenLight,
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    Create Room
                  </Button>
                </Stack>
              </Paper>

              {/* Code */}
              <Paper elevation={0} sx={{ ...cardSx(), flex: 1 }}>
                <Stack spacing={2.5}>
                  <TagRoundedIcon sx={{ fontSize: 36, color: "#60a5fa" }} />
                  <Box>
                    <Typography variant="h6" fontWeight={700} mb={0.5}>
                      Enter Room Code
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.75, color: brand.textMid }}>
                      Already have a code? Join instantly without waiting in any queue.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/play/join_room")}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.2,
                      fontWeight: 700,
                      borderColor: brand.border,
                      color: "white",
                      "&:hover": {
                        borderColor: brand.greenBorder,
                        color: brand.greenLight,
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    Join By Code
                  </Button>
                </Stack>
              </Paper>

            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <Box sx={{ borderTop: `1px solid ${brand.border}` }}>
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 7 } }}>
          <Stack spacing={4}>

            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: brand.greenLight,
                }}
              >
                The loop
              </Typography>
              <Typography variant="h5" fontWeight={800}>
                How It Works
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", color: brand.textLow }}>
                Fast rounds. Hidden roles. Pure social chaos.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
            >
              {[
                {
                  step: "01",
                  title: "Join Players",
                  desc: "Enter a public or private room and ready up. Anyone can create a game in seconds.",
                },
                {
                  step: "02",
                  title: "Hidden Imposters",
                  desc: "Some players secretly receive a different word. They must blend in and avoid detection.",
                },
                {
                  step: "03",
                  title: "Discuss & Vote",
                  desc: "Debate suspicious behaviour and vote to eliminate imposters before they outnumber you.",
                },
              ].map(item => (
                <Paper
                  key={item.step}
                  elevation={0}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${brand.border}`,
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: brand.greenLight,
                      }}
                    >
                      Step {item.step}
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.75, color: brand.textMid }}>
                      {item.desc}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>

          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <Box sx={{ borderTop: `1px solid ${brand.border}` }}>
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ py: 3 }}
          >
            <Typography sx={{ fontSize: "0.8rem", color: brand.textLowest }}>
              © 2025 Whueo. All rights reserved.
            </Typography>

            <Stack direction="row" spacing={2.5} alignItems="center">
              {["Privacy", "Terms"].map(label => (
                <Typography
                  key={label}
                  component="a"
                  href="#"
                  sx={{
                    fontSize: "0.8rem",
                    color: brand.textLowest,
                    textDecoration: "none",
                    "&:hover": { color: brand.textMid },
                  }}
                >
                  {label}
                </Typography>
              ))}

              {/* Developer link — subtle pill */}
              <Box
                // component="a"
                onClick={e=>{
                  e.preventDefault();
                  navigate("/about")
                }}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "rgba(74,222,128,0.55)",
                  border: "1px solid rgba(74,222,128,0.15)",
                  borderRadius: "6px",
                  px: 1.25,
                  py: 0.5,
                  textDecoration: "none",
                  transition: "color 0.15s, border-color 0.15s",
                  "&:hover": {
                    color: brand.greenLight,
                    borderColor: brand.greenBorder,
                  },
                }}
              >
                <CodeRoundedIcon sx={{ fontSize: 15 }} />
                About Developer
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

    </Box>
  )
}