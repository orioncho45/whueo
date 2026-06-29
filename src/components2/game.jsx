import { useState, useEffect } from "react"
import { Box, Button, Stack } from "@mui/material"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"

import JoinRoomForm from "./builder/formjoin"
import RoomCodeForm from "./builder/roomCode"
import GameBuilder from "./builder/gameBuilder"
import PublicRoomsList from "./builder/publicRoomList"
import Selector from "./builder/selector"

import generateRoomId from "../uniqueId"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// ── nav bar ──────────────────────────────────────────────
const FlowNav = ({ onBack, onHome }) => {
  if (!onBack && !onHome) return null

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{ px: 2, pt: 1.5, pb: 0.5 }}
    >
      {onBack && (
        <Button
          onClick={onBack}
          variant="contained"
          color="primary"
          sx={{
            gap: 0.75,
            px: 1.25,
            borderRadius: "10px",
            fontSize: 13,
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": { bgcolor: "action.hover", color: "text.primary" }
          }}
        >
          <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
          Back
        </Button>
      )}

      {onBack && onHome && (
        <Box
          sx={{
            width: "1px",
            height: 16,
            bgcolor: "divider",
            mx: 0.5
          }}
        />
      )}

      {onHome && (
        <Button
          onClick={onHome}
          variant="contained"
          color="primary"
          sx={{
            gap: 0.75,
            px: 1.25,
            borderRadius: "10px",
            fontSize: 13,
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": { bgcolor: "action.hover", color: "text.primary" }
          }}
        >
          <HomeRoundedIcon sx={{ fontSize: 16 }} />
          Home
        </Button>
      )}
    </Stack>
  )
}

// ── flow ─────────────────────────────────────────────────
export default function GameRoomFlow({ showAlert, join_code, preStep }) {
  const [step, setStep] = useState(join_code ? "join_room" : preStep ? preStep : "selection")
  const [roomId, setRoomId] = useState(null)
  const navigate = useNavigate()
  const roomData = useSelector(state => state.roomData.value)

  useEffect(() => {
    setStep(join_code ? "join_room" : preStep ? preStep : "selection")
  }, [join_code, preStep])

  const goHome = () => setStep("selection")

  // ── selection ─────────────────────────────
  if (step === "selection") {
    return (
      <Selector
        onClick={next => {
          if (next === "create_username") setRoomId(generateRoomId())
          setStep(next)
        }}
      />
    )
  }

  // ── create: username ──────────────────────
  if (step === "create_username") {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <FlowNav onBack={() => setStep("selection")} />
        <Box flex={1} minHeight={0}>
          <JoinRoomForm
            isOwn
            roomId={roomId}
            showAlert={showAlert}
            onJoined={() => setStep("builder")}
          />
        </Box>
      </Box>
    )
  }

  // ── create: builder ───────────────────────
  if (step === "builder") {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <FlowNav onHome={goHome} />
        <Box flex={1} minHeight={0}>
          <GameBuilder showAlert={showAlert} roomId={roomId} />
        </Box>
      </Box>
    )
  }

  // ── join: room code ───────────────────────
  if (step === "join_room") {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <FlowNav
          onBack={join_code ? undefined : () => setStep("selection")}
          onHome={join_code ? goHome : undefined}
        />
        <Box flex={1} minHeight={0}>
          <RoomCodeForm
            join_code={join_code}
            showAlert={showAlert}
            onJoin={({ roomId: joinedRoomId }) => {
              setRoomId(joinedRoomId)
              setStep("join_username")
            }}
          />
        </Box>
      </Box>
    )
  }

  // ── join: username ────────────────────────
  if (step === "join_username") {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <FlowNav onBack={() => setStep("join_room")} />
        <Box flex={1} minHeight={0}>
          <JoinRoomForm
            roomId={join_code || roomData?.id}
            showAlert={showAlert}
          />
        </Box>
      </Box>
    )
  }

  // ── public rooms ──────────────────────────
  if (step === "public_room") {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <FlowNav onBack={() => setStep("selection")} />
        <Box flex={1} minHeight={0}>
          <PublicRoomsList
            onClick={room => navigate(`/play/room/${room.roomId}`)}
          />
        </Box>
      </Box>
    )
  }
}