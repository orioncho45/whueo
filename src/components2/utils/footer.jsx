// Footer.jsx
import { CodeRounded } from "@mui/icons-material";
import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import NewsletterInline from "../site/subscribe";
export default function Footer() {
  const t = theme.palette.t;
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Grid2 container sx={{ py: 3, alignItems: "center" }} spacing={2}>
  <Grid2
    size={{ lg: 6, md: 6, sm: 12, xs: 12 }}
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <Box
      component="img"
      src="/logo.png"
      alt="Logo"
      onClick={() => navigate("/")}
      sx={{
        cursor: "pointer",
        width: "100%",
        maxWidth: { xs: 280, sm: 360, md: 420, lg: 480 },
        height: "auto",
        objectFit: "contain",
        m: 2,
      }}
    />
  </Grid2>

  <Grid2
    size={{ lg: 6, md: 6, sm: 12, xs: 12 }}
    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <NewsletterInline />
  </Grid2>
</Grid2>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ py: 3 }}
      >
        
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography sx={{ fontSize: "0.76rem", color: t.textLowest }}>
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          

          <Stack direction="row" spacing={2.5} alignItems="center">
            <Typography
              key={"privacy"}
              component="a"
              onClick={(e) => {
                e.preventDefault();
                navigate("/privacy");
              }}
              sx={{
                fontSize: "0.76rem",
                color: t.textLowest,
                textDecoration: "none",
                "&:hover": { color: t.textMid },
              }}
            >
              Privacy
            </Typography>
            <Typography
              key={"terms"}
              component="a"
              onClick={(e) => {
                e.preventDefault();
                navigate("/terms");
              }}
              sx={{
                fontSize: "0.76rem",
                color: t.textLowest,
                textDecoration: "none",
                "&:hover": { color: t.textMid },
              }}
            >
              Terms
            </Typography>
            <Box
              onClick={(e) => {
                e.preventDefault();
                navigate("/about");
              }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                fontSize: "0.74rem",
                fontWeight: 700,
                color: t.textLowest,
                border: `1px solid ${t.border}`,
                borderRadius: "7px",
                px: 1.25,
                py: 0.5,
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
                userSelect: "none",
                "&:hover": { color: t.textMid, borderColor: t.borderMid },
              }}
            >
              <CodeRounded sx={{ fontSize: 13 }} />
              About Developer
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}