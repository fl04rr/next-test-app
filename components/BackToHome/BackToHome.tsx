import Link from 'next/link';
import styles from './styles.module.scss';

interface IsHomeProps{
    home: boolean
}

export default function BackToHome({home}: IsHomeProps){
    return(
        <>
        {!home && (
            <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
            </div>
        )}
        </>
    );
}