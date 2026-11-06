"use client";

import { FolderSearch, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "@/i18n/navigation";


type ResultActionsProps = {
  onRestart: () => void
};


export default function ResultActions({onRestart}: ResultActionsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-6">
      <Button
        type="button"
        onClick={onRestart}
        className="h-10 flex-1 gap-2 rounded-none bg-gray-200 font-mono text-xs text-gray-800 hover:bg-gray-300"
      >
        <RotateCcw className="size-4" />
        Restart
      </Button>

      <Button
        type="button"
        onClick={() => router.push("/")}
        className="h-10 flex-1 gap-2 rounded-none bg-blue-600 font-mono text-xs text-white hover:bg-blue-700"
      >
        <FolderSearch className="size-4" />
        Explore
      </Button>
    </div>
  );
}