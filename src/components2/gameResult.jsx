import { Check, Close, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Fade, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getSocket } from "../socket/test";
import { useState } from "react";
import { GameAvatar } from "./utils/avatar";
import theme from "../theme";
const palette = {
  bg: "#0A0C11",
  panel: "#11141B",
  panelBorder: "rgba(255,255,255,0.07)",
  hairline: "rgba(255,255,255,0.09)",
  textPrimary: "#EEF0F4",
  textMuted: "#838B9C",
  crew: "#3DDC84",
  imposter: "#FF5C5C",
};

const fontDisplay = "'Space Grotesk', 'Inter', sans-serif";
const fontMono = "'JetBrains Mono', 'Roboto Mono', monospace";

// Small HUD-style corner bracket — the page's one signature flourish,
// echoing a mission readout rather than a generic rounded card.


const GameResult = ({ gameResult, showAlert }) => {
  const [loading, setLoading] = useState(false);

  const roomData = useSelector((state) => state.roomData.value);
  const socketId = useSelector((state) => state.personal.value?.socketId);

  const players = roomData.players;
  const isHost = roomData.hostId === socketId;
  const socket = getSocket();

  const imposters = gameResult.imposters.map((id) =>
    players[id]
      ? { username: players[id].username, userId: players[id].userId, socketId: id }
      : null
  );

  const crewWin = gameResult.winner === "artists";
  const accent = crewWin ? palette.crew : palette.imposter;

  const reasonText =
    gameResult.reason === "all_imposters_eliminated"
      ? "All imposters were ejected before parity."
      : gameResult.reason === "max_round_reached"
      ? "Round limit reached — no further ejections possible."
      : "Imposters reached parity with the crew.";

  const restartGame = () => {
    setLoading(true);
    socket.emit("restart_game", {}, (response) => {
      if (!response.success) {
        setLoading(false);
        showAlert("error", "Something went wrong!");
      }
    });
  };

  return (
    <Fade in>
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
                "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          
          p: 2,
        }}
      >
        
        <style>{`
          @keyframes resultPulse {
            0%   { box-shadow: 0 0 0 0 ${accent}55; }
            70%  { box-shadow: 0 0 0 16px ${accent}00; }
            100% { box-shadow: 0 0 0 0 ${accent}00; }
          }
          @media (prefers-reduced-motion: reduce) {
            .result-badge { animation: none !important; }
          }
        `}</style>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 480,
            borderRadius: "14px",
            px: { xs: 3, sm: 5 },
            py: 5,
                
            overflow: "hidden",
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
              bgcolor: crewWin ? "rgba(21, 255, 0, 0.12)" : "rgba(255, 0, 0, 0.12)",
              filter: "blur(100px)",
              top: -120,
              right: -100,
              pointerEvents: "none"
            }}
          />

          {/* Badge */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              className="result-badge"
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: `1.5px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "resultPulse 2.4s ease-out infinite",
              }}
            >
              {crewWin ? (
                <Check sx={{ fontSize: 26, color: accent }} />
              ) : (
                <Close sx={{ fontSize: 26, color: accent }} />
              )}
            </Box>
          </Box>

          {/* Verdict */}
          <Typography
            align="center"
            sx={{
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: { xs: 30, sm: 36 },
              letterSpacing: "-0.01em",
              color: palette.textPrimary,
              lineHeight: 1.1,
            }}
          >
            {crewWin ? "Artists win" : "Imposters win"}
          </Typography>

          {/* Reason */}
          <Typography
            align="center"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: palette.textMuted,
              mt: 1.25,
              mb: 4,
            }}
          >
            {reasonText}
          </Typography>

          {/* Divider with label */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: palette.hairline }} />
            <Typography
              sx={{
                fontFamily: fontMono,
                fontSize: 11,
                letterSpacing: "0.16em",
                color: palette.textMuted,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Imposters · {imposters.filter(Boolean).length}
            </Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: palette.hairline }} />
          </Box>

          {/* Imposter chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.25, mb: isHost ? 4 : 0 }}>
            {imposters.map(
              (imposter, i) =>
                imposter && (
                  <Box
                    key={imposter.userId ?? i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      bgcolor: "rgba(255,255,255,0.035)",
                      border: `1px solid ${palette.hairline}`,
                      borderRadius: "999px",
                      pl: 0.5,
                      pr: 1.75,
                      py: 0.5,
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      {roomData.hostId === imposter.socketId && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: 11,
                          }}
                        >
                          👑
                        </Box>
                      )}
                      <GameAvatar id={imposter.userId} size={26} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: fontMono,
                        fontSize: 12.5,
                        color: palette.textPrimary,
                      }}
                    >
                      {imposter.username}
                    </Typography>
                  </Box>
                )
            )}
          </Box>

          {/* Restart */}
          {isHost && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={restartGame}
                disabled={loading}
                variant="contained"
                color="primary"
                sx={{
                    
                    borderRadius: "999px",
                    boxShadow: "none",
                    "&:hover": { boxShadow: `0 0 28px ${theme.palette.t.boxShadow}` },
                }}
              >
                {loading ? (
                  <CircularProgress size={16} sx={{ color: palette.textMuted }} />
                ) : (
                  <RestartAltRounded sx={{ fontSize: 17 }} />
                )}
                Restart game
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

export default GameResult;