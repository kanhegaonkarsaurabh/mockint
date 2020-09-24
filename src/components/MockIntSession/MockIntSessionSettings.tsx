import * as React from 'react';
import { Flex, FormLabel, Switch } from '@chakra-ui/core';
import { useCurrentMode } from './CurrentModeContext';

export default function MockIntSessionSettings() {
  const { mode, toggleMode } = useCurrentMode();
  return (
    <Flex justify="center" align="center">
      <FormLabel>Whiteboard Mode: </FormLabel>
      <Switch
        color="teal"
        isChecked={mode === 'whiteboard'}
        onChange={(e) => ((e.target as HTMLInputElement).checked) ? toggleMode('whiteboard') : toggleMode('editor')}
      />
    </Flex>
  );
}
