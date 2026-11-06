"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(totalSeconds: number, onExpire?: () => void) {
  const [remaining, setRemaining] = useState(totalSeconds);
    const [runId, setRunId] = useState(0);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setRemaining(totalSeconds);
    const endAt = Date.now() + totalSeconds * 1000;

    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRemaining(left);

      if (left === 0) {
        clearInterval(id);
        onExpireRef.current?.();
      }
    }, 500);

    return () => clearInterval(id);
  }, [totalSeconds,runId]);

    const reset = useCallback(() => setRunId((n) => n + 1), []);

  return { remaining, reset };
}