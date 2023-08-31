"use client";
import { useMesh } from "@/store/useMesh";
import { memo, useEffect } from "react";

/**
 * Renders a Mesh ambient background component as a canvas element.
 * Giving the ability to interact with it via useMesh store.
 * Memoizing component to prevent unwanted rerenders by parent.
 * 
 * @see {@link https://react.dev/reference/react/memo memo}
 * @returns {JSX.Element} The rendered Mesh component.
 */
export const Mesh = memo(function Mesh() {
  const mesh = useMesh();
  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    mesh.initializeMesh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas className={mesh.className} />;
});
