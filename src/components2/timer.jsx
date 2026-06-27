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

  const [timeLeft, setTimeLeft] =
    useState(totalTime)
  const [stop, setStop] = useState(null)

  /*
  =========================================
  TIMER LOOP
  =========================================
  */

  useEffect(() => {

    const interval = setInterval(() => {

      const elapsed =
        Math.floor(
          (Date.now() - startTime) / 1000
        )

      const remaining =
        totalTime - elapsed

      if (remaining <= 0) {

        setTimeLeft(0)

        clearInterval(interval)

        onFinish()
        if (stopRef.current) {
          stopRef.current()
          stopRef.current = null
        }


        return
      }

      setTimeLeft(remaining)

    }, 200)

    return () =>
      clearInterval(interval)

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
      ? "#ff5252"
      : "#4caf50"

  /*
  =========================================
  FORMATTED TEXT
  =========================================
  */

  const formatted = useMemo(() => {

    const minutes =
      Math.floor(timeLeft / 60)

    const seconds =
      timeLeft % 60

    if (minutes <= 0) {
      return `${seconds}s`
    }

    return `${minutes}min ${seconds}s`

  }, [timeLeft])

  return (
    <span style={{ color }}>{formatted}</span>
  )
}