import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/router'
import { AppShell } from '@mantine/core';
import { Header } from '@components/header';
import { Navbar } from '@components/navbar';
import type { CombinedUser } from '@util/types/common';

export function DashboardLayout({ children, user }: { user: CombinedUser, children: ReactNode }) {
  const { push } = useRouter();

  useEffect(() => {
    if (!user ?? !user?.dbUser) push('/');
  })
  
  return <AppShell header={<Header user={user} />} navbar={<Navbar user={user} />}>{children}</AppShell>;
}
