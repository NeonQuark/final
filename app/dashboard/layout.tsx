
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { motion } from "framer-motion"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-black">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content */}
            <motion.main
                initial={false}
                animate={{ paddingLeft: isSidebarCollapsed ? 72 : 256 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="min-h-screen"
            >
                {children}
            </motion.main>
        </div>
    )
}
