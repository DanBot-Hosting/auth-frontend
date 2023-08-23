"use client";
import { useModal } from "@/hooks/useModal";
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
  const { show: showLoadingOverlay, hide: hideLoadingOverlay } = useOverlay();
  const { show: showOverlay, hide: hideOverlay } = useOverlay();
  const { show: showNotification, hide: _hideNotification } = useNotification();
  const { show: showModal, hide: hideModal } = useModal();

  return (
    <>
      <p>
        <button
          className={button}
          onClick={() =>
            showLoadingOverlay({
              asLoading: true,
              withCancel: true,
              cancelLabel: "Cancel",
              onCancel: () => hideLoadingOverlay(),
            })
          }
        >
          Use Loading Overlay
        </button>
      </p>
      <p>
        <button
          className={button}
          onClick={() =>
            showOverlay({
              asLoading: false,
              children: (
                <span onClick={() => hideOverlay()}>Some overlay tests</span>
              ),
            })
          }
        >
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
      <p>
        <button
          className={button}
          onClick={() =>
            showModal({
              buttons: [(<div onClick={hideModal} key="cancel">Cancel</div>), (<div onClick={hideModal} key="accept">Accept</div>)],
              label: "Confirm account deletion",
              description: "Enter deletion code sent via Email",
            })
          }
        >
          Use Modal
        </button>
      </p>
    </>
  );
}
