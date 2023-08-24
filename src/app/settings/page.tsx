"use client";
import { Avatar } from "@/components/Avatar";
import { css } from "@styles/css";
import { usePasswordChangeModal } from "./PasswordChangeModal";
import { Input } from "@/components/Input";

const main = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.875rem",
  alignSelf: "stretch",
});

const button = css({
  cursor: "pointer",
  alignSelf: "stretch",

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

const fields = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.8125rem",
});

const section = css({
  display: "flex",
  flexDir: "column",
  gap: "0.9375rem",
});

const field = css({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1.875rem",
  width: "100%",
});

const label = css({
  color: "text.90",
  textAlign: "right",
  fontSize: "1.125rem",
  fontWeight: "300",
});

const input = css({
  display: "flex",
  width: "31.25rem",
  minH: "3.125rem",
  gap: "0.9375rem",

  "& input": {
    flex: "1 0 0",
    maxW: "100%",
  },
});

export default function Settings() {
  const { show: showModal } = usePasswordChangeModal();

  return (
    <div className={main}>
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
          </div>
          <div className={field}>
            <label className={label}>Name</label>
            <div className={input}>
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
          </div>
        </div>
        <div className={section} id="private">
          <div className={field}>
            <label className={label}>Email</label>
            <div className={input}>
              <Input placeholder="" />
            </div>
          </div>
          <div className={field}>
            <label className={label}>Password</label>
            <div className={input}>
              <button className={button} onClick={() => showModal()}>Change your password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
