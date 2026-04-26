"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function SonnerError() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
    </div>
  );
}
