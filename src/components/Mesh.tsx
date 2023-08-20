"use client";
import { useEffect } from "react";
import { Gradient } from "@/utils/mesh";
import { mesh } from "@styles/recipes";

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

  return <canvas className={selector} />;
}
