import { Check, Close, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Fade, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getSocket } from "../socket/test";
import { useState } from "react";
import { GameAvatar } from "./utils/avatar";
import theme from "../theme";
const palette = {
  bg: "var(--whueo-hex_0a0c11)",
  panel: "var(--whueo-hex_11141b)",
  panelBorder: "var(--whueo-rgba_255_255_255_0p07)",
  hairline: "var(--whueo-rgba_255_255_255_0p09)",
  textPrimary: "var(--whueo-hex_eef0f4)",
  textMuted: "var(--whueo-hex_838b9c)",
  crew: "var(--whueo-hex_3ddc84)",
  imposter: "var(--whueo-hex_ff5c5c)",
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
                "radial-gradient(var(--whueo-rgba_255_255_255_0p045) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          
          p: 2,
        }}
      >
        
        <style>{`
          @keyframes resultPulse {
            0%   { box-shadow: 0 0 0 0 color-mix(in srgb, ${accent} 33%, transparent); }
            70%  { box-shadow: 0 0 0 16px transparent; }
            100% { box-shadow: 0 0 0 0 transparent; }
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
              bgcolor: crewWin ? "var(--whueo-rgba_21_255_0_0p12)" : "var(--whueo-rgba_255_0_0_0p12)",
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
                      bgcolor: "var(--whueo-rgba_255_255_255_0p035)",
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
