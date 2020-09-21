import React, { useContext } from 'react';
import { Flex, Box, Heading } from '@chakra-ui/core';
import EventEmitterContext from './EventEmitterContext';
import Timer from '../Timer';

interface IProps {
  sessionName: string;
};

export default function MockIntSessionHeader(props: IProps) {
  const eventEmitter = useContext(EventEmitterContext);

  const onMockIntSessionEnd = (): void => {
    eventEmitter.emit('mockIntSessionEnd', {});
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={4}
      border="1px"
      borderColor="gray.500"
      mb={2}
    >
      <Heading as="h3" size="lg">
        {props.sessionName}
      </Heading>
      <Flex
        align={['center', 'center', 'center', 'center']}
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Timer timeInSeconds={10} onTimerEnd={onMockIntSessionEnd} />
      </Flex>
    </Flex>
  );
}
