import { useEffect, useMemo, useRef, useState } from "react"

import useSound from "../sounds/player"

export default function GameTimer({
  startTime,
  totalTime,
  onFinish = () => {}
}) {

  /*
  =========================================
  startTime:
  timestamp in ms

  totalTime:
  seconds
  =========================================
  */

  const remainingSeconds = () => Math.max(0, Math.ceil((startTime + totalTime * 1000 - Date.now()) / 1000))
  const [timeLeft, setTimeLeft] = useState(remainingSeconds)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  /*
  =========================================
  TIMER LOOP
  =========================================
  */

  useEffect(() => {
    let finished = false
    let interval
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((startTime + totalTime * 1000 - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining === 0 && !finished) {
        finished = true
        clearInterval(interval)
        onFinishRef.current()
        stopRef.current?.()
        stopRef.current = null
      }
    }
    tick()
    if (!finished) interval = setInterval(tick, 200)
    return () => clearInterval(interval)
  }, [startTime, totalTime])

  


  /*
  =========================================
  PERCENTAGE
  =========================================
  */

  const percentage = useMemo(() => {

    return (
      timeLeft / totalTime
    )

  }, [timeLeft, totalTime])

  /*
  =========================================
  Sound
  =========================================
  */
  const playSound = useSound()
  const stopRef = useRef(null)
  const isLow = timeLeft > 0 && percentage < 0.3

  useEffect(() => {
    if (isLow && !stopRef.current) {
      stopRef.current = playSound({ type: "tick", repeat: true })
    }

    if (!isLow && stopRef.current) {
      stopRef.current()
      stopRef.current = null
    }

    return () => {
      if (stopRef.current) {
        stopRef.current()
        stopRef.current = null
      }
    }
  }, [isLow])


  /*
  =========================================
  COLOR
  =========================================
  */

  const color =
    percentage <= 0.3
      ? "var(--whueo-hex_ff5252)"
      : "var(--whueo-hex_4caf50)"

  /*
  =========================================
  FORMATTED TEXT
  =========================================
  */

  const formatted = useMemo(() => {

    const days =
      Math.floor(timeLeft / 86400)

    const hours =
      Math.floor((timeLeft % 86400) / 3600)

    const minutes =
      Math.floor((timeLeft % 3600) / 60)

    const seconds =
      timeLeft % 60

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}min ${seconds}s`
    }

    if (hours > 0) {
      return `${hours}h ${minutes}min ${seconds}s`
    }

    if (minutes > 0) {
      return `${minutes}min ${seconds}s`
    }

    return `${seconds}s`

  }, [timeLeft])

  return (
    <span style={{ color }}>{formatted}</span>
  )
}
