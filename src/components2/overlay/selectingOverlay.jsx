import { useEffect } from "react"
import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material"

import { getSocket } from "../../socket/test"
import { useDispatch, useSelector } from "react-redux"
import { selectWord } from "../../store/features/roomData"

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
          color: "white",
          border: "3px solid #374151"
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
        <CircularProgress />

        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontWeight: 700
          }}
        >
          Someone is choosing a word...
        </Typography>

        <Typography
          sx={{
            color: "#999",
            textAlign: "center"
          }}
        >
          Please wait
        </Typography>
      </Box>
    </Box>
  )
}