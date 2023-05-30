import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { useEffect, type ReactNode } from 'react';

const Header = dynamic(() => import('@components/header').then((mod) => mod.Header));
const Navbar = dynamic(() => import('@components/navbar').then((mod) => mod.Navbar));

export function DashboardLayout({
  children,
  user,
  isMobile,
}: {
  user: CombinedUser;
  children: ReactNode;
  isMobile: boolean;
}) {
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push('/');
    return;
  }, [user]);

  return isMobile ? (
    <AppShell header={<Header user={user} />}>{children}</AppShell>
  ) : (
    <AppShell header={<Header user={user} />} navbar={<Navbar user={user} />}>
      {children}
    </AppShell>
  );
}
