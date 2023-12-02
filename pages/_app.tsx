import '../styles/global.scss';
import '@mantine/core/styles.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  return  (
    <MantineProvider defaultColorScheme="dark">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
    );
}
