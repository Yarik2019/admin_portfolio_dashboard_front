"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function SonnerWarning() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
    </div>
  );
}
