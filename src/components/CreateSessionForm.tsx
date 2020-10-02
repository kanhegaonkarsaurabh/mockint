import useForm from 'react-hook-form';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Stack,
} from '@chakra-ui/core';
import { createSessionInDb } from '../data/firebase';
import { SessionData } from './MockIntSession/MockIntSessionTypes';

type CreateSessionInputs = {
  sessionName: string;
  sessionLanguage: string;
  sessionTime: number;
};

export default function CreateSessionForm() {
  const { handleSubmit, errors, register, formState } = useForm<
    CreateSessionInputs
  >();

  function validateName(sessionName: string) {
    let error;
    if (!sessionName) {
      error = 'Session Name is required';
      return error;
    }

    let activeSessionNames: string[] = ['saurabh']; // TODO: Fetch from database store
    // check and make sure the session name is not an active session name
    for (let activeSess of activeSessionNames) {
      if (sessionName === activeSess) {
        error = `'${sessionName}' name is already in use`;
      }
    }

    return error || true;
  }

  function validateLanguage(lang: string) {
    let error;
    if (!lang) {
      error = 'Session Language is required';
      return error;
    }

    return error || true;
  }

  function validateDuration(duration: string) {
    let error;
    if (!duration) {
      error = 'Session Duration is required';
      return error;
    }

    return error || true;
  }

  async function onSubmit(data: any) {
    try {
      const sessionCreated = await createSessionInDb({
        ...data,
        sessionQuestion: null,
        sessionWhiteboardBase: null,
      } as SessionData);
      console.log(sessionCreated);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data: any) =>
        onSubmit(data),
      )}
    >
      <Stack spacing={3} width={300}>
        <FormControl isInvalid={errors.sessionName ? true : false}>
          <FormLabel htmlFor="name">Unique Session Name</FormLabel>
          <Input
            name="sessionName"
            placeholder="Summer Internship Interview"
            ref={register({ validate: validateName })}
          />
          <FormErrorMessage>
            {errors.sessionName && errors.sessionName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.sessionLanguage ? true : false}
        >
          <FormLabel htmlFor="language">
            Programming Language
          </FormLabel>
          <Select
            name="sessionLanguage"
            placeholder="Select language"
            ref={register({ validate: validateLanguage })}
          >
            <option value="javascript">Javascript</option>
            <option value="python3">Python 3</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
          </Select>
          <FormErrorMessage>
            {errors.sessionLanguage && errors.sessionLanguage.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.sessionTime ? true : false}
        >
          <FormLabel htmlFor="duration">Session Duration</FormLabel>
          <Select
            name="sessionTime"
            placeholder="Select Duration"
            ref={register({ validate: validateLanguage })}
          >
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={75}>75 minutes</option>
          </Select>
          <FormErrorMessage>
            {errors.sessionTime && errors.sessionTime.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          rightIcon="chevron-right"
          isLoading={formState.isSubmitting}
          type="submit"
          mt={4}
        >
          Create Mockint session
        </Button>
      </Stack>
    </form>
  );
}
