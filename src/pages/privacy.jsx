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
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: 2
      }}
    >
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

            <Stack spacing={2}>

              <Typography
                variant="h3"
                fontWeight={800}
              >
                Privacy Policy
              </Typography>

              <Chip
                label="Last Updated: June 2026"
                sx={{
                  width: "fit-content"
                }}
              />

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8
                }}
              >
                Your privacy is important to us.
                This page explains what information
                Whueo?io collects, how it is used,
                and the choices available to players.
              </Typography>

            </Stack>

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