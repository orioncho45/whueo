import { useState, useCallback, useMemo } from "react"

// -------------------------------------------------------------
// Mock data generator
// -------------------------------------------------------------
const STATES = ["build", "game"]

function makeRoom(i) {
  const maxPlayers = [2, 4, 6, 8][i % 4]
  const players = Math.min(
    maxPlayers,
    Math.floor(Math.random() * maxPlayers) + 1
  )
  const state = STATES[Math.floor(Math.random() * STATES.length)]

  return {
    roomId: `ROOM-${(1000 + i).toString(36).toUpperCase()}`,
    private: Math.random() < 0.15,
    state, // "build" -> Lobby, anything else -> In Game
    players,
    maxPlayers,
    // created a few seconds/minutes ago, so GameTimer has something to count down
    created: Date.now() - Math.floor(Math.random() * 1000 * 60 * 5),
  }
}

const ALL_MOCK_ROOMS = Array.from({ length: 27 }, (_, i) => makeRoom(i))

const PAGE_SIZE = 6

// -------------------------------------------------------------
// Mock hook
// -------------------------------------------------------------
/**
 * Drop-in replacement for the real usePublicRooms hook.
 * Same return shape, but backed by local fake data + fake latency,
 * so PublicRoomsList can be designed/tested in isolation.
 *
 * Optional config (all have sensible defaults):
 *   initialLoading   - simulate the first loading spinner (default: true)
 *   simulateEmpty    - force the "No Public Rooms" empty state
 *   fakeLatencyMs    - artificial delay for refresh/loadMore (default: 600)
 */
export default function usePublicRooms({
  initialLoading = true,
  simulateEmpty = false,
  fakeLatencyMs = 600,
} = {}) {
  const [allRooms, setAllRooms] = useState(
    simulateEmpty ? [] : ALL_MOCK_ROOMS
  )
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(initialLoading)
  const [loadingMore, setLoadingMore] = useState(false)

  // fake the initial fetch
  useState(() => {
    if (initialLoading) {
      const t = setTimeout(() => setLoading(false), fakeLatencyMs)
      return () => clearTimeout(t)
    }
  })

  const rooms = useMemo(
    () => allRooms.slice(0, visibleCount),
    [allRooms, visibleCount]
  )

  const hasMore = visibleCount < allRooms.length

  const activeRooms = allRooms.length
  const activePlayers = useMemo(
    () => allRooms.reduce((sum, r) => sum + r.players, 0),
    [allRooms]
  )

  const refresh = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setAllRooms(
        simulateEmpty
          ? []
          : Array.from({ length: 20 + Math.floor(Math.random() * 15) }, (_, i) =>
              makeRoom(i)
            )
      )
      setVisibleCount(PAGE_SIZE)
      setLoading(false)
    }, fakeLatencyMs)
  }, [simulateEmpty, fakeLatencyMs])

  const loadMore = useCallback(() => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, allRooms.length))
      setLoadingMore(false)
    }, fakeLatencyMs)
  }, [allRooms.length, fakeLatencyMs])

  const removeRoom = useCallback((roomId) => {
    setAllRooms((prev) => prev.filter((r) => r.roomId !== roomId))
  }, [])

  return {
    rooms,
    activeRooms,
    activePlayers,
    loading,
    loadingMore,
    hasMore,
    refresh,
    loadMore,
    removeRoom,
  }
}