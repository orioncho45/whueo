import {
  useEffect,
  useState,
  useCallback
} from "react"

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"

import { useDispatch, useSelector } from "react-redux"

import { getSocket } from "../socket/test"
import { closePlayers } from "../store/features/players"
import { GameAvatar } from "./utils/avatar"
import ConnectionStatus from "./utils/connectionStatus"

export default function Players({
  inGame = false,
  showAlert = () => {},
  confirmAction = () => {}
}) {

  const socket = getSocket()

  const dispatch = useDispatch()

  const roomData =
    useSelector(
      state => state.roomData.value
    )

  const currentSocketId =
    useSelector(
      state => state.personal.value?.socketId
    )

  const [loadingIds, setLoadingIds] =
    useState(new Set())

  const [votedIds, setVotedIds] =
    useState(new Set())

  // -----------------------------------
  // LOADING HELPERS
  // -----------------------------------

  const addLoading =
    useCallback((id) => {

      setLoadingIds(prev =>
        new Set([...prev, id])
      )

    }, [])

  const removeLoading =
    useCallback((id) => {

      setLoadingIds(prev => {

        const next =
          new Set(prev)

        next.delete(id)

        return next
      })

    }, [])

  // -----------------------------------
  // USER LEFT LISTENER
  // -----------------------------------

  useEffect(() => {

    const handler = (msg) => {

      try {

        const payload =
          msg.payload || {}

        const ids =
          payload.socketId || []

        ids.forEach(id => {

          removeLoading(id)

          setVotedIds(prev => {

            const next =
              new Set(prev)

            next.delete(id)

            return next
          })
        })

      } catch (err) {

        //console.log(g(err)
      }
    }

    socket.on?.(
      "user_left",
      handler
    )

    return () => {

      socket.off?.(
        "user_left",
        handler
      )
    }

  }, [socket, removeLoading])

  // -----------------------------------
  // GUARD
  // -----------------------------------

  if (!roomData)
    return null

  const players =
    Object.entries(
      roomData.players || {}
    )

  const isHost =
    currentSocketId ===
    roomData.hostId

  // -----------------------------------
  // VOTE KICK
  // -----------------------------------

  const doVoteKick =
    (targetId) => {

      addLoading(targetId)

      socket.emit(
        "votekick",
        { target: targetId },
        (res) => {

          removeLoading(targetId)

          if (!res?.success) {

            if (res?.message) {

              showAlert(
                "error",
                res.message
              )
            }

            return
          }

          setVotedIds(prev =>
            new Set([
              ...prev,
              targetId
            ])
          )
        }
      )
    }

  // -----------------------------------
  // HOST KICK
  // -----------------------------------

  const doKick =
    (targetId) => {
      confirmAction({
        type: "danger",
        title: "Kick Player?",
        message: "Do you want to kick the player?",
        onConfirm: ()=>{
          addLoading(targetId)

          socket.emit(
            "kick",
            { target: targetId },
            (res) => {

              if (!res?.success) {

                removeLoading(targetId)

                if (res?.message) {

                  showAlert(
                    "error",
                    res.message
                  )
                }
              }

              // success:
              // wait for broadcast
            }
          )
        }
      })
      
    }

  return (
    <Paper
      sx={{
        position: "fixed",
        right: 20,
        top: inGame
          ? 80
          : 40,

        width: 340,
        maxHeight: 500,

        zIndex: 9999,

        display: "flex",
        flexDirection: "column",

        borderRadius: '16px',
        backgroundColor: 'var(--whueo-rgba_0_0_0_0p4)', // Light opacity black
        backdropFilter: 'blur(4px)',          // Subtle glassmorphism effect
        border: '1px solid var(--whueo-rgba_255_255_255_0p1)',
        

        overflow: "hidden",

        
        "@media (max-width:768px)": {

          width: 280,

          right: 10,
        }
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          px: 2,
          py: 1.5,

          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          borderBottom:
            "1px solid var(--whueo-hex_1f2937)"
        }}
      >

        <Typography
          fontWeight={700}
          color="var(--whueo-hex_ffffff)"
        >
          Players
        </Typography>

        <IconButton
          size="small"
          onClick={() =>
            dispatch(
              closePlayers()
            )
          }
          sx={{
            color: "var(--whueo-hex_9ca3af)"
          }}
        >
          <CloseIcon />
        </IconButton>

      </Box>

      {/* PLAYER LIST */}

      <Stack
        spacing={1}
        sx={{
          p: 1.5,
          overflowY: "auto"
        }}
      >

        {players.map(([id, p]) => {

          const loading =
            loadingIds.has(id)

          const voted =
            votedIds.has(id)

          const isYou =
            id === currentSocketId

          return (
            <Box
              key={id}
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent:
                  "space-between",

                gap: 1.5,

                p: 1.2,

                borderRadius: 2,

                bgcolor:
                  "var(--whueo-rgba_91_126_91_0p03)",

                border:
                  "1px solid var(--whueo-rgba_255_255_255_0p05)"
              }}
            >

              {/* LEFT */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  minWidth: 0
                }}
              >

                <GameAvatar id={p.userId} size={42} />

                <Box
                  sx={{
                    minWidth: 0
                  }}
                >

                  <Typography
                    noWrap
                    sx={{
                      color: "var(--whueo-hex_ffffff)",
                      fontWeight: 600,
                      fontSize: 14
                    }}
                  >
                    {p.username}

                    {isYou &&
                      " (You)"}

                    {p.eliminated &&
                      " 💀"}
                  </Typography>

                  <ConnectionStatus connected={p.connected !== false} />

                  {id ===
                    roomData.hostId && (
                    <Typography
                      sx={{
                        color:
                          "var(--whueo-hex_7db87a)",
                        fontSize: 11
                      }}
                    >
                      Host
                    </Typography>
                  )}

                </Box>

              </Box>

              {/* ACTION */}

              {!isYou && (

                isHost ? (

                  <Button
                    variant="contained"
                    color="error"

                    size="small"

                    disabled={loading}

                    onClick={() =>
                      doKick(id)
                    }

                    sx={{
                      minWidth: 80,
                      textTransform:
                        "none",
                      fontWeight: 600
                    }}
                  >

                    {loading ? (
                      <CircularProgress
                        size={18}
                        sx={{
                          color:
                            "var(--whueo-hex_ffffff)"
                        }}
                      />
                    ) : (
                      "Kick"
                    )}

                  </Button>

                ) : (

                  <Button
                    variant="contained"

                    size="small"

                    disabled={
                      loading ||
                      voted
                    }

                    onClick={() =>
                      doVoteKick(id)
                    }

                    sx={{
                      minWidth: 110,

                      textTransform:
                        "none",

                      fontWeight: 600
                    }}
                  >

                    {loading ? (

                      <CircularProgress
                        size={18}
                        sx={{
                          color:
                            "var(--whueo-hex_ffffff)"
                        }}
                      />

                    ) : voted ? (

                      "Voted"

                    ) : (

                      "Vote Kick"

                    )}

                  </Button>

                )

              )}

            </Box>
          )
        })}

      </Stack>

    </Paper>
  )
}
