
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Plus, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export default function EventsPage() {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Product Launch: Alpha",
            date: "Oct 24, 2026",
            location: "San Francisco, CA",
            registrations: 1240,
            status: "Active"
        },
        {
            id: 2,
            title: "Founder Networking Night",
            date: "Nov 12, 2026",
            location: "New York, NY",
            registrations: 85,
            status: "Draft"
        }
    ])

    return (
        <>
            <header className="sticky top-0 z-30 border-b border-zinc-800 bg-black/95 px-8 py-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-white">Event Manager</h1>
                        <p className="mt-1 text-sm text-zinc-500">Create events and track Supabase-powered signups.</p>
                    </div>
                    <Button className="bg-white text-black hover:bg-zinc-200">
                        <Plus className="h-4 w-4 mr-2" /> Create Event
                    </Button>
                </div>
            </header>

            <div className="p-8">
                <div className="grid gap-6">
                    {events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:bg-zinc-900"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="mt-2 flex items-center gap-4 text-sm text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${event.status === 'Active'
                                                ? 'bg-green-500/10 text-green-500 ring-1 ring-inset ring-green-500/20'
                                                : 'bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20'
                                            }`}>
                                            {event.status}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                                            <Users className="h-3 w-3" />
                                            {event.registrations} Registrations
                                        </span>
                                    </div>
                                </div>

                                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500">
                                    Manage <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
