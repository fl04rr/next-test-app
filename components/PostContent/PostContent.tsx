import { Text, Skeleton } from '@mantine/core';
import Image from 'next/image';
import styles from './styles.module.scss';

interface Props {
  heading: string;
  description: string;
  content: string;
  image: string;
}

export default function PostContent({
  heading,
  description,
  content,
  image,
}: Props) {
  return (
    <>
      <Image
        src={image}
        alt={heading}
        width={1920}
        height={500}
        className={styles.headingImage}
      />
      <section className={styles.headingBlock}>
        <h1 className={styles.heading}>
          {heading ? heading : <Skeleton height={20} width={300} radius='xl' />}
        </h1>
        {description ? (
          <Text size='xl' c='dimmed' className={styles.description}>
            {description}
          </Text>
        ) : (
          <>
            <Skeleton height={10} width={220} radius='xl' />
            <Skeleton
              height={10}
              width={220}
              radius='xl'
              style={{ marginTop: '5px' }}
            />
          </>
        )}
      </section>
      <section className={styles.content}>
        {content ? (
          <Text>{content}</Text>
        ) : (
          <Skeleton height={500} radius='sm'></Skeleton>
        )}
      </section>
    </>
  );
}
