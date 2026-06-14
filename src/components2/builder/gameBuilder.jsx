import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@mui/material"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { connectSocket } from "../../socket/test"
import { setRoomData } from "../../store/features/roomData"
import { useState } from "react"
import { setPersonal } from "../../store/features/personal"
import logEvent from "../../helper/logevent"
import { maxImpostersAllowed, minRoundsRequired, validateGameConfig } from "./validator"
import { useMemo } from "react"

export default function GameBuilderForm({
  onSubmit = () => {},
  showAlert,
  roomId,
  username,
  
}) {
  const [loading, setLoading] = useState(false)
  /*
  =========================================
  OPTIONS
  =========================================
  */

  const memberOptions =
    Array.from(
      { length: 9 },
      (_, i) => i + 4
    )


  const votingOptions =
    Array.from(
      { length: 12 },
      (_, i) => ({
        label: `${(i + 1) * 15}s`,
        value: (i + 1) * 15
      })
    )

  /*
  =========================================
  VALIDATION
  =========================================
  */

  const validationSchema =
    Yup.object({

      maxMembers:
        Yup.number()
          .required(),

      votingTime:
        Yup.number()
          .required(),

      wordSelection:
        Yup.string()
          .required(),
      impostersCount: 
        Yup.number()
          .required(),
      type:
        Yup.string()
          .oneOf(["public","private"])
          .required(),
      maxRounds: Yup.number()
        .min(Yup.ref("impostersCount"), "Not enough rounds to eliminate all imposters")
        .max(5)
        .required(),
    })

  // Redux hooks for connection state
  
  const dispatch = useDispatch()

  // Connect and create game
  const connectAndCreateGame = (values) => {
    if (loading) return

    setLoading(true)
    connectSocket(roomId, (socket) => {
      socket.onopen = () => {

        socket.emit(
          "create_game",
          { ...values, roomId: roomId, username },
          ({ success, ...response }) => {
            if (success) {
              const {socketId, username, userId, roomData} = response;
              dispatch(setRoomData(roomData))
              dispatch(setPersonal({socketId, username, userId}))
              onSubmit(response)
              logEvent({type: "CREATE", roomCode: roomId, username: username})
            } else {
              showAlert("error", "Something went wrong!")
  
            }
            setLoading(false);
          }
        )
      }
    })

    

    // Optionally: add event listeners for game events here
  }

  /*
  =========================================
  FORMIK
  =========================================
  */

  const formik = useFormik({

    initialValues: {

      maxMembers: 4,

      votingTime: 60,

      wordSelection: "random",

      impostersCount: 1,

      type: "private",
      maxRounds: 1,
    },

    validationSchema,

    onSubmit: (values) => {
      connectAndCreateGame(values)
    }
  })
  const validator = useMemo(()=>{
    return validateGameConfig({maxMembers: formik.values.maxMembers, impostersCount: formik.values.impostersCount, maxRounds: formik.values.maxRounds})
  }, [formik.values.maxMembers, formik.values.impostersCount, formik.values.maxRounds])
  const maxAllowedImposters = maxImpostersAllowed(formik.values.maxMembers);
  const minRequiredRounds = minRoundsRequired(formik.values.impostersCount);

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
          color:"white",
          // bgcolor: "brand.light",
          bgcolor: "transparent",
          position: "relative",
          overflow: "hidden",
          border:
            "1px solid #2b313d",

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
              bgcolor: "rgba(21, 255, 0, 0.12)",
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
          color="white"
          mb={4}
        >
          Create Game
        </Typography>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <Box
          component="form"
          onSubmit={formik.handleSubmit}

          display="flex"
          flexDirection="column"

          gap={3}
        >
          {/* MAX MEMBERS */}

          <FormControl
            fullWidth
            error={
              formik.touched.maxMembers &&
              Boolean(
                formik.errors.maxMembers
              )
            }
          >
            <InputLabel>
              Maximum Members
            </InputLabel>

            <Select
              name="maxMembers"
              value={
                formik.values.maxMembers
              }
              label="Maximum Members"
              onChange={(e) => {
                formik.handleChange(e);
                const newMaxImp = maxImpostersAllowed(Number(e.target.value));
                const clampedImp = Math.min(formik.values.impostersCount, newMaxImp);
                formik.setFieldValue("impostersCount", clampedImp);
                const newMinRounds = minRoundsRequired(clampedImp);
                if (formik.values.maxRounds < newMinRounds) {
                  formik.setFieldValue("maxRounds", newMinRounds);
                }
              }}
            >
              {memberOptions.map(
                (count) => (
                  <MenuItem
                    key={count}
                    value={count}
                  >
                    {count}
                  </MenuItem>
                )
              )}
            </Select>

            <FormHelperText>
              {
                formik.errors
                  .maxMembers
              }
            </FormHelperText>
          </FormControl>

          {/* ROOM TYPE (new) */}
          <FormControl
            fullWidth
            error={
              formik.touched.type &&
              Boolean(formik.errors.type)
            }
          >
            <InputLabel>
              Room Type
            </InputLabel>

            <Select
              name="type"
              value={
                formik.values.type
              }
              label="Room Type"
              onChange={
                formik.handleChange
              }
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>

            <FormHelperText>
              {
                formik.errors
                  .type
              }
            </FormHelperText>
          </FormControl>

          {/* MAX ROUNDS (new) */}
          <FormControl
            fullWidth
            error={
              formik.touched.maxRounds &&
              Boolean(formik.errors.maxRounds)
            }
          >
            <InputLabel>
              Max Rounds
            </InputLabel>

            <Select
              name="maxRounds"
              value={
                formik.values.maxRounds
              }
              label="Max Rounds"
              onChange={
                formik.handleChange
              }
            >
              {[1,2,3,4,5].map((n) => (
                <MenuItem key={n} value={n} disabled={n < minRequiredRounds}>
                  {n}{n < minRequiredRounds ? " — not allowed" : ""}
                </MenuItem>
              ))}
            </Select>

            {
              /* Combined messages: prefer validator message, include Formik error if present */
              ( (validator.errors?.maxRounds ? `Minimum ${minRequiredRounds} round${minRequiredRounds>1 ? "s" : ""} for ${formik.values.impostersCount} imposters` : "") +
                ((formik.touched.maxRounds && formik.errors.maxRounds) ? (validator.errors?.maxRounds ? " — " : "") + formik.errors.maxRounds : "")
              ) ? (
                <FormHelperText>
                  {
                    (validator.errors?.maxRounds ? `Minimum ${minRequiredRounds} round${minRequiredRounds>1 ? "s" : ""} for ${formik.values.impostersCount} imposters` : "") +
                    ((formik.touched.maxRounds && formik.errors.maxRounds) ? (validator.errors?.maxRounds ? " — " : "") + formik.errors.maxRounds : "")
                  }
                </FormHelperText>
              ) : null
            }
          </FormControl>

          {/* VOTING TIME */}

          <FormControl
            fullWidth
          >
            <InputLabel>
              Voting Time
            </InputLabel>

            <Select
              name="votingTime"
              value={
                formik.values
                  .votingTime
              }
              label="Voting Time"
              onChange={
                formik.handleChange
              }
            >
              {votingOptions.map(
                (option) => (
                  <MenuItem
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {option.label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {/* Imposters count */}

          <FormControl
            fullWidth
          >
            <InputLabel>
              Imposters count
            </InputLabel>

            <Select
              name="impostersCount"
              value={
                formik.values
                  .impostersCount
              }
              label="Imposters count"
              onChange={(e) => {
                formik.handleChange(e);
                const newMinRounds = minRoundsRequired(Number(e.target.value));
                if (formik.values.maxRounds < newMinRounds) {
                  formik.setFieldValue("maxRounds", newMinRounds);
                }
              }}
            >
              {[1,2,3].map(
                (n) => (
                  <MenuItem key={n} value={n} disabled={n > maxAllowedImposters}>
                    {n}{n > maxAllowedImposters ? " — not allowed" : ""}
                  </MenuItem>
                )
              )}
            </Select>
            {
              /* Combined messages for imposters: validator message + Formik error */
              ( (validator.errors?.impostersCount ? `Max ${maxAllowedImposters} for ${formik.values.maxMembers} players` : "") +
                ((formik.touched.impostersCount && formik.errors.impostersCount) ? (validator.errors?.impostersCount ? " — " : "") + formik.errors.impostersCount : "")
              ) ? (
                <FormHelperText>
                  {
                    (validator.errors?.impostersCount ? `Max ${maxAllowedImposters} for ${formik.values.maxMembers} players` : "") +
                    ((formik.touched.impostersCount && formik.errors.impostersCount) ? (validator.errors?.impostersCount ? " — " : "") + formik.errors.impostersCount : "")
                  }
                </FormHelperText>
              ) : null
            }
            
          </FormControl>
          
          
          {/* WORD SELECTION */}

          <FormControl
            fullWidth
          >
            <InputLabel>
              Word Selection
            </InputLabel>

            <Select
              name="wordSelection"
              value={
                formik.values
                  .wordSelection
              }
              label="Word Selection"
              onChange={
                formik.handleChange
              }
            >
              <MenuItem value="random">
                Random
              </MenuItem>

              <MenuItem value="host">
                Host
              </MenuItem>
            </Select>
          </FormControl>

          {/* SUBMIT */}

          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={loading}

            sx={{
              mt: 2,

              height: 54,

              borderRadius: 3,

              fontWeight: "bold",

              fontSize: 16
            }}
          >
            {
              loading  ? <CircularProgress size={24} /> : "Create Lobby"
            }
            
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}