"use client";
import { useMesh } from "@/store/useMesh";
import { useEffect } from "react";

interface MeshProps {
  onLoad?: () => void;
}

export function Mesh({ onLoad }: MeshProps) {
  const mesh = useMesh(onLoad ?? (() => {}));
  // On component mount
  // Because module requires querySelector call to get colors
  useEffect(() => {
    mesh.initializeMesh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas className={mesh.className} />;
}
