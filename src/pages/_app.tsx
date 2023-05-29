import '@util/global.css';

import { useState, type ReactElement, type ReactNode } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { MainLayout } from '@layouts/MainLayout';
import { apiFetch } from '@util/util';
import type { NextPage } from 'next';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, user: CombinedUser) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(
  props: AppPropsWithLayout & { colorScheme: ColorScheme; user: CombinedUser }
) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

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
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Notifications />
          <QueryClientProvider client={queryClient}>
          <ModalsProvider>
            {Component.getLayout ? (
              getLayout(<Component {...pageProps} user={props.user} />, props.user)
            ) : (
              <MainLayout user={props.user}>
                <Component {...pageProps} user={props.user} />
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
    user: user?.data,
    colorScheme: getCookie('color-scheme', appContext.ctx) || 'dark',
  };
};
