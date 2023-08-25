"use client";
import { useCallback, useRef, useState } from "react";

/**
 * Generates a fake progress percentage using a timer interval and Math.atan.
 *
 * @returns {{ progress: number, start: () => void, stop: () => void }} An object containing the progress value,
 * a start function to initiate the progress, and a stop function to stop the progress.
 */
export function useFakeProgress() {
  let currentProgress = useRef(0);
  let step = useRef(0.5);
  let [progress, setProgress] = useState(0);
  let interval = useRef<number | null>(null);

  /**
   * Starts the progress. Should be initiated in useEffect with stop on unmount.
   * @example
   * useEffect(() => {
   *   start();
   *
   *   return stop;
   *   // eslint-disable-next-line react-hooks/exhaustive-deps
   * }, []);
   * 
   * @returns {void}
   */
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
  }, [progress]);

  /**
   * Stops the progress but won't reset the value.
   * 
   * @returns {void}
   */
  const stop = useCallback(() => {
    clearInterval(interval.current ?? undefined);
  }, []);

  return { progress, start, stop };
}
