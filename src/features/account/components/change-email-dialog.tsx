"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Progress } from "@/shared/components/ui/progress";
import NewEmailStep from "./new-email-step";
import VerifyEmailStep from "./verify-email-step";

type Props = {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PENDING_TTL = 10 * 60_000; 

const pendingKey = (userId: string) => `email-change-pending:${userId}`;
const cooldownKey = (userId: string) => `email-change-cooldown:${userId}`;

type Pending = { email: string; expiresAt: number };

function readPending(userId: string): Pending | null {
  try {
    const raw = localStorage.getItem(pendingKey(userId));
    if (!raw) return null;
    const pending: Pending = JSON.parse(raw);
    return pending.expiresAt > Date.now() ? pending : null;
  } catch {
    return null;
  }
}

function clearPending(userId: string) {
  localStorage.removeItem(pendingKey(userId));
  localStorage.removeItem(cooldownKey(userId));
}

export default function ChangeEmailDialog({
  userId,
  open,
  onOpenChange,
}: Props) {
  //state
  const [step, setStep] = useState<1 | 2>(1);
  const [newEmail, setNewEmail] = useState("");

  //effects
  useEffect(() => {
    if (!open) return;

    const pending = readPending(userId);
    if (pending) {
      setNewEmail(pending.email);
      setStep(2);
    } else {
      clearPending(userId);
      setNewEmail("");
      setStep(1);
    }
  }, [open, userId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 rounded-none p-0 max-w-144.75!">
        <div className="space-y-6 p-6">
          <Progress variant="steps" className="pt-2" value={step} max={2} />
          <DialogHeader>
            <DialogTitle className="text-gray-800 font-bold text-3xl font-inter">
              Change Email
            </DialogTitle>
          </DialogHeader>

          {step === 1 ? (
            <NewEmailStep
              defaultEmail={newEmail}
              onEmailSent={(email) => {
                localStorage.setItem(
                  pendingKey(userId),
                  JSON.stringify({
                    email,
                    expiresAt: Date.now() + PENDING_TTL,
                  }),
                );
                setNewEmail(email);
                setStep(2);
              }}
            />
          ) : (
            <VerifyEmailStep
              email={newEmail}
              cooldownKey={cooldownKey(userId)}
              onEdit={() => {
                clearPending(userId);
                setStep(1);
              }}
              onSuccess={() => {
                clearPending(userId);
                onOpenChange(false);
                setStep(1);
                setNewEmail("");
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}