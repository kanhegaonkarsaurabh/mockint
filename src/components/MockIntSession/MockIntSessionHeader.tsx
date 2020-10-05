import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import MockIntSessionSettings from './MockIntSessionSettings';
import { useSessionData } from '../MockIntSessionDataContext';
import MockIntYj from './MockIntYjs';
import FirebaseDataTimerWrapper from '../FirebaseDataTimerWrapper';
import Timer from '../Timer';

type HeaderProps = {
  yjsInstance: MockIntYj | null;
};

const MockIntSessionHeader: React.FC<HeaderProps> = ({
  yjsInstance,
}: HeaderProps) => {
  const { sessionName } = useParams<{ sessionName: string }>();
  const { sessionLanguage } = useSessionData();

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
        <Timer onTimerEnd={onMockIntSessionEnd} />
      </Flex>
      <MockIntSessionSettings />
    </Flex>
  );
};

export default MockIntSessionHeader;
