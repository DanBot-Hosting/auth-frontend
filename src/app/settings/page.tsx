"use client";
import { Avatar } from "@/components/Avatar";
import { css, cx } from "@styles/css";
import { useAccountDeletionModal } from "./AccountDeletionModal";
import { usePasswordChangeModal } from "./PasswordChangeModal";
import { Input } from "@/components/Input";

const main = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  maxW: "37.5rem",
  w: "100%",
});

const button = css({
  cursor: "pointer",

  fontWeight: "400",
  fontSize: "1rem",
  color: "text.90",
  textDecoration: "underline",
  textDecorationColor: "text.30",
  textUnderlineOffset: "0.1875rem",
  textDecorationThickness: "0.078125rem",
  transition: "all 0.2s ease-in-out",

  _hover: {
    textDecorationColor: "text.100",
    textDecorationThickness: "0.09375rem",
    transition: "all 0.2s ease-in-out",
  },
});

const red = css({
  color: "hsl(0, 57.4%, 51.2%)!",
  textDecorationColor: "hsla(0, 57.4%, 51.2%, 0.6)!",

  _hover: {
    color: "hsl(0, 57.4%, 51.2%)!",
    textDecorationColor: "hsl(0, 57.4%, 51.2%)!",
  },
});

const fields = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3.75rem",
  w: "100%",
});

const section = css({
  display: "flex",
  flexDir: "column",
  gap: "1.875rem",
  w: "100%",
});

const field = css({
  display: "flex",
  flexDir: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  gap: "0.625rem",
  width: "100%",
});

const dangerousField = css({
  justifyContent: "space-between!",
  flexDir: "row!",
});

const label = css({
  color: "text.90",
  textAlign: "right",
  fontSize: "1rem",
  fontWeight: "600",
  userSelect: "none",
  lineHeight: "1.75",
});

const input = css({
  display: "flex",
  w: "100%",
  maxW: "37.5rem",
  minH: "3.125rem",
  gap: "0.9375rem",

  "@media screen and (max-width: 500px)": {
    "& > input": {
      padding: "0.625rem 1.25rem",
    },
  },

  "& input": {
    flex: "1 0 0",
    maxW: "100%",
  },
});

const description = css({
  color: "text.60",
  fontSize: "0.9375rem",
  fontWeight: "400",
});

export default function Settings() {
  const { show: showPasswordChangeModal } = usePasswordChangeModal();
  const { show: showAccountDeletionModal } = useAccountDeletionModal();

  return (
    <>
      <Avatar
        size={120}
        src="https://avatars.githubusercontent.com/u/69919939"
        alt="domin"
        configurable
      />
      <div className={fields}>
        <div className={section} id="public">
          <div className={field}>
            <label className={label}>Username</label>
            <div className={input}>
              <Input placeholder="" />
            </div>
            <span className={description}>Your publicly visible username</span>
          </div>
          <div className={field}>
            <label className={label}>Name</label>
            <div className={input}>
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <span className={description}>
              You will be addressed by the name you set
            </span>
          </div>
        </div>
        <div className={section} id="private">
          <div className={field}>
            <label className={label}>Email</label>
            <div className={input}>
              <Input placeholder="jane@example.com" />
            </div>
          </div>
          <div className={cx(dangerousField, field)}>
            <button
              className={button}
              onClick={() => showPasswordChangeModal()}
            >
              Change your password
            </button>
            <button
              className={cx(button, red)}
              onClick={() => showAccountDeletionModal()}
            >
              Delete the account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
