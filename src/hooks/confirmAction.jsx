import { useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Stack,
  Typography,
} from "@mui/material";

import happyMascot from "../assets/mascot/success.png";
import sadMascot from "../assets/mascot/error.png";

export default function useConfirmAction() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState({
    type: "danger",
    title: "",
    message: "",
    onConfirm: null,
  });

  const confirmAction = ({
    type = "danger",
    title,
    message,
    onConfirm,
  }) => {
    setConfirm({
      type,
      title,
      message,
      onConfirm,
    });

    setOpen(true);
  };

  const closeDialog = () => {
    if (loading) return;

    setOpen(false);
  };

  const handleConfirm = async () => {
    if (!confirm.onConfirm) {
      setOpen(false);
      return;
    }

    try {
      setLoading(true);

      await confirm.onConfirm();

      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mascot =
    confirm.type === "success"
      ? happyMascot
      : sadMascot;

  const ConfirmDialog = () => (
    <Backdrop
      open={open}
      onClick={closeDialog}
      sx={{
        zIndex: 9999,
        bgcolor: "var(--whueo-rgba_0_0_0_p72)",
        backdropFilter: "blur(3px)",
      }}
    >
      <Fade in={open}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "relative",

            display: "flex",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            alignItems: "center",

            width: {
              xs: "92vw",
              sm: "auto",
            },

            maxWidth: 560,

            px: 2,
          }}
        >
          {/* Mascot */}

          <Box
            component="img"
            src={mascot}
            alt="mascot"
            sx={{
              width: {
                xs: 140,
                sm: 170,
              },

              height: "auto",

              userSelect: "none",
              pointerEvents: "none",

              zIndex: 3,

              position: {
                xs: "absolute",
                sm: "relative",
              },

              top: {
                xs: -155,
                sm: "auto",
              },

              left: {
                xs: "50%",
                sm: "auto",
              },

              transform: {
                xs: "translateX(-50%)",
                sm: "none",
              },
            }}
          />

          {/* Bubble */}

          <Box
            sx={{
              position: "relative",

              zIndex: 2,

              width: {
                xs: "75%",
                sm: 420,
              },

              bgcolor: "var(--whueo-hex_fffdf5)",
              color: "var(--whueo-hex_111911)",

              border: "4px solid var(--whueo-hex_222222)",

              borderRadius: "36px",

              mx: 3,

              px: 3,

              pt: {
                xs: 6,
                sm: 3,
              },

              pb: 3,

              boxShadow:
                "0 16px 40px var(--whueo-rgba_0_0_0_p35)",
            }}
          >
            {/* Desktop Tail */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },

                position: "absolute",

                left: -28,

                top: "50%",

                transform: "translateY(-50%)",

                width: 0,
                height: 0,

                borderTop:
                  "18px solid transparent",

                borderBottom:
                  "18px solid transparent",

                borderRight:
                  "28px solid var(--whueo-hex_222222)",
              }}
            />

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },

                position: "absolute",

                left: -22,

                top: "50%",

                transform: "translateY(-50%)",

                width: 0,
                height: 0,

                borderTop:
                  "14px solid transparent",

                borderBottom:
                  "14px solid transparent",

                borderRight:
                  "22px solid var(--whueo-hex_fffdf5)",
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 24,
                },

                fontWeight: 800,

                textAlign: "center",

                mb: 1.5,
              }}
            >
              {confirm.title ||
                (confirm.type === "success"
                  ? "✅ Confirm Action"
                  : "⚠️ Are You Sure?")}
            </Typography>

            <Typography
              sx={{
                textAlign: "center",

                fontSize: 16,

                lineHeight: 1.7,

                mb: 3,
              }}
            >
              {confirm.message}
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
            >
              {/* CANCEL */}

              <Button
                fullWidth
                disabled={loading}
                onClick={closeDialog}
                variant="outlined"
                sx={{
                  borderRadius: "999px",

                  py: 1.2,

                  fontSize: 15,

                  fontWeight: 700,

                  textTransform: "none",

                  borderWidth: "3px",

                  borderColor: "var(--whueo-hex_222222)",

                  color: "var(--whueo-hex_222222)",

                  "&:hover": {
                    borderWidth: "3px",
                    borderColor: "var(--whueo-hex_222222)",
                  },
                }}
              >
                Cancel
              </Button>

              {/* YES */}

              <Button
                fullWidth
                disabled={loading}
                onClick={handleConfirm}
                variant="contained"
                sx={{
                  borderRadius: "999px",

                  py: 1.2,

                  fontSize: 15,

                  fontWeight: 700,

                  textTransform: "none",

                  background:
                    confirm.type === "success"
                      ? "var(--whueo-hex_43a047)"
                      : "var(--whueo-hex_d32f2f)",

                  boxShadow: "none",

                  "&:hover": {
                    background:
                      confirm.type === "success"
                        ? "var(--whueo-hex_2e7d32)"
                        : "var(--whueo-hex_b71c1c)",

                    boxShadow: "none",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={22}
                    color="inherit"
                  />
                ) : (
                  "Yes"
                )}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Backdrop>
  );

  return {
    ConfirmDialog,
    confirmAction,
  };
}
