import {
  ActionIcon,
  AspectRatio,
  Card,
  Text,
  Group,
  createStyles,
  getStylesRef,
  rem,
} from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useHover } from '@mantine/hooks';
// @ts-ignore
import FileSaver from 'file-saver';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    height: rem(280),

    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    [`&:hover .${getStylesRef('image')} `]: {
      transform: 'scale(1.03)',
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
  },

  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 1,
  },

  prompt: {
    color: theme.white,
    marginBottom: rem(5),
  },

  name: {
    color: theme.colors.dark[2],
  },
}));

interface ImageCardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

async function downloadImage(_id: string, photo: string) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export function ImageCard({ _id, name, prompt, photo }: ImageCardProps) {
  const { classes } = useStyles();

  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div ref={ref}>
      <AspectRatio ratio={1 / 1}>
        <Card p="lg" shadow="lg" className={classes.card} radius="md" component="a" target="_blank">
          <div className={classes.image} style={{ backgroundImage: `url(${photo})` }} />
          {hovered ? (
            <>
              <div className={classes.overlay} />

              <div className={classes.content}>
                <div>
                  <Text size="lg" className={classes.prompt} weight={500}>
                    {prompt}
                  </Text>

                  <Group position="apart" spacing="xs">
                    <Text size="sm" className={classes.name}>
                      {name}
                    </Text>
                    <ActionIcon
                      onClick={() => {
                        downloadImage(_id, photo);
                      }}
                    >
                      <IconDownload size="1.125rem" />
                    </ActionIcon>
                  </Group>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </Card>
      </AspectRatio>
    </div>
  );
}
