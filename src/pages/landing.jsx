import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material"

import PlayArrowRoundedIcon       from "@mui/icons-material/PlayArrowRounded"
import PlayCircleRoundedIcon      from "@mui/icons-material/PlayCircleRounded"
import PeopleRoundedIcon          from "@mui/icons-material/PeopleRounded"
import MeetingRoomRoundedIcon     from "@mui/icons-material/MeetingRoomRounded"

import banner        from "../assets/banner/hero.png"
import drawingBanner from "../assets/banner/drawing.png" // your drawing-feature banner
import { useLocation, useNavigate } from "react-router-dom"
import usePublicRooms  from "../hooks/publicRooms"
import HowToPlay from "../components2/site/howToPlay"
import theme from "../theme"
import HowItWorks from "../components2/site/howItWorks"
import { Facebook } from "@mui/icons-material"
import DiscordIcon from "../components2/utils/icons/discord"
import { DISCORD_URL, FACEBOOK_URL } from "../helper/urls"

const t = theme.palette.t
const displayFont = "'Playfair Display', Georgia, serif"
const TRAILER_URL = ""



// ─── Helpers ──────────────────────────────────────────────────────────────────
const Divider = () => <Box sx={{ borderTop: `1px solid ${t.border}` }} />

const Overline = ({ children, color }) => (
  <Typography sx={{
    fontSize: "0.65rem", fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: color || t.accent,
  }}>
    {children}
  </Typography>
)

const LiveDot = ({ active }) => (
  <Box sx={{
    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
    bgcolor: active ? t.accent : t.textLowest,
    "@keyframes livePulse": {
      "0%,100%": { opacity: 1 },
      "50%":      { opacity: 0.3 },
    },
    animation: active ? "livePulse 2.2s ease-in-out infinite" : "none",
  }} />
)

const cardBase = {
  p: 3,
  borderRadius: "16px",
  background: t.surface,
  border: `1px solid ${t.border}`,
  transition: "border-color 0.22s, transform 0.22s, box-shadow 0.22s",
}



