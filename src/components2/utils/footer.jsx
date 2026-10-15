// Footer.jsx
import { CodeRounded, Facebook } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import NewsletterInline from "../site/subscribe";
import { DISCORD_URL, FACEBOOK_URL } from "../../helper/urls";
import DiscordIcon from "./icons/discord";

export default function Footer() {
  const t = theme.palette.t;
  const navigate = useNavigate();

  // Adjust these to match your real routes
  const playLinks = [
    { label: "Play now", to: "/play" },
    { label: "How it works", to: "/#how-it-works" },
    { label: "Public rooms", to: "/play/public_rooms" },
  ];

  const legalLinks = [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ];

  const linkSx = {
    fontSize: "0.82rem",
    color: t.textLowest,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.15s",
    "&:hover": { color: t.textMid },
  };

  return (
    <Box sx={{ borderTop: `1px solid ${t.border}`, mt: 6 }}>
      <Container maxWidth="xl">
        {/* Newsletter strip */}
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "3rem", color: "var(--whueo-hex_ffffff)" }}>
              Got any questions?
            </Typography>
            <Button variant="contained" color="primary" size="large" onClick={()=>navigate("/contact")}  sx={{borderRadius:"200px"}} >Contact us</Button>
          </Box>
          <Box sx={{ width: { xs: "100%", md: 360 } }}>
            <NewsletterInline />
          </Box>
        </Box>

        {/* Link columns */}
        <Grid2 container spacing={4} sx={{ py: 4 }}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              onClick={() => navigate("/")}
              sx={{ height: 48, width: "auto", cursor: "pointer", mb: 1.5 }}
            />
            <Typography sx={{ fontSize: "0.8rem", color: t.textLowest, maxWidth: 280, mb: 1.5 }}>
              Draw, guess, and laugh with friends in real time.
            </Typography>
            <IconButton
              component="a"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: t.textLowest,
                border: `1px solid ${t.border}`,
                "&:hover": { color: t.textMid, borderColor: t.borderMid },
              }}
            >
              <DiscordIcon fontSize={18} />
            </IconButton>
            <IconButton
              component="a"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                mx: 1,
                color: t.textLowest,
                border: `1px solid ${t.border}`,
                "&:hover": { color: t.textMid, borderColor: t.borderMid },
              }}
            >
              <Facebook fontSize="18px" />
            </IconButton>
          </Grid2>

          <Grid2 size={{ xs: 6, sm: 4 }}>
            <Typography
              sx={{ fontSize: "0.78rem", fontWeight: 700, color: t.textMid, mb: 1.5, letterSpacing: 0.4 }}
            >
              GAME
            </Typography>
            <Stack spacing={1}>
              {playLinks.map((l) => (
                <Typography
                  key={l.label}
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(l.to);
                  }}
                  sx={linkSx}
                >
                  {l.label}
                </Typography>
              ))}
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 6, sm: 4 }}>
            <Typography
              sx={{ fontSize: "0.78rem", fontWeight: 700, color: t.textMid, mb: 1.5, letterSpacing: 0.4 }}
            >
              LEGAL
            </Typography>
            <Stack spacing={1}>
              {legalLinks.map((l) => (
                <Typography
                  key={l.label}
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(l.to);
                  }}
                  sx={linkSx}
                >
                  {l.label}
                </Typography>
              ))}
              <Box
                onClick={() => navigate("/about")}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--whueo-hex_ffffff)",
                  border: `1px solid ${t.border}`,
                  borderRadius: "7px",
                  px: 1.1,
                  py: 0.4,
                  cursor: "pointer",
                  width: "fit-content",
                  "&:hover": { color: t.textMid, borderColor: t.borderMid },
                }}
              >
                <CodeRounded sx={{ fontSize: 13 }} />
                About developer
              </Box>
            </Stack>
          </Grid2>
        </Grid2>

        <Divider sx={{ borderColor: t.border }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ py: 2.5 }}
        >
          <Typography sx={{ fontSize: "0.76rem", color: t.textLowest }}>
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}