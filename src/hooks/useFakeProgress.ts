"use client";
import { useCallback, useRef, useState } from "react";

export function useFakeProgress() {
  let currentProgress = useRef(0);
  let step = useRef(0.5);
  let [progress, setProgress] = useState(0);
  let interval = useRef<number | null>(null);

  const start = useCallback(() => {
    // window.setInverval instead of setInterval to use web API types instead of nodejs
    interval.current = window.setInterval(() => {
      currentProgress.current += step.current;
      setProgress(
        () =>
          Math.round(
            (Math.atan(currentProgress.current) / (Math.PI / 2)) * 100 * 1000
          ) / 1000
      );

      if (progress >= 100) {
        clearInterval(interval.current ?? undefined);
      } else if (progress >= 70) {
        step.current = 0.1;
      }
    }, 100);
  }, [currentProgress, step, setProgress, progress, interval]);

  const stop = useCallback(() => {
    clearInterval(interval.current ?? undefined);
  }, [interval])

  return { progress, start, stop };
}
