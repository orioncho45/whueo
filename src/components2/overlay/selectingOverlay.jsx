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
        background: "#000",
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

          background:
            "rgba(20,20,20,0.9)",

          border:
            "1px solid #333"
        }}
      >
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