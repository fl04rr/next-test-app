import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '../../styles/util.module.scss';
import styles from '../layout.module.scss';
import { Text } from '@mantine/core';


interface HeaderProps{
    home: string,
    name: string,
}
export default function({home, name}: HeaderProps){

    return(
        <>
        <header className={styles.header} >
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={`.authorImage ${utilStyles.borderCircle}`}
                            height={144}
                            width={144}
                            alt="author's image"
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        <Text c="dimmed" className={styles.textCenter}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore consequuntur quae autem soluta veniam illum aliquid laboriosam maxime. Asperiores libero dolores error velit voluptas modi, ipsum nisi soluta esse accusantium!</Text>
                    </>
                ) : (
                    <> 
                        <Link href="/">
                            <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={108}
                            width={108}
                            alt=""
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInherit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>
        </>
    );
}