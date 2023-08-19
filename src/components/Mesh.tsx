"use client";
import { useEffect } from "react";
import { Gradient } from "@/utils/mesh";
import { css, cx } from "@styles/css";
import { mesh } from "@styles/recipes";

const overlay = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "1",
});

export function Mesh() {
  const selector = mesh();

  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    const gradient = new Gradient();
    
    // Basically @ts-ignore but in a better way
    // since the module has no defined initGradient method
    (gradient as any).initGradient(`.${selector.slice(1)}`);
  });

  return <canvas className={cx(selector, overlay)} />;
}
