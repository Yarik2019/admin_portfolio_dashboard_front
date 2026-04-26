"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerSuccess() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
    </div>
  )
}
