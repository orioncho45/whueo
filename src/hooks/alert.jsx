import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Typography,
} from "@mui/material";

import happyMascot from "../assets/mascot/success.png";
import sadMascot from "../assets/mascot/error.png";

export default function useAlertDialog() {
  const [open, setOpen] = useState(false);

  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlert({
      type,
      message,
    });

    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  const mascot =
    alert.type === "success"
      ? happyMascot
      : sadMascot;

  const AlertDialog = () => (
    <Backdrop
      open={open}
      onClick={closeAlert}
      sx={{
        zIndex: 2000001,
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

            maxWidth: 550,

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

              zIndex: {
                xs: 3,
                sm: 3,
              },

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

              opacity: {
                // xs: 0.25,
                sm: 1,
              },
            }}
          />

          {/* Speech Bubble */}

          <Box
            sx={{
              position: "relative",

              zIndex: 2,

              width: {
                xs: "75%",
                sm: 400,
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
              {alert.type === "success"
                ? "🎉 Great!"
                : "⚠️ Oops Artist!"}
            </Typography>

            <Typography
              sx={{
                textAlign: "center",

                fontSize: 16,

                lineHeight: 1.7,

                mb: 3,
              }}
            >
              {alert.message || "Something went wrong!"}
            </Typography>

            <Button
              fullWidth
              onClick={closeAlert}
              variant="contained"
              sx={{
                borderRadius: "999px",

                py: 1.3,

                fontSize: 16,

                fontWeight: 700,

                textTransform: "none",

                background:
                  alert.type === "success"
                    ? "var(--whueo-hex_f4b400)"
                    : "var(--whueo-hex_d32f2f)",

                boxShadow: "none",

                "&:hover": {
                  background:
                    alert.type === "success"
                      ? "var(--whueo-hex_db9f00)"
                      : "var(--whueo-hex_b71c1c)",

                  boxShadow: "none",
                },
              }}
            >
              Okay
            </Button>
          </Box>
        </Box>
      </Fade>
    </Backdrop>
  );

  return {
    AlertDialog,
    showAlert,
  };
}
