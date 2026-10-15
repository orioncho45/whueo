import {
  Box,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material"
import { GameAvatar } from "../utils/avatar"



const artistTips = [
  "Pay attention to what everyone says. Imposters often struggle to stay consistent.",
  "Use the secret word naturally during discussions.",
  "Don't accuse too early. Gather information first.",
  "Watch who avoids speaking or changes stories.",
  "Vote carefully. Eliminating a artist helps the imposters."
]

const imposterTips = [
  "You don't know the real word, so listen carefully.",
  "Blend in before making accusations.",
  "Use vague descriptions to avoid exposing yourself.",
  "Let artists suspect each other whenever possible.",
  "Survive until imposters equal the remaining artists."
]

function AdviceCard({
  text,
  id,
  imposter = false
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-start"
    >
      <GameAvatar id={id} imposter={imposter} />

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          bgcolor: imposter
            ? "var(--whueo-rgba_239_68_68_0p08)"
            : "var(--whueo-rgba_255_255_255_0p05)",
          border: imposter
            ? "1px solid var(--whueo-rgba_239_68_68_0p15)"
            : "1px solid var(--whueo-rgba_255_255_255_0p08)",
          maxWidth: 700
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.8
          }}
        >
          {text}
        </Typography>
      </Paper>
    </Stack>
  )
}

export default function HowToPlay() {
  return (
    <section id="how-to-play">
      <Box py={10}>
        <Container  maxWidth="md">

          <Stack spacing={8}>

            {/* HEADER */}

            <Stack spacing={2} textAlign="center">

              <Typography
                variant="h3"
                fontWeight={800}
              >
                How To Play
              </Typography>

              <Typography
                color="primary"
              >
                Learn the basics in less than a minute.
              </Typography>

            </Stack>

            {/* ARTISTS */}

            <Stack spacing={4}>

              <Typography
                variant="h4"
                fontWeight={700}
              >
                Artist Guide
              </Typography>

              {artistTips.map((tip, i) => (
                <AdviceCard
                  key={i}
                  
                  id={i+1}
                  text={tip}
                />
              ))}

            </Stack>

            {/* IMPOSTERS */}

            <Stack spacing={4}>

              <Typography
                variant="h4"
                fontWeight={700}
                color="error"
              >
                Imposter Guide
              </Typography>

              {imposterTips.map((tip, i) => (
                <AdviceCard
                  key={i}
                  id={i+1}
                  text={tip}
                  imposter
                />
              ))}

            </Stack>

          </Stack>

        </Container>
      </Box>
    </section>
  )
}