"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { toggleStarMarked } from "@/modules/dashboard/actions"
import { StarIcon, StarOffIcon } from "lucide-react"
import type React from "react"
import { useState, useEffect, forwardRef } from "react"
// import { toast } from "sonner"

interface MarkedToggleButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision: boolean
  id: string
}

type ToggleButtonClickEvent = Parameters<
  NonNullable<MarkedToggleButtonProps["onClick"]>
>[0]

export const MarkedToggleButton = forwardRef<HTMLButtonElement, MarkedToggleButtonProps>(
  ({ markedForRevision, id, onClick, className, children, ...props }, ref) => {
    const [isMarked, setIsMarked] = useState(markedForRevision)

    useEffect(() => {
      setIsMarked(markedForRevision)
    }, [markedForRevision])

    const handleToggle = async (event: ToggleButtonClickEvent) => {
      onClick?.(event)

      const newMarkedState = !isMarked
      setIsMarked(newMarkedState)

      try {
        const res = await toggleStarMarked(id, newMarkedState)
        const { success, error, isMarked: serverIsMarked } = res

        if (success && serverIsMarked) {
          toast.add({
            title: "Marked as Favorite successfully",
            type: "success",
          })
        } else if (success && !serverIsMarked) {
          toast.add({
            title: "Removed from Favorite successfully",
            type: "success",
          })
        } else {
          toast.add({
            title: error ?? "Failed to update Favorite",
            type: "error",
          })
          setIsMarked(!newMarkedState)
        }
      } catch (error) {
        console.error("Failed to toggle mark for revision:", error)
        setIsMarked(!newMarkedState)
      }
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        className={`flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
        onClick={handleToggle}
        {...props}
      >
        {isMarked ? (
          <StarIcon size={16} className="text-red-500 mr-2" />
        ) : (
          <StarOffIcon size={16} className="text-gray-500 mr-2" />
        )}
        {children || (isMarked ? "Remove Favorite" : "Add to Favorite")}
      </Button>
    )
  },
)

MarkedToggleButton.displayName = "MarkedToggleButton"