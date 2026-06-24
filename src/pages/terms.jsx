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
                Terms
              </Typography>

              <Chip
                label="Last Updated: June 2026"
                sx={{
                  width: "fit-content"
                }}
              />

              

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