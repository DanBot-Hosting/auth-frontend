"use client";
import { useOverlay } from "@/hooks/useOverlay";

export default function Home() {
  const { show, hide } = useOverlay({
    asLoading: true,
    withCancel: true,
    cancelLabel: "Cancel",
    onCancel: () => {
      hide();
    },
  })
  
  return (
    <>
      Test
      <button onClick={show}>toggle</button>
    </>
  );
}
