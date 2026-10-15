import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material"

import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import SendIcon from "@mui/icons-material/Send"
import banner from "../assets/banner/hero.png"
import { useEffect, useState } from "react"
import theme from "../theme"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

export default function Contact() {
  const [heroVisible, setHeroVisible] = useState(false)

  const t = theme.palette.t
  const displayFont = "'Playfair Display', Georgia, serif"

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().min(10, "Must be at least 10 characters").required("Required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("https://formspree.io/f/xkowdnpy", {
          name: values.name,
          email: values.email,
          message: `From whueo: ${values.message}`
        })
        resetForm()
      } catch (error) {
        console.error("Error sending message", error)
      }
    }
  })

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        mb: 10
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
              Get In Touch
            </Typography>

            <Typography sx={{
              color: t.textLowest,
              fontSize: { xs: "1rem", md: "1.15rem" },
              maxWidth: 520,
              mx: "auto"
            }}>
              Reach out!!
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
            borderRadius: 5,
            bgcolor: "transparent",
            border: "1px solid var(--whueo-rgba_255_255_255_0p08)",
            backdropFilter: "blur(12px)",
            p: { xs: 3, md: 5 },
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
              top: -100,
              right: -60,
              pointerEvents: "none"
            }}
          />

          <Stack spacing={4} alignItems="center">
            {/* HEADER */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight={700} textAlign="center">
                Contact Us
              </Typography>

              <Typography
                variant="body1"
                textAlign="center"
                sx={{ color: "var(--whueo-rgba_255_255_255_0p7)", maxWidth: 700 }}
              >
                Questions, feedback, bug reports, or partnership inquiries? We'd love to hear from you.
              </Typography>
            </Stack>

            {/* FORM */}
            <Stack
              spacing={2.5}
              width="100%"
              sx={{
                borderRadius: 3,
                p: { xs: 2.5, md: 3.5 },
              }}
            >
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2.5}
                >
                  <TextField
                    label="Your Name"
                    fullWidth
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{
                      input: { color: "var(--whueo-hex_ffffff)" },
                      label: { color: "var(--whueo-rgba_255_255_255_0p6)" }
                    }}
                  />

                  <TextField
                    label="Your Email"
                    type="email"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      input: { color: "var(--whueo-hex_ffffff)" },
                      label: { color: "var(--whueo-rgba_255_255_255_0p6)" }
                    }}
                  />
                </Stack>
                    <br />


                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={5}
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                  sx={{
                    textarea: { color: "var(--whueo-hex_ffffff)" },
                    label: { color: "var(--whueo-rgba_255_255_255_0p6)" }
                  }}
                />
                <br />
                <br />
                
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  disabled={formik.isSubmitting}
                  type="submit"
                  sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, px: 4 }}
                >
                  {formik.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Box>
            </Stack>

            <Divider
              sx={{ width: "100%", borderColor: "var(--whueo-rgba_255_255_255_0p08)" }}
            />

            

            {/* SOCIALS */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton
                sx={{
                  bgcolor: "var(--whueo-rgba_255_255_255_0p05)",
                  "&:hover": { bgcolor: "var(--whueo-rgba_255_255_255_0p1)" }
                }}
              >
                <GitHubIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "var(--whueo-rgba_255_255_255_0p05)",
                  "&:hover": { bgcolor: "var(--whueo-rgba_255_255_255_0p1)" }
                }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "var(--whueo-rgba_255_255_255_0p05)",
                  "&:hover": { bgcolor: "var(--whueo-rgba_255_255_255_0p1)" }
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