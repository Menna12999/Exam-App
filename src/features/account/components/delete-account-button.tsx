"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@//shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

interface DeleteAccountModalProps {
  onDelete: () => void;
  isPending?: boolean;
}

export function DeleteAccountModal({
  onDelete,
  isPending = false,
}: DeleteAccountModalProps) {
  // Translation
  const t = useTranslations("auth");

  // State
  const [open, setOpen] = useState(false);

  // Functions
  const handleDelete = () => {
    setOpen(false);
    onDelete();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="destructive"/>}>
       
          {t("delete-account")}
      </DialogTrigger>

      <DialogContent className="text-center font-mono p-0 max-w-139.5! overflow-hidden">
        <DialogHeader className="flex flex-col items-center justify-center gap-4 p-9">
          {/* Warning icon: outer ring + inner circle */}
          <div className="flex size-28 items-center justify-center rounded-full bg-red-50">
            <div className="flex size-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="size-12 text-red-600" />
            </div>
          </div>

          <DialogTitle className="text-center text-lg font-semibold text-red-600">
            {t("delete-account-title")}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            {t("delete-account-description")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 border-t border-gray-200 bg-gray-50 p-9">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="!rounded-none bg-gray-200 hover:!bg-gray-300"
          >
            {t("cancel")}
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className=" !rounded-none bg-red-600 text-white"
          >
            {t("confirm-delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}