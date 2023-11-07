import Link from 'next/link';
import styles from './styles.module.scss';

interface IsHomeProps {
  home: boolean;
}

export default function BackToHome({ home }: IsHomeProps) {
  return (
    <>
      {!home && (
        <Link href='/' className={styles.btn}>
          ← Back to home
        </Link>
      )}
    </>
  );
}
