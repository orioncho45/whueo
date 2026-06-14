import { useState } from "react"

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const Navigate = useNavigate()

  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!email) return

    try {
      setLoading(true)
      setError("")
      setSuccess(false)

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwH9HOzGeAg6cVdZoFAxsnVA9roBEfUVZCFWvUOURXsrrxHBzEXItT3lU5uAZb5-2MK/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        }
      )

      // no-cors won't allow reading response
      // so assume success if fetch doesn't fail

      setSuccess(true)
      setEmail("")
      Navigate("/")
    } catch (err) {
      console.log(err)

      setError(
        "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "transparent",
        px: 2,
        // py: 6
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 5,
            p: { xs: 3, md: 5 },
            bgcolor: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)"
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
              top: -120,
              right: -100,
              pointerEvents: "none"
            }}
          />

          <Stack spacing={4} position="relative">
            {/* HEADER */}
            <Stack spacing={1}>
              <Typography
                variant="h3"
                fontWeight={700}
              >
                Newsletter
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.8
                }}
              >
                Subscribe to receive updates about
                upcoming features, events, game
                releases, patches, and future projects.
              </Typography>
            </Stack>

            {/* ALERTS */}
            {success && (
              <Alert severity="success">
                Successfully subscribed!
              </Alert>
            )}

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            {/* FORM */}
            <Box
              component="form"
              onSubmit={handleSubscribe}
            >
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    height: 54,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: 16
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                    />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </Stack>
            </Box>

            {/* FOOTER TEXT */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: "rgba(255,255,255,0.5)"
              }}
            >
              No spam. Only important updates and
              announcements.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}