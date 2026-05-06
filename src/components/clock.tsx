"use client"

import { useEffect, useState } from "react"

export function Clock() {
  const [time, setTime] = useState("")

  useEffect(() => {

    const updateClock = () => {
      const now = new Date()

      const formatted = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })

      setTime(formatted)
    }

    updateClock()

    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)

  }, [])

  return (
    <span className="text-black font-semibold text-lg">
      {time}
    </span>
  )
}