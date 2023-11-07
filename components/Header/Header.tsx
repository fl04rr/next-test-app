import styles from './styles.module.scss';
import { Text, Avatar } from '@mantine/core';
import { useSession, signIn, signOut } from 'next-auth/react';
import { IconLogin2, IconLogout } from '@tabler/icons-react';
import BackToHome from '../BackToHome/BackToHome';

interface HeaderProps {
  home: boolean;
}
export default function ({home}: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div>
        <BackToHome home={home} />
      </div>
      {session ? (
        <div className={styles.logedIn}>
          <div className={styles.message}>
            <Text size='sm' c='dimmed'>
              {session.user.name}
            </Text>
            <Avatar src={session.user.image} alt="user's image" />
          </div>
          <IconLogout onClick={() => signOut()} className={styles.hoverable} />
        </div>
      ) : (
        <IconLogin2 onClick={() => signIn()} className={styles.hoverable} />
      )}
    </header>
  );
}