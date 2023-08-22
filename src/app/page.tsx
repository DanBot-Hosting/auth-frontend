"use client";
import { Overlay } from "@/components/Overlay";
import { useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState<boolean>(false);
  
  return (
    <>
      Test
      <button onClick={() => setVisible(!visible)}>toggle</button>
      <Overlay visible={visible}>
        <button onClick={() => setVisible(!visible)}>toggle</button>
      </Overlay>
    </>
  );
}
