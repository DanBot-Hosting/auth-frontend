"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import { Tooltip } from "@/components/Tooltip";
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

const elements = css({
  display: "flex",
  alignItems: "center",
  p: "1rem",
  flexDir: "column",
  gap: "1rem",
});

export default function Home() {
  const { show: showOverlay, hide: hideOverlay } = useOverlay();
  const { show: showNotification } = useNotification();
  const { show: showModal, hide: hideModal } = useModal();

  return (
    <>
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
      <div className={elements}>
        <Select
          options={[
            { label: "Nuxt", value: "1" },
            { label: "Qwik", value: "2" },
            { label: "Astro", value: "3" },
            { label: "Next.js", value: "4" },
            { label: "Remix", value: "5" },
          ]}
          initial={4}
          placeholder="Pick favorite framework..."
        />
        <Input placeholder="Dummy input..." />
        <Switch>Sell my privacy for $1</Switch>
        <Checkbox>I agree to the terms and conditions</Checkbox>
        <Tooltip label="It won't work :)" position="top">
          <Button>Submit</Button>
        </Tooltip>
      </div>
    </>
  );
}
