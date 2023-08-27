"use client"; // Error components must be Client Components
import { Button } from "@/components/Button";
import { css } from "@styles/css";
import { useEffect } from "react";

const main = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.875rem",
  flexGrow: "1",
});

const status = css({
  fontSize: "1.5rem",
  lineHeight: "100%",
  fontWeight: "500",
  color: "text.80",
});

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <div className={main}>
      <h1 className={status}>Something went wrong!</h1>
      <Button onClick={() => reset()} secondary pill>
        Try Again
      </Button>
    </div>
  );
}
