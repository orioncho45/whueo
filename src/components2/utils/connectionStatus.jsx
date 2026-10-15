import { Box, CircularProgress, Typography } from "@mui/material"

export default function ConnectionStatus({ connected = true, compact = false }) {
  if (compact) {
    return (
      <Box
        title={connected ? "Online" : "Reconnecting…"}
        aria-label={connected ? "Online" : "Reconnecting"}
        sx={{
          position: "absolute",
          right: -3,
          bottom: -3,
          width: 20,
          height: 20,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          bgcolor: "var(--whueo-hex_111911)",
          border: "1px solid var(--whueo-hex_4e6457)",
        }}
      >
        {connected ? (
          <Box sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: "var(--whueo-hex_7db87a)" }} />
        ) : (
          <CircularProgress size={14} thickness={5} sx={{ color: "var(--whueo-hex_7db87a)" }} />
        )}
      </Box>
    )
  }

  
}
