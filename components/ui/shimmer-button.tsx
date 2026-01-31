"use client"

import React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  shimmerDuration?: string
}

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      className,
      children,
      shimmerColor = "rgba(255, 255, 255, 0.3)",
      shimmerSize = "0.1em",
      shimmerDuration = "2.5s",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black, transparent)",
          }}
        >
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animationDuration: shimmerDuration,
            }}
          />
        </div>

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    )
  }
)
ShimmerButton.displayName = "ShimmerButton"

export { ShimmerButton }
