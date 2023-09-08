"use client";
import { useMesh } from "@/store/useMesh";
import { css } from "@styles/css";
import { useEffect } from "react";

/**
 * Renders a Mesh ambient background component as a canvas element.
 * Giving the ability to interact with it via useMesh store wrapped in useSettings.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @returns {JSX.Element} The rendered Mesh component.
 */
export function Mesh({ css: cssProp = {} }: MeshProps) {
  const canvas = css(cssProp);
  const { initialize } = useMesh();
  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    // Do not use useSettings' init as it only redraws and does not initialize whole gradient
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas className={canvas} id="mesh" />;
}
