import { Text } from '@mantine/core';
import styles from './styles.module.scss';

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <Text size="xs"fs="sm">Made with ❤️ by Vladislav Datsuk</Text>
        </footer>
    )
}