// ══════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
  const navigate = useNavigate()
  const {hash} = useLocation()
  const { activePlayers, activeRooms } = usePublicRooms({ limit: 10 })
  const [heroVisible, setHeroVisible] = useState(false)

  const liveCount  = (activeRooms || []).length
  const hasActivity = (activePlayers || 0) >= 2 || liveCount > 0

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (hash) {
      // Remove the '#' from the string to get the pure ID
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);

      if (element) {
        // Wrap in a tiny timeout to ensure the DOM has fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [hash]); // Runs every time the URL hash changes

  return (
    <Box sx={{ minHeight: "100vh", color: t.textHi, overflow: "hidden" }}>

      {/* ══ HERO — fullscreen, centered, fading in ══════════════════════════ */}
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
            {/* Live badge */}
            {hasActivity && (
              <Stack
                direction="row" spacing={1} alignItems="center"
                justifyContent="center"
                sx={{
                  mb: 3,
                  opacity: heroVisible ? 1 : 0,
                  transition: "opacity 1.1s 0.3s",
                }}
              >
                <LiveDot active />
                <Typography sx={{ fontSize: "0.76rem", color: t.textLow }}>
                  {activePlayers} players in the shadows right now
                </Typography>
              </Stack>
            )}

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
              mb: 4,
            }}>
              One canvas each. One word to hide.<br/>

              Draw your truth — or fake it till they vote you out.
            </Typography>

            {/* CTAs */}
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="center"
              flexWrap="wrap"
            >
              <Button
                size="large"
                variant="contained"
                startIcon={<PlayArrowRoundedIcon />}
                onClick={() => navigate("/play")}
                sx={{
                  px: 3.5, py: 1.3,
                  borderRadius: "12px",
                  fontWeight: 800, fontSize: "0.9rem",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "0 0 28px rgba(83,117,63,0.45)" },
                }}
              >
                Start Playing
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => navigate("/how-to-play")}
                sx={{
                  px: 3, py: 1.3,
                  borderRadius: "12px",
                  fontWeight: 700, fontSize: "0.9rem",
                  borderColor: "rgba(255,255,255,0.18)",
                  color: t.textMid,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.35)",
                    color: t.textHi,
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                How It Works
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Scroll nudge */}
        <Box sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: heroVisible ? 0.35 : 0,
          transition: "opacity 1.5s 1.2s",
          "@keyframes nudge": {
            "0%,100%": { transform: "translateX(-50%) translateY(0)" },
            "50%":     { transform: "translateX(-50%) translateY(6px)" },
          },
          animation: "nudge 2.4s ease-in-out infinite",
        }}>
          <Box sx={{
            width: 24, height: 24,
            borderRight: `1.5px solid ${t.textLowest}`,
            borderBottom: `1.5px solid ${t.textLowest}`,
            transform: "rotate(45deg)",
          }} />
        </Box>
      </Box>

      <Divider />

      {/* ══ ABOUT — short centered intro ═══════════════════════════════════ */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 }, textAlign: "center" }}>
        <Overline>What Is This</Overline>
        <Typography sx={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: { xs: "1.8rem", md: "2.6rem" },
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          mt: 1.5, mb: 3,
          color: t.textHi,
        }}>
          A drawing game built on silence — and suspicion.<br />
          <Box component="span" sx={{ color: t.accent }}>built on trust — and lies.</Box>
        </Typography>
        <Typography sx={{
          fontSize: { xs: "0.98rem", md: "1.07rem" },
          lineHeight: 1.85,
          color: t.textMid,
          maxWidth: 560,
          mx: "auto",
        }}>
          Everyone picks up a brush. Most players share a secret word and draw it as best they can. The imposter gets nothing — no word, no hint — and must bluff their way through every stroke. When the time is up or the vote session is called, the room votes. One wrong line and you're exposed.
        </Typography>
      </Container>

      <Divider />

      {/* ══ DRAWING FEATURE — special banner section ════════════════════════ */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          component="img"
          src={drawingBanner}
          alt=""
          sx={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.18,
          }}
        />
        <Box sx={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(8,14,10,0.95) 0%, rgba(8,14,10,0.7) 60%, rgba(8,14,10,0.92) 100%)`,
        }} />

        <Container maxWidth="xl" sx={{ py: { xs: 8, md: 10 }, position: "relative" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 5, md: 8 }}
            alignItems="center"
          >
            {/* Left — copy */}
            <Box flex={1}>
              <Typography sx={{
                fontFamily: displayFont,
                fontWeight: 900,
                fontSize: { xs: "2rem", md: "2.8rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: t.textHi,
                mb: 2.5,
              }}>
                Your canvas is your alibi.<br />
              </Typography>
              <Typography sx={{
                fontSize: "0.92rem",
                lineHeight: 1.85,
                color: t.textMid,
                mb: 3.5,
                maxWidth: 460,
              }}>
                In most games, you talk your way out. Here, you draw. Every player gets their own canvas and paints what they know — or what they're pretending to know. The imposter watches the others, mimics the shapes, and hopes no one notices the bluff hiding in the brushstrokes.
              </Typography>
            </Box>

            {/* Right — image preview */}
            <Box
              flex={1}
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${t.border}`,
                aspectRatio: "4 / 3",
                width: "100%",
                bgcolor: t.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={drawingBanner}
                alt="Drawing mode preview"
                sx={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* ══ TRAILER ════════════════════════════════════════════════════════ */}
      <Container maxWidth="xl" sx={{ py: { xs: 7, md: 9 } }}>
        <Stack spacing={4}>
          <Stack spacing={0.75} textAlign={{ xs: "left" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PlayCircleRoundedIcon sx={{ fontSize: 15, color: t.accent }} />
              <Overline>Watch</Overline>
            </Stack>
            <Typography sx={{
              fontFamily: displayFont,
              fontWeight: 900,
              fontSize: { xs: "1.6rem", md: "2rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}>
              See It In Action
            </Typography>
            <Typography sx={{ fontSize: "0.83rem", color: t.textLow }}>
              60 seconds of bluffing, voting, and getting caught.
            </Typography>
          </Stack>

          <Box sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "18px",
            overflow: "hidden",
            border: `1px solid ${t.border}`,
            bgcolor: t.surface,
          }}>
            {TRAILER_URL ? (
              <Box
                component="iframe"
                src={TRAILER_URL}
                title="Whueo?io Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            ) : (
              <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ width: "100%", height: "100%" }}>
                <PlayCircleRoundedIcon sx={{ fontSize: 52, color: t.textLowest }} />
                <Typography sx={{ fontSize: "0.82rem", color: t.textLow }}>
                  Trailer coming soon
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>

      <Divider />

      {/* ══ HOW IT WORKS — cards with screenshots ══════════════════════════ */}
      <HowItWorks/>

      <Divider />

      {/* ══ HOW TO PLAY ════════════════════════════════════════════════════ */}
      <Container maxWidth="xl" sx={{ py: { xs: 7, md: 9 } }}>
        <HowToPlay />
      </Container>

      <Divider />

      {/* ══ LIVE STATS — only shown if enough activity ══════════════════════ */}
      {hasActivity && (
        <>
          <Container maxWidth="xl" sx={{ py: { xs: 6, md: 7 } }}>
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Stack spacing={0.75}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <LiveDot active />
                  <Overline>Live Now</Overline>
                </Stack>
                <Typography sx={{
                  fontFamily: displayFont,
                  fontWeight: 900,
                  fontSize: { xs: "1.5rem", md: "1.9rem" },
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}>
                  People are playing right now
                </Typography>
              </Stack>

              <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
                {activePlayers >= 1 && (
                  <Paper elevation={0} sx={{
                    ...cardBase,
                    px: 4, py: 3,
                    textAlign: "center",
                    minWidth: 140,
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={0.75}>
                      <PeopleRoundedIcon sx={{ fontSize: 18, color: t.accent }} />
                    </Stack>
                    <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: t.textHi, lineHeight: 1 }}>
                      {activePlayers}
                    </Typography>
                    <Typography sx={{ fontSize: "0.74rem", color: t.textLow, mt: 0.5 }}>
                      active players
                    </Typography>
                  </Paper>
                )}
                {liveCount >= 1 && (
                  <Paper elevation={0} sx={{
                    ...cardBase,
                    px: 4, py: 3,
                    textAlign: "center",
                    minWidth: 140,
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={0.75}>
                      <MeetingRoomRoundedIcon sx={{ fontSize: 18, color: t.warm }} />
                    </Stack>
                    <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: t.textHi, lineHeight: 1 }}>
                      {liveCount}
                    </Typography>
                    <Typography sx={{ fontSize: "0.74rem", color: t.textLow, mt: 0.5 }}>
                      open room{liveCount > 1 ? "s" : ""}
                    </Typography>
                  </Paper>
                )}
              </Stack>

              <Button
                variant="outlined"
                onClick={() => navigate("/play/public_room")}
                sx={{
                  px: 3, py: 1.1,
                  borderRadius: "11px",
                  fontWeight: 700, fontSize: "0.85rem",
                  borderColor: t.accentBorder,
                  color: t.accent,
                  "&:hover": {
                    borderColor: t.borderHi,
                    bgcolor: t.accentDim,
                  },
                }}
              >
                Browse Open Rooms
              </Button>
            </Stack>
          </Container>
          <Divider />
        </>
      )}

      {/* ══ FOOTER CTA ════════════════════════════════════════════════════ */}
      <Container maxWidth="md" sx={{ py: { xs: 9, md: 12 }, textAlign: "center" }}>
        <Typography sx={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: { xs: "2rem", md: "3rem" },
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: t.textHi,
          mb: 2.5,
        }}>
          Ready to<br />
          <Box component="span" sx={{ color: t.accent }}>find the imposter?</Box>
        </Typography>
        <Typography sx={{
          fontSize: "0.95rem", color: t.textMid,
          lineHeight: 1.7, mb: 4, maxWidth: 400, mx: "auto",
        }}>
          No download. No account. Just open a room and let the suspicion begin.
        </Typography>
        <Button
          size="large"
          variant="contained"
          startIcon={<PlayArrowRoundedIcon />}
          onClick={() => navigate("/play")}
          sx={{
            px: 4.5, py: 1.4,
            borderRadius: "13px",
            fontWeight: 800, fontSize: "0.95rem",
            boxShadow: "none",
            "&:hover": { boxShadow: "0 0 36px rgba(83,117,63,0.45)" },
          }}
        >
          Play Free Now
        </Button>
      </Container>
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 }, textAlign: "center" }}>
        <Paper elevation={0} sx={{
          ...cardBase,
          py: { xs: 5, md: 6.5 },
          px: { xs: 3, md: 7 },
        }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={1.25}>
            <PeopleRoundedIcon sx={{ fontSize: 16, color: t.accent }} />
            <Overline>Community</Overline>
          </Stack>
      
          <Typography sx={{
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            mb: 2.5,
            color: t.textHi,
          }}>
            Find your fellow<br />
            <Box component="span" sx={{ color: t.accent }}>imposters online.</Box>
          </Typography>
      
          <Typography sx={{
            fontSize: { xs: "0.95rem", md: "1.02rem" },
            lineHeight: 1.85,
            color: t.textMid,
            maxWidth: 460,
            mx: "auto",
            mb: 4,
          }}>
            Squad up for a round, vote on new word packs, report bugs straight to the people building the game, and gloat about the bluff that got you crowned imposter three rounds running.
          </Typography>
      
          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button
              size="large"
              variant="contained"
              startIcon={<DiscordIcon fontSize="0.9rem" />}
              onClick={() => window.open(DISCORD_URL, "_blank", "noopener,noreferrer")}
              sx={{
                px: 3.5, py: 1.3,
                borderRadius: "12px",
                fontWeight: 800, fontSize: "0.9rem",
                boxShadow: "none",
                "&:hover": { boxShadow: "0 0 28px rgba(83,117,63,0.45)" },
              }}
            >
              Join the Discord
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<Facebook />}
              onClick={() => window.open(FACEBOOK_URL, "_blank", "noopener,noreferrer")}
              sx={{
                px: 3, py: 1.3,
                borderRadius: "12px",
                fontWeight: 700, fontSize: "0.9rem",
                borderColor: "rgba(255,255,255,0.18)",
                color: t.textMid,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.35)",
                  color: t.textHi,
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Follow on Facebook
            </Button>
          </Stack>
        </Paper>
      </Container>

    </Box>
  )
}