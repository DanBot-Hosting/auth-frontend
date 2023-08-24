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
        links={[
          { label: "Account", link: "/settings" },
          { label: "Payments", link: "/settings/payments" },
          { label: "Interface", link: "/settings/interface" },
        ]}
      />
      {children}
    </div>
  );
}
