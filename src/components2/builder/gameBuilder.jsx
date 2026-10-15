import {
  Box,
  Paper,
  Typography
} from "@mui/material"
import BuilderForm from "./builderForm"

export default function GameBuilderForm({
  onSubmit = () => {},
  showAlert,
  roomId,
  username,
  changeSettings = false,
  initialSettings = null

}) {

 

  return (
    <Box
      sx={{
        minHeight: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        

        p: 3
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 500,
          color:"var(--whueo-hex_ffffff)",
          // bgcolor: "brand.light",
          bgcolor: "transparent",
          position: "relative",
          overflow: "hidden",
          border:
            "1px solid var(--whueo-hex_2b313d)",

          borderRadius: 5,

          p: 4
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
        {/* ================================= */}
        {/* TITLE */}
        {/* ================================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          color="var(--whueo-hex_ffffff)"
          mb={4}
        >
          {changeSettings ? "Game Settings" : "Create Game"}
        </Typography>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <BuilderForm roomId={roomId} showAlert={showAlert} username={username} onSubmit={onSubmit} />
      </Paper>
    </Box>
  )
}