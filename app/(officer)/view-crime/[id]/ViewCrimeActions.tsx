"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function ViewCrimeActions() {
  const router = useRouter();

  return (
    <div className="buttons">
      <Button type="button" onClick={() => window.print()}>
        Print Report
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => router.push("/search-reports")}
      >
        Close
      </Button>
    </div>
  );
}
