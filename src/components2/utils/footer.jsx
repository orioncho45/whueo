// Footer.jsx
import { CodeRounded } from "@mui/icons-material";
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

const DiscordIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.87 19.87 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
  </svg>
);

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
            <Typography sx={{ fontWeight: 700, fontSize: "3rem", color: "white" }}>
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
              href="https://discord.gg/your-invite"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: t.textLowest,
                border: `1px solid ${t.border}`,
                "&:hover": { color: t.textMid, borderColor: t.borderMid },
              }}
            >
              <DiscordIcon />
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
                  color: t.textLowest,
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