import useForm from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Stack
} from "@chakra-ui/core";

export default function CreateSessionForm() {
  const { handleSubmit, errors, register, formState } = useForm();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Session Name is required";
      return error;
    }

    let activeSessionNames = []; // TODO: Fetch from database store
    // check and make sure the session name is not an active session name
    for (let activeSess of activeSessionNames) {
      if (value === activeSess) {
        error = `'${value}' Session Name is already in use`;
      }
    }

    return error || true;
  }

  function onSubmit(values) {
    console.log("mockint session created");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} width={300}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Session Name</FormLabel>
          <Input
            name="name"
            placeholder="Summer Internship Interview"
            ref={register({ validate: validateName })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="language">Programming Language</FormLabel>
          <Select placeholder="Select language">
            <option value="javascript">Javascript</option>
            <option value="python3">Python 3</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="duration">Session Duration</FormLabel>
          <Select placeholder="30 minutes">
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
            <option value="75">75 minutes</option>
          </Select>
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
