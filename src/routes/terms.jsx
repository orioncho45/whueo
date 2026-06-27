import { useEffect, useState } from "react"
import theme from "../theme"
import banner from "../assets/banner/hero.png"
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material"

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using Whueo?io, you agree to comply with these Terms of Service."
  },
  {
    title: "Eligibility",
    content:
      "You must comply with applicable laws and regulations when using the service."
  },
  {
    title: "Player Conduct",
    content:
      "Players may not harass, threaten, impersonate, exploit bugs, cheat, spam, or intentionally disrupt gameplay."
  },
  {
    title: "Fair Play Policy",
    content:
      "The use of automation, cheats, exploits, modified clients, or any method intended to gain an unfair advantage is prohibited."
  },
  {
    title: "User Content",
    content:
      "Players are responsible for usernames, messages, and other content they submit while using the service."
  },
  {
    title: "Private Rooms",
    content:
      "Hosts are responsible for moderation within private rooms. We are not responsible for player behavior inside private matches."
  },
  {
    title: "Service Availability",
    content:
      "The service may be modified, interrupted, suspended, or discontinued at any time without notice."
  },
  {
    title: "Account & Access Restrictions",
    content:
      "We reserve the right to remove players, restrict access, or take action against users who violate these Terms."
  },
  {
    title: "Intellectual Property",
    content:
      "All game assets, branding, graphics, software, and content related to Whueo?io remain the property of their respective owners."
  },
  {
    title: "Limitation of Liability",
    content:
      "Whueo?io is provided 'as is' without warranties of any kind. We are not liable for data loss, interruptions, gameplay issues, or damages arising from use of the service."
  },
  {
    title: "Changes to Terms",
    content:
      "These Terms may be updated periodically. Continued use of the service constitutes acceptance of any updated Terms."
  },
  {
    title: "Contact",
    content:
      "Questions regarding these Terms may be directed through the official contact methods provided on the website."
  }
]

export default function Terms() {
  const [heroVisible, setHeroVisible] = useState(false)
  const t = theme.palette.t
  const displayFont = "'Playfair Display', Georgia, serif"

  useEffect(() => {
    const timeout = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Box sx={{ minHeight: "100vh"}}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
          mb: 10
        }}
      >
        <Box
          component="img"
          src={banner}
          alt=""
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at center, rgba(8,14,10,0.2) 0%, rgba(8,14,10,0.72) 100%),
              linear-gradient(180deg, rgba(8,14,10,0.1) 0%, rgba(8,14,10,0.9) 100%)
            `
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              px: 3,
              maxWidth: 680,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)"
            }}
          >
            <Typography
              sx={{
                fontFamily: displayFont,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                fontSize: { xs: "3rem", sm: "4rem", md: "5.5rem" },
                color: t.textHi,
                textShadow: "0 6px 40px rgba(0,0,0,0.6)",
                mb: 2.5
              }}
            >
              Terms
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 520,
                mx: "auto"
              }}
            >
              Last updated: June, 2026
            </Typography>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="md">

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            bgcolor: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)"
          }}
        >

          <Stack spacing={4}>

            

            <Divider />

            {sections.map((section) => (
              <Stack
                key={section.title}
                spacing={1.5}
              >

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {section.title}
                </Typography>

                <Typography
                  sx={{
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.75)"
                  }}
                >
                  {section.content}
                </Typography>

              </Stack>
            ))}

          </Stack>

        </Paper>

      </Container>
    </Box>
  )
}