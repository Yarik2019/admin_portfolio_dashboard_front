"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function SonnerInfo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
    </div>
  );
}
