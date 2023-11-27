import { Text, Skeleton, ActionIcon, Group } from '@mantine/core';
import Image from 'next/image';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import { IconHeart, IconHeartFilled} from '@tabler/icons-react';
import likeStore from '../../lib/likeStore';

interface Props {
  heading: string;
  description: string;
  content: string;
  image: string;
  slug: string;
  id: string;
}

export function PostContent({
  heading,
  description,
  content,
  image,
  slug,
  id
}: Props) {

  const handleLike = () => {
    likeStore.handleLike(id);
  };

  return (
    <>
      <Image
        priority
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
          <>
          <Text size='xl' c='dimmed' className={styles.description}>
            {description}
          </Text>
          <Group>
            <ActionIcon
              className={styles.likeIcon}        
              variant="default"
              size="lg"
              aria-label="Like"
              onClick={handleLike} >
               {likeStore.getIsLiked(id) ?  <IconHeartFilled /> : <IconHeart />}
            </ActionIcon>
            <Text size='xl' c='dimmed' >{likeStore.getLikes(id)}</Text>
        </Group>
        </>
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
          <Text dangerouslySetInnerHTML={{__html: content}} />
        ) : (
          <Skeleton height={500} radius='sm'></Skeleton>
        )}
      </section>
    </>
  );
}

export default observer(PostContent);