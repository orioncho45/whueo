import { useEffect, useState } from "react"
import theme from "../theme"
import banner from "../assets/banner/hero.png"
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material"

const sections = [
  {
    title: "Information We Collect",
    content:
      "To operate the game, we may collect usernames chosen by players, room participation information, anonymous gameplay activity, and basic technical information necessary to maintain multiplayer connections."
  },
  {
    title: "Information We Do Not Collect",
    content:
      "We do not intentionally collect real names, passwords, payment information, government identification numbers, or other sensitive personal information."
  },
  {
    title: "How We Use Information",
    content:
      "Information may be used to operate multiplayer matches, improve gameplay, prevent abuse, maintain server stability, and diagnose technical issues."
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell, rent, or trade personal information. Information may only be disclosed when required by law or to protect the integrity and security of the service."
  },
  {
    title: "Cookies & Local Storage",
    content:
      "The game may use browser storage, cookies, or similar technologies to remember preferences and support functionality."
  },
  {
    title: "Data Retention",
    content:
      "Temporary gameplay information may be automatically removed after sessions end. Data is retained only as long as necessary to operate the service."
  },
  {
    title: "Children's Privacy",
    content:
      "Players under the age required by local laws should use the service under parental supervision."
  },
  {
    title: "Security",
    content:
      "Reasonable measures are taken to protect information and maintain service security. However, no internet-based service can guarantee absolute security."
  },
  {
    title: "Changes To This Policy",
    content:
      "This Privacy Policy may be updated periodically. Significant changes will be reflected on this page together with an updated revision date."
  },
  {
    title: "Contact",
    content:
      "If you have questions regarding this Privacy Policy, please contact us through the official contact methods available on the website."
  }
]

export default function PrivacyPolicy() {
  const [heroVisible, setHeroVisible] = useState(false)
  const t = theme.palette.t
  const displayFont = "'Playfair Display', Georgia, serif"

  useEffect(() => {
    const timeout = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(timeout)
  }, [])
  useEffect(() => {
    document.title = "Privacy Policy | Whueo?.io";
  }, []);

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
              Privacy Policy
            </Typography>
            <Typography
              sx={{
                color: t.textLowest,
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 520,
                mx: "auto"
              }}
            >
              Your privacy is important to us.
                This page explains what information
                Whueo?io collects, how it is used,
                and the choices available to players.
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 520,
                mx: "auto"
              }}
            > Last updated: June, 2026</Typography>
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