import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  ButtonGroup,
} from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';
// import { SessionDetails } from '../components/MockIntSession/MockIntSessionTypes';
import MockIntQuestionConfigTab from '../components/MockIntConfig/MockIntQuestionConfigTab';
import { SessionDataContext } from '../components/MockIntSessionDataContext';
import {
  FirebaseStoredSession,
  updateSessionWithQuestionInDb,
} from '../data/firebase';
import { loadSessionFromDb } from '../data/firebase';
import useReadFirebase from '../data/useReadFirebase';
import SessionNotFound from '../components/SessionNotFound';

const ConfigPageContainerWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const ConfigPageContainer = styled(Box)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const MockIntSessionConfigPage = () => {
  const routerHistory = useHistory();
  const { sessionName } = useParams<{ sessionName: string }>();
  const [
    status,
    error,
    firebaseData,
  ] = useReadFirebase(loadSessionFromDb, [sessionName]);

  const [questionEditorValue, setQuestionEditorValue] = useState('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (firebaseData == null) {
      return () => {};
    }
    const { sessionQuestion } = firebaseData as FirebaseStoredSession;
    setQuestionEditorValue(sessionQuestion);
  }, [firebaseData]);

  const updateQuestion = async () => {
    try {
      const didQsUpdate = await updateSessionWithQuestionInDb(
        sessionName,
        questionEditorValue,
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onSave = async () => {
    setIsSaving(true);
    await updateQuestion();
    setIsSaving(false);
  };

  if (status === 'fetched' && !firebaseData) {
    return <SessionNotFound enteredSessionName={sessionName} />;
  }

  if (status === 'fetched' && firebaseData) {
    return (
      <SessionDataContext.Provider value={firebaseData}>
        <ConfigPageContainerWrapper>
          <ConfigPageContainer>
            <Flex flexDirection="column" ml={3}>
              <Heading size="lg">{sessionName} Settings</Heading>
              <Flex mt={6}>
                <Tabs variant="soft-rounded" variantColor="teal">
                  <TabList>
                    <Tab>Question</Tab>
                    <Tab>Whiteboard</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <MockIntQuestionConfigTab
                        questionValue={questionEditorValue}
                        onQuestionChange={(editorVal) =>
                          setQuestionEditorValue(editorVal)
                        }
                      />
                    </TabPanel>
                    <TabPanel>
                      <p>one!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
              <ButtonGroup spacing={4} mt={5}>
                <Button
                  variantColor="teal"
                  variant="outline"
                  maxWidth={150}
                  onClick={() => onSave()}
                  isLoading={isSaving}
                  loadingText="Saving"
                >
                  Save
                </Button>
                <Button
                  variantColor="teal"
                  onClick={() =>
                    routerHistory.push(`/session/${sessionName}`)
                  }
                >
                  Go to session
                </Button>
              </ButtonGroup>
            </Flex>
          </ConfigPageContainer>
        </ConfigPageContainerWrapper>
      </SessionDataContext.Provider>
    );
  }

  return null;
};

export default MockIntSessionConfigPage;
