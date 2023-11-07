import { signIn } from 'next-auth/react';
import styles from './styles.module.scss';
import { Text, Group } from '@mantine/core';
import { IconLogin2, IconArrowBackUp } from '@tabler/icons-react';
import Link from 'next/link';

export default function SignInBanner() {
  return (
    <div className={styles.overlay}>
      <section className={styles.wrapper}>
        <Text fw={700} size='xl' className={styles.text}>
          You are not Signed In
        </Text>
        <Text c='dimmed'>please, Sign In</Text>
        <Group gap='xs'>
          <Link href='/' className={styles.button}>
            Go back <IconArrowBackUp />
          </Link>
          <button className={styles.button} onClick={() => signIn()}>
            Sign In <IconLogin2 />
          </button>
        </Group>
      </section>
    </div>
  );
}
