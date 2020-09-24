import * as React from 'react';
import { Flex, FormLabel, Switch } from '@chakra-ui/core';

export interface IAppProps {}

export default function MockIntSessionSettings(props: IAppProps) {
  return (
    <Flex justify="center" align="center">
      <FormLabel htmlFor="email-alerts">Whiteboard Mode: </FormLabel>
      <Switch id="email-alerts" />
    </Flex>
  );
}
