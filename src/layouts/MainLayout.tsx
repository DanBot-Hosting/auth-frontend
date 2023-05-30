import dynamic from 'next/dynamic';
import { AppShell } from '@mantine/core';
import type { CombinedUser } from '@util/types/common';
import type { ReactNode } from 'react';

const Header = dynamic(() => import('@components/header').then((mod) => mod.Header));

export function MainLayout({ children, user }: { user: CombinedUser; children: ReactNode }) {
  return <AppShell header={<Header user={user} />}>{children}</AppShell>;
}
