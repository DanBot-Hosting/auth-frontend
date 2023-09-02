"use client";
import { useMesh } from "@/store/useMesh";
import { useEffect } from "react";

/**
 * Renders a Mesh ambient background component as a canvas element.
 * Giving the ability to interact with it via useMesh store.
 * 
 * @returns {JSX.Element} The rendered Mesh component.
 */
export function Mesh() {
  const init = useMesh((state) => state.initializeMesh);
  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas id="mesh" />;
};
