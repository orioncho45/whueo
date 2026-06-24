import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwH9HOzGeAg6cVdZoFAxsnVA9roBEfUVZCFWvUOURXsrrxHBzEXItT3lU5uAZb5-2MK/exec";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Email is required."),
});

export default function NewsletterInline() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        setMessage("");
        setMessageType("");

        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
          }),
        });

        setMessage("✓ Successfully subscribed.");
        setMessageType("success");

        resetForm();

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        console.error(error);

        setMessage("Something went wrong. Please try again.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    },
  });

  const hasError =
    formik.touched.email && Boolean(formik.errors.email);

  return (
    <Box sx={{width: "100%", mx: 2}}>
      <Typography
        variant="h5"
        color="white"
        fontWeight={700}
        gutterBottom
      >
        Stay Updated
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.75)",
          mb: 2.5,
        }}
      >
        Get game updates, announcements, privacy &
        terms changes. No spam.
      </Typography>

      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          bgcolor: "rgba(255,255,255,0.03)",
          border: "1px solid",
          borderColor: hasError
            ? "error.main"
            : "brand.light",
          borderRadius: "14px",
          overflow: "hidden",
          transition: "all .2s ease",

          "&:focus-within": {
            borderColor: hasError
              ? "error.main"
              : "primary.main",
            boxShadow:
              "0 0 0 3px rgba(255,255,255,0.08)",
          },
        }}
      >
        <InputBase
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{
            flex: 1,
            px: 2,
            py: 0.75,

            "& input": {
              color: "white",
            },

            "& input::placeholder": {
              color: "rgba(255,255,255,0.55)",
              opacity: 1,
            },
          }}
        />

        <IconButton
          type="submit"
          disabled={loading}
          sx={{
            m: 0.5,
            bgcolor: "brand.light",
            color: "brand.dark",
            borderRadius: "10px",

            "&:hover": {
              bgcolor: "brand.light",
              opacity: 0.9,
            },

            "&.Mui-disabled": {
              bgcolor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              size={18}
              color="inherit"
            />
          ) : (
            <SendRounded />
          )}
        </IconButton>
      </Paper>

      {hasError && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            color: "error.main",
            fontWeight: 500,
          }}
        >
          {formik.errors.email}
        </Typography>
      )}

      {message && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            fontWeight: 500,
            color:
              messageType === "success"
                ? "success.main"
                : "error.main",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}