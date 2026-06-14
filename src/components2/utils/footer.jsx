import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"

export default function Footer() {
  const roomData = useSelector(state => state.roomData.value)

  const compact =
    roomData?.state === "vote" ||
    roomData?.state === "started"

  if (compact) {
    return (
      <Box
        component="footer"
        sx={{
          py: 0.25,
          px: 1,
          textAlign: "center",
          borderTop: 1,
          borderColor: "divider",
          lineHeight: 1,
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
          sx={{
            display: "block",
            lineHeight: 1.1,
          }}
        >
          Powered by Orion Chowdhury
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        px: 2,
        borderTop: 1,
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.primary">
        © {new Date().getFullYear()} Whueo?io. All rights reserved.
      </Typography>

      <Typography variant="caption" color="text.primary">
        Powered by Orion Chowdhury
      </Typography>
    </Box>
  )
}