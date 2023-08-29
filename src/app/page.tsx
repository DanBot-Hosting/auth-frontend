"use client";
import { Button } from "@/components/Button";
import { Switch } from "@/components/Switch";
import { useModal } from "@/hooks/useModal";
import { useNotification } from "@/hooks/useNotification";
import { useOverlay } from "@/hooks/useOverlay";
import { css } from "@styles/css";

const group = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  justifyContent: "center",
});

export default function Home() {
  const { show: showOverlay, hide: hideOverlay } = useOverlay();
  const { show: showNotification, hide: _hideNotification } = useNotification();
  const { show: showModal, hide: hideModal } = useModal();

  return (
    <div className={group}>
      <Button
        pill
        onClick={() =>
          showOverlay({
            asLoading: true,
            withCancel: true,
            cancelLabel: "Cancel",
            onCancel: () => hideOverlay(),
          })
        }
      >
        Use Loading Overlay
      </Button>
      <Button
        pill
        onClick={() =>
          showOverlay({
            asLoading: false,
            closeOnEscape: true,
            children: <span>Some overlay tests</span>,
          })
        }
      >
        Use Overlay
      </Button>
      <Button
        pill
        onClick={() =>
          showNotification({ children: "This website uses cookies!" })
        }
      >
        Use Notification
      </Button>
      <Button
        pill
        onClick={() =>
          showModal({
            buttons: [
              <div onClick={hideModal} key="cancel">
                Cancel
              </div>,
              <div onClick={hideModal} key="accept">
                Accept
              </div>,
            ],
            closeOnEscape: true,
            label: "Confirm account deletion",
            description: "Enter deletion code sent via Email",
          })
        }
      >
        Use Modal
      </Button>
    </div>
  );
}
