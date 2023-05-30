import '@util/global.css';

import { useState, type ReactElement, type ReactNode } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { useMediaQuery } from '@mantine/hooks';
import { getCookie, setCookie } from 'cookies-next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { MainLayout } from '@layouts/MainLayout';
import { apiFetch } from '@util/util';
import { cache } from '@util/emotionCache';
import type { NextPage } from 'next';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, user: CombinedUser, isMobile: boolean) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(
  props: AppPropsWithLayout & { colorScheme: ColorScheme; user: CombinedUser }
) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>DanBot Hosting</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Authentication server for DanBot Hosting" />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme }}
          emotionCache={cache}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          <QueryClientProvider client={queryClient}>
            <ModalsProvider>
              {Component.getLayout ? (
                getLayout(
                  <Component {...pageProps} user={props.user} isMobile={isMobile} />,
                  props.user,
                  isMobile
                )
              ) : (
                <MainLayout user={props.user}>
                  <Component {...pageProps} user={props.user} isMobile={isMobile} />
                </MainLayout>
              )}
            </ModalsProvider>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const token = getCookie('idToken', appContext.ctx);

  const user = await apiFetch<APIFetchUserResponse>('/users/@me', {
    idToken: typeof token === "boolean" ? null : token,
  }).catch(() => null);

  delete user?.data?.dbUser?.passwordHash;

  return {
    ...appProps,
    user: user?.data ?? null,
    colorScheme: getCookie('color-scheme', appContext.ctx) || 'dark',
  };
};
