import { createStyles, Header, Container, Button, Image, Flex, rem, Title } from '@mantine/core';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles(() => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export function HeaderAction() {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Flex gap="sm" align="center">
          <Image height={60} fit="contain" src="src/logo.png" alt="" />
          <Title fw={5000}>AIwin</Title>
        </Flex>
        <Button color="violet" radius="xl" h={30}>
          Get early access
        </Button>
      </Container>
    </Header>
  );
}
