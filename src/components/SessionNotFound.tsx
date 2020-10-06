import * as React from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Link,
} from '@chakra-ui/core';

const Page = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding-top: 2rem;
  padding-bottom: 5rem;
`;

const CenterWrapper = styled(Box)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

type SessionNotFound = {
  enteredSessionName: string;
};
const SessionNotFound: React.FC<SessionNotFound> = ({
  enteredSessionName,
}: SessionNotFound) => (
  <Page>
    <CenterWrapper>
      <Alert
        status="error"
        flexDirection="row"
        justifyContent="center"
        textAlign="center"
        height="50px"
      >
        <AlertIcon />
        <AlertTitle mr={2}>
          {enteredSessionName} session not found!
        </AlertTitle>
        <AlertDescription>
          Create a new session at{' '}
          {<Link href="https://mockint.co">mockint.co</Link>}
        </AlertDescription>
      </Alert>
    </CenterWrapper>
  </Page>
);

export default SessionNotFound;
