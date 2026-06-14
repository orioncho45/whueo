import { useEffect, useMemo, useState } from "react"

import {
  Box,
  Typography
} from "@mui/material"

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
    <b style={{color: `${color} !important`}} >{formatted}</b>
  )
}