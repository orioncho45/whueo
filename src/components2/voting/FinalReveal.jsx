import { Close } from "@mui/icons-material";
import { Box, Fade, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GameAvatar } from "../utils/avatar";


const palette = {
  panelBorder: "var(--whueo-rgba_255_255_255_0p07)",
  hairline: "var(--whueo-rgba_255_255_255_0p09)",
  textPrimary: "var(--whueo-hex_eef0f4)",
  textMuted: "var(--whueo-hex_838b9c)",
  crew: "var(--whueo-hex_3ddc84)",
  imposter: "var(--whueo-hex_ff5c5c)",
};

const fontDisplay = "'Space Grotesk', 'Inter', sans-serif";
const fontMono = "'JetBrains Mono', 'Roboto Mono', monospace";

const RenderFinalReveal = ({ finalResults }) => {
  const roomData = useSelector((state) => state.roomData.value);

  const votedOutPlayer = finalResults.votedOut
    ? roomData.players[finalResults.votedOut]
    : null;

  const wasImposter = !!finalResults.imposterDetected;

  // A tie (no one ejected) is visually treated the same as an imposter win —
  // nothing useful happened for the crew, so it gets the red/imposter styling.
  const goodOutcome = finalResults.votedOut ? wasImposter : false;
  const accent = goodOutcome ? palette.crew : palette.imposter;

  const headline = finalResults.votedOut
    ? votedOutPlayer?.username ?? "Unknown"
    : "No one was ejected";

  const subtext = !finalResults.votedOut
    ? "The vote ended in a tie."
    : wasImposter
    ? "One of the imposters has been removed."
    : "An innocent player was voted out.";

  return (
    <Fade in>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
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
            border: "3px solid var(--whueo-hex_374151)",
          }}
        >
          {/* GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              bgcolor: goodOutcome
                ? "var(--whueo-rgba_21_255_0_0p12)"
                : "var(--whueo-rgba_255_0_0_0p12)",
              filter: "blur(100px)",
              top: -120,
              right: -100,
              pointerEvents: "none",
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
              {finalResults.votedOut ? (
                <GameAvatar id={votedOutPlayer?.userId} size={44} />
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
            {finalResults.votedOut ? `${headline} ejected` : headline}
          </Typography>

          {/* Reason */}
          <Typography
            align="center"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: palette.textMuted,
              mt: 1.25,
              mb: finalResults.votedOut ? 4 : 0,
            }}
          >
            {subtext}
          </Typography>

          {/* Divider with vote count — only meaningful when someone was ejected */}
          {finalResults.votedOut && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                Votes · {finalResults.mostVotes}
              </Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: palette.hairline }} />
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

export default RenderFinalReveal;
