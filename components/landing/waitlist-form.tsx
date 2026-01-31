
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner" // Assuming sonner is installed as per package.json

export function WaitlistForm() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }])

            if (error) {
                // Handle unique constraint error gracefully
                if (error.code === '23505') {
                    toast.success("You're already on the list!")
                    setSubmitted(true)
                } else {
                    throw error
                }
            } else {
                toast.success("Spot reserved! We'll be in touch.")
                setSubmitted(true)
            }
        } catch (error: any) {
            console.error('Error:', error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h3 className="text-green-400 font-medium">You're on the list!</h3>
                <p className="text-sm text-zinc-400 mt-2">Watch your inbox for updates.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <div className="flex gap-2">
                <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-blue-500"
                />
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white">
                    {loading ? "Joining..." : "Join"}
                </Button>
            </div>
            <p className="text-xs text-zinc-500 text-center">
                Join 2,000+ others waiting for early access.
            </p>
        </form>
    )
}
