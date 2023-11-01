import styles from './styles.module.scss';
import { Text, Divider } from '@mantine/core';

interface Props{
    heading: string;
    description: string;
}

export default function BlogItem({heading, description}: Props){
    return(
        <section className={styles.listItem}>
            <Text size="lg" fw={700}>{heading}</Text>
            <Text c="dimmed">{description}</Text>
        </section>
    )
}