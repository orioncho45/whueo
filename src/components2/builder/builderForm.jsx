import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { connectSocket, getSocket } from "../../socket/test"
import { setRoomData } from "../../store/features/roomData"
import { useState, useMemo } from "react"
import { setPersonal } from "../../store/features/personal"
import logEvent from "../../helper/logevent"
import {
  maxImpostersAllowed,
  minRoundsRequired,
  validateGameConfig
} from "./validator"

export default function BuilderForm({
  onSubmit = () => {},
  showAlert,
  roomId,
  username,
  changeSettings = false,
  initialSettings = null
}) {
  const [loading, setLoading] = useState(false)

  const memberOptions = Array.from({ length: 9 }, (_, i) => i + 4)

  const votingOptions = Array.from({ length: 12 }, (_, i) => ({
    label: `${(i + 1) * 15}s`,
    value: (i + 1) * 15
  }))

  const validationSchema = Yup.object({
    maxMembers: Yup.number().required(),
    votingTime: Yup.number().required(),
    wordSelection: Yup.string().required(),
    impostersCount: Yup.number().required(),
    type: Yup.string().oneOf(["public", "private"]).required(),
    maxRounds: Yup.number()
      .min(Yup.ref("impostersCount"), "Not enough rounds to eliminate all imposters")
      .max(5)
      .required()
  })

  const dispatch = useDispatch()

  const connectAndCreateGame = (values) => {
    if (loading) return

    setLoading(true)
    connectSocket(roomId, (socket) => {
      socket.onopen = () => {
        socket.emit(
          "create_game",
          { ...values, roomId, username },
          ({ success, ...response }) => {
            if (success) {
              const { socketId, username, userId, roomData } = response
              dispatch(setRoomData(roomData))
              dispatch(setPersonal({ socketId, username, userId }))
              onSubmit(response)
              logEvent({ type: "CREATE", roomCode: roomId, username })
            } else {
              showAlert("error", "Something went wrong!")
            }
            setLoading(false)
          }
        )
      }
    })
  }

  const emitSettingsChange = (values) => {
    if (loading) return

    const socket = getSocket()
    if (!socket) {
      showAlert("error", "Not connected to a room!")
      return
    }

    setLoading(true)

    socket.emit("settings_change", { settings: values }, (response) => {
      const { success, ...rest } = response || {}
      if (success) {
        onSubmit(rest)
      } else {
        showAlert("error", "Something went wrong!")
      }
      setLoading(false)
    })
  }

  const formik = useFormik({
    initialValues: {
      maxMembers: initialSettings?.maxMembers ?? 4,
      votingTime: initialSettings?.votingTime ?? 60,
      wordSelection: initialSettings?.wordSelection ?? "random",
      impostersCount: initialSettings?.impostersCount ?? 1,
      type: initialSettings?.type ?? "private",
      maxRounds: initialSettings?.maxRounds ?? 1
    },
    validationSchema,
    onSubmit: (values) => {
      if (changeSettings) {
        emitSettingsChange(values)
      } else {
        connectAndCreateGame(values)
      }
    }
  })

  const validator = useMemo(() => {
    return validateGameConfig({
      maxMembers: formik.values.maxMembers,
      impostersCount: formik.values.impostersCount,
      maxRounds: formik.values.maxRounds
    })
  }, [formik.values.maxMembers, formik.values.impostersCount, formik.values.maxRounds])

  const maxAllowedImposters = maxImpostersAllowed(formik.values.maxMembers)
  const minRequiredRounds = minRoundsRequired(formik.values.impostersCount)

  return (
    <Box component="form" onSubmit={formik.handleSubmit} display="flex" flexDirection="column" gap={3}>
      <FormControl fullWidth error={formik.touched.maxMembers && Boolean(formik.errors.maxMembers)}>
        <InputLabel>Maximum Members</InputLabel>
        <Select
          name="maxMembers"
          value={formik.values.maxMembers}
          label="Maximum Members"
          onChange={(e) => {
            formik.handleChange(e)
            const newMaxImp = maxImpostersAllowed(Number(e.target.value))
            const clampedImp = Math.min(formik.values.impostersCount, newMaxImp)
            formik.setFieldValue("impostersCount", clampedImp)
            const newMinRounds = minRoundsRequired(clampedImp)
            if (formik.values.maxRounds < newMinRounds) {
              formik.setFieldValue("maxRounds", newMinRounds)
            }
          }}
        >
          {memberOptions.map((count) => (
            <MenuItem key={count} value={count}>
              {count}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{formik.errors.maxMembers}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
        <InputLabel>Room Type</InputLabel>
        <Select name="type" value={formik.values.type} label="Room Type" onChange={formik.handleChange}>
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>
        <FormHelperText>{formik.errors.type}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={formik.touched.maxRounds && Boolean(formik.errors.maxRounds)}>
        <InputLabel>Max Rounds</InputLabel>
        <Select name="maxRounds" value={formik.values.maxRounds} label="Max Rounds" onChange={formik.handleChange}>
          {[1, 2, 3, 4, 5].map((n) => (
            <MenuItem key={n} value={n} disabled={n < minRequiredRounds}>
              {n}
              {n < minRequiredRounds ? " — not allowed" : ""}
            </MenuItem>
          ))}
        </Select>
        {(validator.errors?.maxRounds ? `Minimum ${minRequiredRounds} round${minRequiredRounds > 1 ? "s" : ""} for ${formik.values.impostersCount} imposters` : "") +
        ((formik.touched.maxRounds && formik.errors.maxRounds)
          ? (validator.errors?.maxRounds ? " — " : "") + formik.errors.maxRounds
          : "") ? (
          <FormHelperText>
            {(validator.errors?.maxRounds ? `Minimum ${minRequiredRounds} round${minRequiredRounds > 1 ? "s" : ""} for ${formik.values.impostersCount} imposters` : "") +
              ((formik.touched.maxRounds && formik.errors.maxRounds)
                ? (validator.errors?.maxRounds ? " — " : "") + formik.errors.maxRounds
                : "")}
          </FormHelperText>
        ) : null}
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Voting Time</InputLabel>
        <Select name="votingTime" value={formik.values.votingTime} label="Voting Time" onChange={formik.handleChange}>
          {votingOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Imposters count</InputLabel>
        <Select
          name="impostersCount"
          value={formik.values.impostersCount}
          label="Imposters count"
          onChange={(e) => {
            formik.handleChange(e)
            const newMinRounds = minRoundsRequired(Number(e.target.value))
            if (formik.values.maxRounds < newMinRounds) {
              formik.setFieldValue("maxRounds", newMinRounds)
            }
          }}
        >
          {[1, 2, 3].map((n) => (
            <MenuItem key={n} value={n} disabled={n > maxAllowedImposters}>
              {n}
              {n > maxAllowedImposters ? " — not allowed" : ""}
            </MenuItem>
          ))}
        </Select>
        {(validator.errors?.impostersCount ? `Max ${maxAllowedImposters} for ${formik.values.maxMembers} players` : "") +
        ((formik.touched.impostersCount && formik.errors.impostersCount)
          ? (validator.errors?.impostersCount ? " — " : "") + formik.errors.impostersCount
          : "") ? (
          <FormHelperText>
            {(validator.errors?.impostersCount ? `Max ${maxAllowedImposters} for ${formik.values.maxMembers} players` : "") +
              ((formik.touched.impostersCount && formik.errors.impostersCount)
                ? (validator.errors?.impostersCount ? " — " : "") + formik.errors.impostersCount
                : "")}
          </FormHelperText>
        ) : null}
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Word Selection</InputLabel>
        <Select name="wordSelection" value={formik.values.wordSelection} label="Word Selection" onChange={formik.handleChange}>
          <MenuItem value="random">Random</MenuItem>
          <MenuItem value="host">Host</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" size="large" sx={{ mt: 2, height: 54, borderRadius: 3, fontWeight: "bold", fontSize: 16 }}>
        {loading ? <CircularProgress size={24} /> : changeSettings ? "Save Settings" : "Create Lobby"}
      </Button>
    </Box>
  )
}
