import { Box } from "@mui/material"
import { useState, useEffect, useRef, useCallback } from "react"
import { GameAvatar } from "./utils/avatar"

function seededRand(seed) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h ^= h << 13
    h ^= h >> 7
    h ^= h << 17
    return (h >>> 0) / 4294967296
  }
}

function OrbitingPlayer({
  player,
  socketId,
  hostId,
  containerSize,
  orbitParams,
}) {
  const nodeRef = useRef(null)
  const frameRef = useRef(null)
  const startRef = useRef(null)

  const isHost = socketId === hostId

  const {
    rx,
    ry,
    speed,
    phaseOffset,
    dir,
    inclination,
    centerX,
    centerY,
  } = orbitParams

  const { W, H } = containerSize

  const animate = useCallback(
    (timestamp) => {
      if (!startRef.current) startRef.current = timestamp

      const elapsed = (timestamp - startRef.current) / 1000

      const angle =
        phaseOffset +
        dir * (elapsed / speed) * Math.PI * 2

      const x = rx * Math.cos(angle)

      const y =
        ry *
        Math.sin(angle) *
        Math.cos(inclination)

      const z =
        ry *
        Math.sin(angle) *
        Math.sin(inclination)

      const cx = W / 2 + centerX + x
      const cy = H / 2 + centerY + y

      const scale =
        0.7 +
        ((z + ry) / (2 * ry)) * 0.6

      if (nodeRef.current) {
        nodeRef.current.style.transform =
          `translate(${cx - 24}px, ${cy - 24}px) scale(${scale})`
        nodeRef.current.style.zIndex =
          Math.floor(scale * 100)
      }

      frameRef.current =
        requestAnimationFrame(animate)
    },
    [
      rx,
      ry,
      speed,
      phaseOffset,
      dir,
      inclination,
      centerX,
      centerY,
      W,
      H,
    ]
  )

  useEffect(() => {
    frameRef.current =
      requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [animate])

  return (
    <Box
      ref={nodeRef}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {isHost && (
          <Box
            sx={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12px",
              zIndex: 10,
            }}
          >
            👑
          </Box>
        )}

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.25)",
            overflow: "hidden",
            boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          <GameAvatar id={player.userId} />
        </Box>
      </Box>

      <Box
        sx={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.7)",
          whiteSpace: "nowrap",
          letterSpacing: "0.04em",
          fontWeight: 500,
        }}
      >
        {player.username}
      </Box>
    </Box>
  )
}

export default function OrbitingPlayers({ players = [], hostId }) {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ W: 600, H: 520 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({
        W: entry.contentRect.width,
        H: entry.contentRect.height,
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const orbitData = players.map(([sid, player]) => {
    const rng = seededRand(`${player.userId}-orbit`)

    return {
      sid,
      player,
      rx: 80 + rng() * 140,
      ry: 50 + rng() * 120,
      inclination:
        (20 + rng() * 140) *
        (Math.PI / 180),
      centerX: (rng() - 0.5) * 120,
      centerY: (rng() - 0.5) * 120,
      speed: 12 + rng() * 18,
      phaseOffset: rng() * Math.PI * 2,
      dir: rng() > 0.5 ? 1 : -1,
    }
  })

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        zIndex: 0,
      }}
    >
      {orbitData.map(
        ({
          sid,
          player,
          rx,
          ry,
          inclination,
          speed,
          phaseOffset,
          dir,
          centerX,
          centerY,
        }) => (
          <OrbitingPlayer
            key={sid}
            player={player}
            socketId={sid}
            hostId={hostId}
            containerSize={containerSize}
            orbitParams={{
              rx,
              ry,
              inclination,
              speed,
              phaseOffset,
              dir,
              centerX,
              centerY,
            }}
          />
        )
      )}
    </Box>
  )
}