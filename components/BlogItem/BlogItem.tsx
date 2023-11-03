import styles from './styles.module.scss';
import { Text, Divider } from '@mantine/core';

interface Props {
  heading: string;
  description: string;
  slug: string;
}

export default function BlogItem({ heading, description, slug }: Props) {
  return (
    <section className={styles.listItem}>
      <Text size='lg' fw={700}>
        {heading}
      </Text>
      <Text c='dimmed'>{description}</Text>
      {/* <Text c="dimmed">{slug}</Text> */}
    </section>
  );
}
