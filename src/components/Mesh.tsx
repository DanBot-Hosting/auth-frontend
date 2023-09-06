"use client";
import { useSettings } from "@/hooks/useSettings";
import { useMesh } from "@/store/useMesh";
import { useEffect } from "react";

/**
 * Renders a Mesh ambient background component as a canvas element.
 * Giving the ability to interact with it via useMesh store wrapped in useSettings.
 *
 * @returns {JSX.Element} The rendered Mesh component.
 */
export function Mesh() {
  const { initializeMesh } = useMesh();
  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    // Do not use useSettings' init as it only redraws and does not initialize whole gradient
    initializeMesh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas id="mesh" />;
}
