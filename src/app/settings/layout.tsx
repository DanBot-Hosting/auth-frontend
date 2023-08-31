import { SegmentedControl } from "@/components/SegmentedControl";
import { css } from "@styles/css";

const centered = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  gap: "3.4375rem",
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={centered}>
      <SegmentedControl
        options={[
          { label: "Account", value: "/settings" },
          { label: "Payments", value: "/settings/payments" },
          { label: "Interface", value: "/settings/interface" },
        ]}
      />
      {children}
    </div>
  );
}
