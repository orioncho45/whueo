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
import EmailIcon from "@mui/icons-material/Email"
import banner from "../assets/banner/hero.png"
import { useEffect, useState } from "react"
import theme from "../theme"
import { Language } from "@mui/icons-material"
export default function About() {
   const [heroVisible, setHeroVisible] = useState(false)
  
const t = theme.palette.t
const displayFont = "'Playfair Display', Georgia, serif"
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
            radial-gradient(ellipse at center, var(--whueo-rgba_8_14_10_0p2) 0%, var(--whueo-rgba_8_14_10_0p72) 100%),
            linear-gradient(180deg, var(--whueo-rgba_8_14_10_0p1) 0%, var(--whueo-rgba_8_14_10_0p9) 100%)
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
              textShadow: "0 6px 40px var(--whueo-rgba_0_0_0_0p6)",
              mb: 2.5,
            }}>
              Behind The Canvas
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
            border: "1px solid var(--whueo-rgba_255_255_255_0p08)",
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
              bgcolor: "var(--whueo-rgba_21_255_0_0p12)",
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
              border: "4px solid var(--whueo-hex_0b0b0b)",
              boxShadow: "0 10px 40px var(--whueo-rgba_0_0_0_0p5)"
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
                  color: "var(--whueo-rgba_255_255_255_0p7)",
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
                color: "var(--whueo-rgba_255_255_255_0p8)",
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
                      bgcolor: "var(--whueo-rgba_255_255_255_0p06)",
                      border: "1px solid var(--whueo-rgba_255_255_255_0p08)",
                      color: "var(--whueo-hex_ffffff)",
                      fontWeight: 500
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Divider
              sx={{
                width: "100%",
                borderColor: "var(--whueo-rgba_255_255_255_0p08)"
              }}
            />


            {/* PERSONAL PHILOSOPHY */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Philosophy
              </Typography>

              <Typography
                textAlign="center"
                sx={{
                  color: "var(--whueo-rgba_255_255_255_0p75)",
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
                component="a"
                href="https://personal-b9h7.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website Portfolio"
                sx={{
                  bgcolor: "var(--whueo-rgba_255_255_255_0p05)",
                  "&:hover": {
                    bgcolor: "var(--whueo-rgba_255_255_255_0p1)"
                  }
                }}
              >
                <Language />
              </IconButton>

              <IconButton
                component="a"
                href="https://github.com/orioncho45" // Replace with your actual profile tail
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                sx={{
                  bgcolor: "var(--whueo-rgba_255_255_255_0p05)",
                  "&:hover": {
                    bgcolor: "var(--whueo-rgba_255_255_255_0p1)"
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>

              <IconButton
                component="a"
                href="mailto:orioncho45@gmail.com"
                aria-label="Email Contact"
                sx={{
                  bgcolor: "var(--whueo-rgba_255_255_255_0p05)",
                  "&:hover": {
                    bgcolor: "var(--whueo-rgba_255_255_255_0p1)"
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
