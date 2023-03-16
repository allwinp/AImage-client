import { Container, SimpleGrid } from '@mantine/core';

import { ImageCard } from './ImageCard.component';

interface LeadGridProps {
  data: [] | null;
}

export function LeadGrid({ data }: LeadGridProps) {
  interface ImageCardProps {
    _id: string;
    name: string;
    prompt: string;
    photo: string;
  }
  return (
    <Container my="md">
      <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {data?.map(({ _id, name, prompt, photo }: ImageCardProps) => (
          <ImageCard _id={_id} name={name} prompt={prompt} photo={photo} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
