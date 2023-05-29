import { AppShell } from '@mantine/core';
import { Header } from '@components/header';
import type { ReactNode } from 'react';

export function MainLayout({ children, user }: { user: CombinedUser, children: ReactNode }) {
  return <AppShell header={<Header user={user} />}>{children}</AppShell>;
}
