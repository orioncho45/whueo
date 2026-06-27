import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  IconButton
} from "@mui/material"

import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import banner from "../assets/banner/hero.png"
import { useEffect, useState } from "react"
import theme from "../theme"
export default function About() {
   const [heroVisible, setHeroVisible] = useState(false)
  
const t = theme.palette.t
const displayFont = "'Playfair Display', Georgia, serif"
const TRAILER_URL = ""

  const skills = [
    "Full-Stack Development",
    "Real-Time Multiplayer Systems",
    "React & MERN Stack",
    "Native Mobile Apps",
    "Desktop Applications",
    "PCB & Embedded Systems",
    "UI/UX Engineering",
    "AR/VR Experiences",
    "Backend Architecture"
  ]
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <Box
      sx={{
        minHeight: "100vh",
      
      }}
    >
      <Box sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        mb:10
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
              About Developer
            </Typography>
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
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            // overflow: "hidden",
            borderRadius: 5,
            bgcolor: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            p: { xs: 3, md: 5 },
            pt: 10
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
              top: 0,
              right: 0,
              pointerEvents: "none"
            }}
          />
          
          {/* PROFILE IMAGE */}
          <Avatar
            src="/developer.png"
            alt="Developer"
            sx={{
              width: 120,
              height: 120,
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "4px solid #0b0b0b",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}
          />

          <Stack spacing={4} alignItems="center">
            {/* NAME + TITLE */}
            <Stack spacing={1} alignItems="center">
                <br />
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
              >
                Orion Chowdhury
              </Typography>

              <Typography
                variant="body1"
                textAlign="center"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: 700
                }}
              >
                Full-Stack Developer | Solution Architect |
                Native Mobile Apps | PCB and Devices
              </Typography>
            </Stack>

            {/* BIO */}
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.8)",
                maxWidth: 750
              }}
            >
              A Bangladeshi developer who is passionate about building scalable software,
              immersive experiences, and hardware-integrated
              solutions. Focused on creating products that
              solve real-world problems through engineering,
              creativity, and user-centered design.
            </Typography>

            {/* SKILLS */}
            <Stack spacing={2} width="100%">
              <Typography
                variant="h6"
                fontWeight={600}
                textAlign="center"
              >
                Areas of Expertise
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                gap={1.2}
              >
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      fontWeight: 500
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Divider
              sx={{
                width: "100%",
                borderColor: "rgba(255,255,255,0.08)"
              }}
            />

            {/* CURRENT STATUS */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Current Focus
              </Typography>

              <Typography
                textAlign="center"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.8
                }}
              >
                Currently pursuing Electrical, Electronic &
                Communication Engineering at Military Institute
                of Science and Technology (MIST), while actively
                developing modern web platforms, multiplayer
                systems, and embedded hardware solutions.
              </Typography>
            </Stack>

            {/* EDUCATION */}
            <Stack spacing={2} width="100%">
              <Typography
                variant="h6"
                fontWeight={600}
                textAlign="center"
              >
                Education
              </Typography>

              <Stack
                spacing={2}
                sx={{
                  bgcolor: "rgba(255,255,255,0.03)",
                  borderRadius: 3,
                  p: 3,
                  border: "1px solid rgba(255,255,255,0.06)"
                }}
              >
                <Box>
                  <Typography fontWeight={600}>
                    Military Institute of Science and Technology
                    (MIST)
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Electrical, Electronic & Communication
                    Engineering
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={600}>
                    Notre Dame College, Dhaka
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Higher Secondary Education
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            {/* PERSONAL PHILOSOPHY */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Philosophy
              </Typography>

              <Typography
                textAlign="center"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.8,
                  fontStyle: "italic"
                }}
              >
                “I enjoy transforming ideas into interactive
                systems — whether it’s multiplayer games,
                business platforms, or hardware-connected
                applications.”
              </Typography>
            </Stack>

            {/* SOCIALS */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
            >
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
