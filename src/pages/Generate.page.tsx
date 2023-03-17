import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, TextInput, Image, Button, Flex, Alert, ActionIcon } from '@mantine/core';
import { IconAlertCircle, IconArrowsShuffle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { randomPrompts } from '../randomPrompts';

export function Generate() {
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const form = useForm({ initialValues: { name: '', prompt: '', photo: '' } });

  const generateImage = async () => {
    if (form.values.prompt) {
      setGenerating(true);
      try {
        const response = await fetch('https://aimage.herokuapp.com/api/v1/dalle', {
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
        setGenerating(false);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.values.name && form.values.prompt && form.values.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://aimage.herokuapp.com/api/v1/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.values),
        });
        if (response.ok) {
          navigate('/');
        }
      } catch (error: any) {
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
          {error}
        </Alert>;
      } finally {
        setLoading(false);
      }
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  };

  return (
    <div>
      <Flex mt={20} direction="column">
        <Title fw={2000} size="48px" order={1} align="left" color="white">
          <Text span color="teal.3">
            Generate
          </Text>{' '}
          an image
        </Title>
        <Text align="left">Share it with the community after!</Text>

        <form style={{ marginTop: '40px' }} onSubmit={handleSubmit}>
          <TextInput
            maw={900}
            size="md"
            placeholder="Jane Doe"
            label="Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            maw={900}
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
          {alert && (
            <Alert
              maw={500}
              mah={100}
              icon={<IconAlertCircle size="1rem" />}
              title="Bummer!"
              color="red"
              variant="filled"
            >
              Please fill out form fields
            </Alert>
          )}
          <Button
            mt={40}
            w={150}
            color="teal.4"
            onClick={generateImage}
            loading={generating}
            mb={20}
          >
            Generate
          </Button>
          {form.values.photo ? (
            <div>
              <Image width="280px" src={form.values.photo} />
            </div>
          ) : (
            <div style={{ border: '1px solid black', width: '280px' }}>
              <Image
                width="280px"
                src="https://raw.githubusercontent.com/allwinp/AImage-client/master/src/preview.png"
              />
            </div>
          )}
          <Button type="submit" mt={20} w={350} color="violet.4" loading={loading} mb={20}>
            Add to Community Collection
          </Button>
        </form>
      </Flex>
    </div>
  );
}
