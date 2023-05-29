import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/router'
import { AppShell } from '@mantine/core';
import { Header } from '@components/header';
import { Navbar } from '@components/navbar';

export function DashboardLayout({ children, user }: { user: CombinedUser, children: ReactNode }) {
  const { push } = useRouter();

  useEffect(() => {
    if (!user ?? !user?.dbUser) push('/');
  })
  
  return <AppShell header={<Header user={user} />} navbar={<Navbar user={user} />}>{children}</AppShell>;
}
