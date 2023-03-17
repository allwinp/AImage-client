import { useState } from 'react';
import { Title, Text, TextInput, Image, Button, Flex, Alert, ActionIcon } from '@mantine/core';
import { IconAlertCircle, IconArrowsShuffle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { randomPrompts } from '../randomPrompts';
import { HeaderAction } from '../components/HeaderAction.component';

export function Generate() {
  const [loading, setLoading] = useState(false);
  const form = useForm({ initialValues: { name: '', prompt: '', photo: '' } });
  const generateImage = async () => {
    if (form.values.prompt) {
      setLoading(true);
      try {
        const response = await fetch('https://dalle.allweezy.repl.co/api/v1/dalle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: form.values.prompt }),
        });

        const data = await response.json();
        form.setValues({ photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error: any) {
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
          {error}
        </Alert>;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <HeaderAction />
      <Flex mt={50} direction="column">
        <Title fw={2000} size="48px" order={1} align="left" color="white">
          <Text span color="violet.3">
            Generate
          </Text>{' '}
          an image
        </Title>
        <Text align="left">Share it with the community after!</Text>

        <form style={{ marginTop: '40px', marginBottom: '50px' }}>
          <TextInput
            size="md"
            placeholder="Jane Doe"
            label="Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            mt={20}
            size="md"
            placeholder="an oil painting by Matisse of a humanoid robot playing chess"
            label="Prompt"
            {...form.getInputProps('prompt')}
          />
          <ActionIcon
            color="violet.3"
            onClick={() => {
              form.setValues({
                prompt: randomPrompts[Math.floor(Math.random() * randomPrompts.length)],
              });
            }}
          >
            <IconArrowsShuffle />
          </ActionIcon>
        </form>
        {form.values.photo ? (
          <Image width="280px" src={form.values.photo} />
        ) : (
          <Image width="280px" src="src/preview.png" />
        )}
        <Button w={100} color="violet.4" onClick={generateImage} loading={loading} mt={20} mb={20}>
          Generate
        </Button>
      </Flex>
    </div>
  );
}
