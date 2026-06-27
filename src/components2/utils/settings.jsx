import {
  Box,
  Button,
  IconButton,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useDispatch, useSelector } from "react-redux";

import {
  closeSettings,
  resetHotkeys,
  setHotkey,
  setVolume,
} from "../../store/features/settings";

function HotkeyInput({
  label,
  value,
  action,
}) {
  const dispatch = useDispatch();

  const normalizeKey = (key) => {
    const specialKeys = {
      " ": "Space",
      ArrowUp: "ArrowUp",
      ArrowDown: "ArrowDown",
      ArrowLeft: "ArrowLeft",
      ArrowRight: "ArrowRight",
      Escape: "Escape",
      Control: "Ctrl",
      Meta: "Meta",
    };

    if (specialKeys[key]) {
      return specialKeys[key];
    }

    if (key.length === 1) {
      return key.toUpperCase();
    }

    return key;
  };

  const handleKeyDown = (e) => {
    e.preventDefault();

    const formattedKey =
      normalizeKey(e.key);

    dispatch(
      setHotkey({
        action,
        key: formattedKey,
      })
    );
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
    >
      <Typography
        sx={{
          width: 90,
          fontSize: 14,
          fontWeight: 600,
          color: "white",
        }}
      >
        {label}
      </Typography>

      <Box
        tabIndex={0}
        onKeyDown={handleKeyDown}
        sx={{
          flex: 1,

          px: 1.5,
          py: 1,

          borderRadius: "10px",

          border:
            "1px solid rgba(255,255,255,0.1)",

          bgcolor:
            "rgba(255,255,255,0.04)",

          color: "white",

          fontWeight: 700,

          cursor: "pointer",

          userSelect: "none",

          transition: ".2s",

          outline: "none",

          "&:focus": {
            border:
              "1px solid #60a5fa",

            bgcolor:
              "rgba(96,165,250,.12)",

            boxShadow:
              "0 0 0 3px rgba(96,165,250,.18)",
          },
        }}
      >
        {value}
      </Box>
    </Stack>
  );
}

export default function SettingsDialog({
  inGame = false,
}) {
  const dispatch = useDispatch();

  const {
    open,
    volume,
    hotkeys,
  } = useSelector(
    (state) => state.settings
  );

  if (!open) return null;

  return (
    <Paper
      sx={{
        position: "fixed",

        right: 20,

        top: inGame ? 80 : 40,

        width: 350,

        zIndex: 9999,

        display: "flex",

        flexDirection: "column",

        borderRadius: "16px",

        backgroundColor:
          "rgba(0, 0, 0, 0.4)",

        backdropFilter: "blur(4px)",

        border:
          "1px solid rgba(255, 255, 255, 0.1)",

        color: "white",

        overflow: "hidden",

        "@media (max-width: 768px)": {
          width: 280,

          right: 10
        },
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          p: 1.5,

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          borderBottom:
            "1px solid #333",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <SettingsIcon />

          <Typography
            fontWeight="bold"
          >
            Settings
          </Typography>
        </Stack>

        <IconButton
          onClick={() =>
            dispatch(closeSettings())
          }
          sx={{
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* BODY */}

      <Stack
        spacing={3}
        sx={{
          p: 2,
        }}
      >
        {/* VOLUME */}

        <Box>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            🔊 Volume
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Slider
              value={volume}
              min={0}
              max={100}
              onChange={(_, value) =>
                dispatch(
                  setVolume(value)
                )
              }
              sx={{
                color: "#60a5fa",
              }}
            />

            <Typography
              sx={{
                width: 42,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {volume}%
            </Typography>
          </Stack>
        </Box>

        {/* HOTKEYS */}

        <Box>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            ⌨️ Hotkeys
          </Typography>

          <Stack spacing={1.2}>
            <HotkeyInput
              label="Brush"
              value={hotkeys.brush}
              action="brush"
            />

            <HotkeyInput
              label="Line"
              value={hotkeys.line}
              action="line"
            />

            <HotkeyInput
              label="Fill"
              value={hotkeys.fill}
              action="fill"
            />

            <HotkeyInput
              label="Eraser"
              value={hotkeys.eraser}
              action="eraser"
            />
          </Stack>
        </Box>

        {/* FOOTER */}

        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <RestartAltIcon />
            }
            onClick={() =>
              dispatch(resetHotkeys())
            }
            sx={{
              color: "white",

              borderColor:
                "rgba(255,255,255,0.12)",

              textTransform: "none",

              "&:hover": {
                borderColor:
                  "rgba(255,255,255,0.22)",
              },
            }}
          >
            Reset
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              dispatch(closeSettings())
            }
            sx={{
              textTransform: "none",
            }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}