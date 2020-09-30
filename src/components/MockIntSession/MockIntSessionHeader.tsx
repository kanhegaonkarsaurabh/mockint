import React, { useContext } from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import Timer from '../Timer';
import MockIntSessionSettings from './MockIntSessionSettings';
import { useSessionDetails } from './MockIntSessionDetailsContext';
import MockIntYj from './MockIntYjs';

type HeaderProps = {
  yjsInstance: MockIntYj;
};

const MockIntSessionHeader: React.FC<HeaderProps> = ({
  yjsInstance,
}: HeaderProps) => {
  const { sessionName, sessionLanguage } = useSessionDetails();

  const onMockIntSessionEnd = (): void => {};

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
      <Flex flexDirection="column">
        <Heading as="h3" size="md">
          {sessionName}
        </Heading>
        <Text fontSize="sm" as="em">
          Language:
          {sessionLanguage}
        </Text>
      </Flex>
      <Flex
        align={['center', 'center', 'center', 'center']}
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Timer
          timeInSeconds={10}
          onTimerEnd={onMockIntSessionEnd}
          yjsInstance={yjsInstance}
        />
      </Flex>
      <MockIntSessionSettings />
    </Flex>
  );
};

export default MockIntSessionHeader;
