"use client";
import { useCallback, useRef, useState } from "react";

/**
 * Generates a fake progress percentage using a timer interval and Math.atan.
 *
 * @param {number} [customStep=0.5] - The custom step value. Stays for speedup purposes. Defaults to 0.5.
 * @param {number} [slowdownOnProgress=70] - The slowdown on progress value. Percentage when to slow down the progress. Defaults to 70.
 * @returns {UseFakeProgress} An object containing the progress value,
 * a start function to initiate the progress, and a stop function to stop the progress.
 */
export function useFakeProgress(customStep: number = 0.5, slowdownOnProgress: number = 70): UseFakeProgress {
  const currentProgress = useRef(0);
  const step = useRef(customStep);
  const [progress, setProgress] = useState(0);
  const interval = useRef<number | null>(null);

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
      } else if (progress >= slowdownOnProgress) {
        step.current /= 5;
      }
    }, 100);
  }, [progress, slowdownOnProgress]);

  /**
   * Stops the progress but won't reset the value.
   * 
   * @returns {void}
   */
  const stop = useCallback(() => {
    clearInterval(interval.current ?? undefined);
  }, []);

  /**
   * Sets the progress value.
   * 
   * @param {number} value - The new progress value
   * @returns {void}
   */
  const set = useCallback((value: number) => {
    currentProgress.current = value;
    setProgress(value);
  }, []);

  return { progress, start, stop, set };
}
