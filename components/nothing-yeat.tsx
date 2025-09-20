import type React from "react"
import { cn } from "@/lib/utils"

interface NothingYetProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function NothingYet({
  title = "Nothing here yet",
  description = "There's no content to display at the moment.",
  icon,
  className,
  children,
}: NothingYetProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && <div className="mb-4 text-muted-foreground/50">{icon}</div>}

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground/70 max-w-sm">{description}</p>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
