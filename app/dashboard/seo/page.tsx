
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"

export default function SEOPage() {
    const [topic, setTopic] = useState("")
    const [loading, setLoading] = useState(false)

    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 z-30 border-b border-zinc-800 bg-black/95 px-8 py-5">
                <h1 className="text-2xl font-semibold tracking-tight text-white">SEO Brief Generator</h1>
                <p className="mt-1 text-sm text-zinc-500">Research keywords and draft ranking outlines.</p>
            </header>

            <div className="p-8 flex items-center justify-center flex-1">
                <div className="text-center space-y-4 max-w-md">
                    <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Search className="h-6 w-6 text-zinc-400" />
                    </div>
                    <h2 className="text-xl font-medium text-white">Coming Soon</h2>
                    <p className="text-zinc-500">The SEO Agent is currently being trained on the latest ranking algorithms.</p>
                    <Button variant="outline" className="w-full">Notify me when ready</Button>
                </div>
            </div>
        </div>
    )
}
