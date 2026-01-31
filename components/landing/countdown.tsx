
"use client"

import { useEffect, useState } from "react"

export function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        // Set launch date to 3 days from now for demo
        const launchDate = new Date()
        launchDate.setDate(launchDate.getDate() + 3)

        const interval = setInterval(() => {
            const now = new Date()
            const difference = launchDate.getTime() - now.getTime()

            if (difference <= 0) {
                clearInterval(interval)
                return
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((difference / 1000 / 60) % 60)
            const seconds = Math.floor((difference / 1000) % 60)

            setTimeLeft({ days, hours, minutes, seconds })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="grid grid-cols-4 gap-4 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg min-w-[80px]">
                    <span className="text-3xl font-mono font-bold text-white">{value.toString().padStart(2, '0')}</span>
                    <span className="text-xs uppercase text-zinc-500 mt-1">{unit}</span>
                </div>
            ))}
        </div>
    )
}
