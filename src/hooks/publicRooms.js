import { useEffect, useRef, useState, useCallback } from "react"
import { PARTYKIT_ORIGIN } from "../helper/partykitEndpoint"

const DEFAULT_WS_URL =
  `${PARTYKIT_ORIGIN}/parties/register/public`

const DEFAULT_LIMIT = 10

export default function usePublicRooms({
  wsUrl = DEFAULT_WS_URL,
  limit = DEFAULT_LIMIT,
  autoConnect = true,
} = {}) {

  const socketRef = useRef(null)

  const [rooms, setRooms] = useState([])
  const [activeRooms, setActiveRooms] = useState(0)
  const [activePlayers, setActivePlayers] = useState(0)

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)

  // -------------------------
  // SEND: get_rooms
  // -------------------------
  const fetchRooms = useCallback((offset = 0) => {
    const socket = socketRef.current
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify({
      type: "get_rooms",
      offset,
      limit,
    }))
  }, [limit])

  // -------------------------
  // REMOVE A ROOM LOCALLY
  // (used by consumers when a timer finishes)
  // -------------------------
  const removeRoom = useCallback((roomId) => {
    setRooms(prev => {
      const room = prev.find(r => r.roomId === roomId)
      if (!room) return prev

      setActiveRooms(a => Math.max(0, a - 1))
      setActivePlayers(a => Math.max(0, a - (room.players || 0)))

      return prev.filter(r => r.roomId !== roomId)
    })
  }, [])

  // -------------------------
  // CORE: connect socket
  // -------------------------
  const connect = useCallback(() => {
    // close existing
    if (socketRef.current) {
      socketRef.current.close()
    }

    setLoading(true)
    setRooms([])
    setHasMore(true)
    setError(null)

    const socket = new WebSocket(wsUrl)
    socketRef.current = socket

    socket.onopen = () => {
      setConnected(true)
      fetchRooms(0)
    }

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)

        // INITIAL / PAGINATED
        if (msg.type === "get_rooms_response") {
          setRooms(prev => {
            if (msg.offset === 0) return msg.rooms || []

            const map = new Map()
            prev.forEach(r => map.set(r.roomId, r))
            ;(msg.rooms || []).forEach(r => map.set(r.roomId, r))
            return [...map.values()]
          })

          setActivePlayers(msg.activePlayers ?? 0)
          setActiveRooms(msg.activeRooms ?? 0)
          setHasMore(msg.hasMore ?? false)
          setLoading(false)
          setLoadingMore(false)
        }

        // DELTA UPDATE
        if (msg.type === "rooms_updated") {
          const updatedRooms = msg.rooms || []
          setRooms(prev => {
            const updatedIds = new Set(updatedRooms.map(r => r.roomId))
            return [
              ...updatedRooms,
              ...prev.filter(r => !updatedIds.has(r.roomId)),
            ]
          })
          if (msg.activePlayers != null) setActivePlayers(msg.activePlayers)
          if (msg.activeRooms != null) setActiveRooms(msg.activeRooms)
        }

        // REMOVE
        if (msg.type === "rooms_removed") {
          const ids = new Set(msg.roomIds || [])
          setRooms(prev => prev.filter(r => !ids.has(r.roomId)))
        }

      } catch (err) {
        console.error("usePublicRooms parse error", err)
      }
    }

    socket.onerror = (err) => {
      console.error("usePublicRooms socket error", err)
      setError(err)
      setLoading(false)
    }

    socket.onclose = () => {
      setConnected(false)
    }
  }, [wsUrl, fetchRooms])

  // -------------------------
  // DISCONNECT
  // -------------------------
  const disconnect = useCallback(() => {
    socketRef.current?.close()
    socketRef.current = null
  }, [])

  // -------------------------
  // REFRESH (reconnect + refetch)
  // -------------------------
  const refresh = useCallback(() => {
    connect()
  }, [connect])

  // -------------------------
  // LOAD MORE
  // -------------------------
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    fetchRooms(rooms.length)
  }, [loadingMore, hasMore, fetchRooms, rooms.length])

  // -------------------------
  // AUTO CONNECT
  // -------------------------
  useEffect(() => {
    if (autoConnect) connect()
    return () => disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    // data
    rooms,
    activeRooms,
    activePlayers,

    // state
    loading,
    loadingMore,
    hasMore,
    connected,
    error,

    // actions
    refresh,
    loadMore,
    removeRoom,
    connect,
    disconnect,
  }
}
