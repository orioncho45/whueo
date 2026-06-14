import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

// adjust path based on your project structure
import mascotSad from "../assets/mascot/error.png"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            // p: { xs: 4, md: 6 },
            py:1,
            borderRadius: 5,
            textAlign: "center",
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* glow effect */}
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              bgcolor: "rgba(21, 255, 0, 0.12)",    
              filter: "blur(120px)",
              top: -150,
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none"
            }}
          />

          <Stack spacing={1} alignItems="center" position="relative">
            {/* MASCOT */}
            <Box
              component="img"
              src={mascotSad}
              alt="Sad Mascot"
              sx={{
                width: 100,
                height: 100,
                objectFit: "contain",
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.6))"
              }}
            />

            {/* 404 */}
            <Typography
              variant="h2"
              fontWeight={600}
              sx={{ fontSize: { xs: 50, md: 90 } }}
            >
              404
            </Typography>

            <Typography variant="h5" fontWeight={600}>
              Oops… Lost in the Game
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                maxWidth: 420,
                lineHeight: 1.7
              }}
            >
              This room doesn’t exist or got disconnected from the server.
              Your companion is waiting for instructions…
            </Typography>

            {/* ACTIONS */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  fontWeight: 600,
                  textTransform: "none"
                }}
              >
                Back to game
              </Button>

              
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}