import { useEffect, useRef, useState } from "react";

export function useFakeProgress() {
  let currentProgress = useRef(0);
  let step = useRef(0.5);
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      currentProgress.current += step.current;
    setProgress(() =>
      Math.round((Math.atan(currentProgress.current) / (Math.PI / 2)) * 100 * 1000) /
        1000
    );

    if (progress >= 100) {
      clearInterval(timer);
    } else if (progress >= 70) {
      step.current = 0.1;
    }
    }, 100);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return progress;
}
