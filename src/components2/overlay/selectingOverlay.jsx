import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material"

export default function WaitingForWordOverlay() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "brand.dark",
          backgroundImage:
              "radial-gradient(var(--whueo-rgba_255_255_255_0p045) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,

          p: 5,

          borderRadius: 4,

           overflow: "hidden",
          position: "relative",
          bgcolor: "transparent",
          color: "var(--whueo-hex_ffffff)",
          border: "3px solid var(--whueo-hex_374151)"
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
              top: -120,
              right: -100,
              pointerEvents: "none"
            }}
          />
        <CircularProgress />

        <Typography
          variant="h5"
          sx={{
            color: "var(--whueo-hex_ffffff)",
            textAlign: "center",
            fontWeight: 700
          }}
        >
          Someone is choosing a word...
        </Typography>

        <Typography
          sx={{
            color: "var(--whueo-hex_999999)",
            textAlign: "center"
          }}
        >
          Please wait
        </Typography>
      </Box>
    </Box>
  )
}