"use client";
import { useNotification } from "@/hooks/useNotification";
import { useOverlay } from "@/hooks/useOverlay";
import { css } from "@styles/css";

const button = css({
  cursor: "pointer",
  color: "text.60",
  transition: "color .3s ease-in-out",

  _hover: {
    color: "text.90",
    transition: "color .3s ease-in-out",
  },
});

export default function Home() {
  const { show: showLoadingOverlay, hide: hideLoadingOverlay } = useOverlay({
    asLoading: true,
    withCancel: true,
    cancelLabel: "Cancel",
    onCancel: () => hideLoadingOverlay(),
  });

  const { show: showOverlay, hide: hideOverlay } = useOverlay({
    asLoading: false,
    children: <span onClick={() => hideOverlay()}>Some overlay tests</span>,
  });

  const { show: showNotification, hide: hideNotification } = useNotification();

  return (
    <>
      <p>
        <button className={button} onClick={showLoadingOverlay}>
          Use Loading Overlay
        </button>
      </p>
      <p>
        <button className={button} onClick={showOverlay}>
          Use Overlay
        </button>
      </p>
      <p>
        <button
          className={button}
          onClick={() =>
            showNotification({ children: "This website uses cookies!" })
          }
        >
          Use Notification
        </button>
      </p>
    </>
  );
}
