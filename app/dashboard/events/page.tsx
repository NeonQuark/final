
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Plus, ArrowUpRight, X } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

type Event = {
    id: string
    title: string
    date: string
    location: string
    registrations_count: number
    status: string
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [newItem, setNewItem] = useState({ title: "", date: "", location: "" })

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            if (data) setEvents(data)
        } catch (error) {
            console.error('Error fetching events:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        if (!newItem.title || !newItem.date) return
        toast.promise(createEventPromise(), {
            loading: 'Creating event...',
            success: 'Event created!',
            error: 'Failed to create event'
        })
    }

    const createEventPromise = async () => {
        const { data, error } = await supabase
            .from('events')
            .insert([{
                title: newItem.title,
                date: newItem.date,
                location: newItem.location,
                registrations_count: 0,
                status: 'Active'
            }])
            .select()

        if (error) throw error
        if (data) {
            setEvents([data[0] as unknown as Event, ...events])
            setIsCreateOpen(false)
            setNewItem({ title: "", date: "", location: "" })
        }
    }

    return (
        <>
            <header className="sticky top-0 z-30 border-b border-zinc-800 bg-black/95 px-8 py-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-white">Event Manager</h1>
                        <p className="mt-1 text-sm text-zinc-500">Create events and track Supabase-powered signups.</p>
                    </div>
                    <Button onClick={() => setIsCreateOpen(true)} className="bg-white text-black hover:bg-zinc-200">
                        <Plus className="h-4 w-4 mr-2" /> Create Event
                    </Button>
                </div>
            </header>

            <div className="p-8">
                {loading ? (
                    <div className="text-zinc-500">Loading events...</div>
                ) : (
                    <div className="grid gap-6">
                        {events.length === 0 && (
                            <div className="text-center py-10 border border-dashed border-zinc-800 rounded-xl text-zinc-500">
                                No events found. Create one to get started.
                            </div>
                        )}
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
                                                {event.registrations_count || 0} Registrations
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
                )}
            </div>

            {/* Simple Modal for Creation */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-white">New Event</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsCreateOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-zinc-400">Title</label>
                                <Input
                                    className="bg-black/50 border-zinc-800 text-white mt-1"
                                    value={newItem.title}
                                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                    placeholder="e.g. Product Launch"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-zinc-400">Date</label>
                                <Input
                                    className="bg-black/50 border-zinc-800 text-white mt-1"
                                    value={newItem.date}
                                    onChange={e => setNewItem({ ...newItem, date: e.target.value })}
                                    placeholder="e.g. Oct 24, 2026"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-zinc-400">Location</label>
                                <Input
                                    className="bg-black/50 border-zinc-800 text-white mt-1"
                                    value={newItem.location}
                                    onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                                    placeholder="e.g. San Francisco"
                                />
                            </div>
                        </div>
                        <div className="pt-2 flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                            <Button className="bg-white text-black hover:bg-zinc-200" onClick={handleCreate}>Create Event</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
