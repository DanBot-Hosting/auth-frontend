"use client";
import { useSettings } from "@/hooks/useSettings";
import { useEffect } from "react";

/**
 * Renders a Mesh ambient background component as a canvas element.
 * Giving the ability to interact with it via useMesh store wrapped in useSettings.
 * 
 * @returns {JSX.Element} The rendered Mesh component.
 */
export function Mesh() {
  const { init } = useSettings();
  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    init("background-enabled");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas id="mesh" />;
};
