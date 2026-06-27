import { Box, Paper, Typography, Stack, Chip, CircularProgress, Button, IconButton, Tooltip } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import GameTimer from "../timer"
import usePublicRooms from "../../hooks/publicRooms"
import { LOBBY_TTL } from "../../helper/ttls"

export default function PublicRoomsList({ onClick = () => {} }) {

  const {
    rooms,
    activeRooms,
    activePlayers,
    loading,
    loadingMore,
    hasMore,
    refresh,
    loadMore,
    removeRoom,
  } = usePublicRooms()

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
        sx={{ px: 4 }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 700,
            p: 5,
            borderRadius: 5,
            overflow: "hidden",
            position: "relative",
            bgcolor: "transparent",
            color: "white",
            border: "3px solid #374151",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              bgcolor: "rgba(33, 150, 243, 0.14)",
              filter: "blur(120px)",
              top: -150,
              right: -120,
              pointerEvents: "none",
            }}
          />
          <Stack spacing={2} alignItems="center" position="relative" zIndex={2}>
            <CircularProgress size={60} />
            <Typography variant="h6" fontWeight={700}>
              Loading Public Rooms...
            </Typography>
            <Typography variant="body2" color="gray">
              Fetching active players and rooms
            </Typography>
          </Stack>
        </Paper>
      </Box>
    )
  }

  // -------------------------
  // EMPTY
  // -------------------------
  if (!rooms.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
        bgcolor="brand.dark"
        sx={{ px: 4 }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 700,
            p: 5,
            borderRadius: 5,
            overflow: "hidden",
            position: "relative",
            bgcolor: "transparent",
            color: "white",
            border: "3px solid #374151",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.05)",
              filter: "blur(120px)",
              top: -150,
              right: -120,
              pointerEvents: "none",
            }}
          />
          <Stack spacing={2} alignItems="center" position="relative" zIndex={2}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid #3f3f46",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 40,
              }}
            >
              🎮
            </Box>
            <Typography variant="h5" fontWeight={800}>
              No Public Rooms
            </Typography>
            <Typography color="gray" textAlign="center" maxWidth={400}>
              Looks quiet right now. Create a room and become the first squad online.
            </Typography>
            <Button
              variant="outlined"
              onClick={refresh}
              startIcon={<RefreshIcon />}
              sx={{
                mt: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#374151",
                color: "gray",
                "&:hover": { borderColor: "#15ff00", color: "#15ff00" },
              }}
            >
              Refresh
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 500,
          color: "white",
          bgcolor: "transparent",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #2b313d",
          borderRadius: 5,
          p: 4,
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            bgcolor: "rgba(21, 255, 0, 0.12)",
            filter: "blur(130px)",
            top: -170,
            right: -140,
            pointerEvents: "none",
          }}
        />

        <Stack spacing={3} position="relative" zIndex={2}>

          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h4" fontWeight={900}>
                  Public Rooms
                </Typography>
                <Tooltip title="Refresh rooms">
                  <IconButton
                    onClick={refresh}
                    size="small"
                    sx={{
                      color: "gray",
                      "&:hover": { color: "#15ff00" },
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography variant="body2" color="gray">
                Join active games happening right now
              </Typography>
            </Box>

            {/* STATS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              width={{ xs: "100%", sm: "auto" }}
            >
              <Paper
                sx={{
                  px: 2,
                  py: 1.2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid #2f2f2f",
                  borderRadius: 3,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography fontSize={22}>🏠</Typography>
                  <Box>
                    <Typography fontWeight={800} lineHeight={1}>
                      {activeRooms}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      Active Rooms
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper
                sx={{
                  px: 2,
                  py: 1.2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid #2f2f2f",
                  borderRadius: 3,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography fontSize={22}>👥</Typography>
                  <Box>
                    <Typography fontWeight={800} lineHeight={1}>
                      {activePlayers}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      Players Online
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          {/* ROOM LIST */}
          <Stack spacing={1.5}>
            {rooms.map((room) => (
              <Paper
                key={room.roomId}
                onClick={() => onClick(room)}
                sx={{
                  p: 2.2,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid #262626",
                  borderRadius: 4,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "brand.light",
                    transform: "translateY(-3px)",
                    bgcolor: "rgba(255,255,255,0.05)",
                    boxShadow: "0 10px 30px rgba(21, 255, 0, 0.12)",
                  },
                }}
              >
                {/* HOVER GLOW */}
                <Box
                  sx={{
                    position: "absolute",
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    bgcolor: "rgba(21, 255, 0, 0.12)",
                    filter: "blur(80px)",
                    top: -80,
                    right: -60,
                    pointerEvents: "none",
                  }}
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  position="relative"
                  zIndex={2}
                >
                  {/* LEFT */}
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" fontWeight={800}>
                        {room.roomId}
                      </Typography>
                      {room.private && (
                        <Chip label="Private" size="small" color="error" />
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} mt={0.7}>
                      <Typography variant="body2" color="#9ca3af">
                        ⏱{" "}
                        <GameTimer
                          startTime={room.created}
                          totalTime={LOBBY_TTL}
                          onFinish={() => removeRoom(room.roomId)}
                        />
                      </Typography>
                    </Stack>
                  </Box>

                  {/* RIGHT */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={room.state === "build" ? "Lobby" : "In Game"}
                      color={room.state === "build" ? "success" : "warning"}
                    />
                    <Chip
                      size="small"
                      label={`👥 ${room.players}/${room.maxPlayers}`}
                      color="primary"
                    />
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Stack>

          {/* LOAD MORE */}
          {hasMore && (
            <Button
              variant="contained"
              onClick={loadMore}
              disabled={loadingMore}
              sx={{
                mt: 1,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                fontSize: 16,
              }}
            >
              {loadingMore ? "Loading More Rooms..." : "Load More Rooms"}
            </Button>
          )}

        </Stack>
      </Paper>
    </Box>
  )
}