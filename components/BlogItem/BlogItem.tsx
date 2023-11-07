import { Card, Text, Group, Button } from '@mantine/core';
import Image from 'next/image';

interface Props {
  heading: string;
  description: string;
  image: string;
  slug: string;
}

export default function BlogItem({ heading, description, slug, image }: Props) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image priority src={image} width={376} height={200} alt={heading} />
      </Card.Section>
      <Group>
        <Text fw={500}>{heading}</Text>
      </Group>
      <Text size='sm' c='dimmed'>
        {description}
      </Text>
    </Card>
  );
}
