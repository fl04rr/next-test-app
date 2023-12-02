import styles from './styles.module.scss';
import { Text, Avatar, ActionIcon, Group } from '@mantine/core';
import { useSession, signIn, signOut } from 'next-auth/react';
import { IconLogin2, IconLogout } from '@tabler/icons-react';
import BackToHome from '../BackToHome/BackToHome';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { Provider } from 'mobx-react';
import { useRouter } from 'next/router';

interface HeaderProps {
  home: boolean;
}
export default function ({home}: HeaderProps) {
  const { data: session } = useSession();
  const { asPath } = useRouter()

  return (
    <header className={styles.header}>
      <div>
        <Group>
          <BackToHome home={home} />
          <ThemeToggler />
        </Group>
      </div>
      {session ? (
        <div className={styles.logedIn}>
          <div className={styles.message}>
            <Text size='sm' c='dimmed' className={styles.userName}>
              {session.user.name}
            </Text>
            <Avatar src={session.user.image} alt="user's image" />
          </div>
          <ActionIcon          
            variant="default"
            size="lg"
            aria-label="Sign out"
            onClick={() => signOut()}
          >
              <IconLogout className={styles.hoverable} />
          </ActionIcon>
        </div>
      ) : (
        <ActionIcon          
          variant="default"
          size="lg"
          aria-label="Sign In"
          onClick={() => signIn(asPath)}
        >
          <IconLogin2 className={styles.hoverable} />
        </ActionIcon>
      )}
    </header>
  );
}