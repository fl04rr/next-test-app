import Head from 'next/head';
import styles from './layout.module.scss';
import Link from 'next/link';
import { MantineProvider, createTheme, Button} from '@mantine/core';
import { ColorSchemeScript } from '@mantine/core';
import Header from './Header/Header';
import BackToHome from './BackToHome/BackToHome';

const name = "Vlad";
export const siteTitle = 'Next.js Blog'

export default function Layout({children, home}){

    return (
        <MantineProvider>
            <div className={styles.container}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Learn how to build a personal website using Next.js"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.vercel.app/${encodeURI(
                            siteTitle,
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <ColorSchemeScript />
                </Head>
                <Header home={home} name={name}/>
                <main>{children}</main>
                <BackToHome home={home}/>
            </div>
        </MantineProvider>
    );
}