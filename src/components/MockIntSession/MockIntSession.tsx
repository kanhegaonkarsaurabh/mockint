import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import styled from '@emotion/styled';
import {
  Flex,
  Box,
} from '@chakra-ui/core';
import { useParams } from 'react-router-dom';

import './MockIntSession.css';
import MockIntQuestionRenderer from '../MockIntQuestionRenderer';
import MockIntSessionHeader from './MockIntSessionHeader';
import MockIntSessionWhiteboard from './MockIntSessionWhiteboard';
import MockIntSessionEditor from './MockIntSessionEditor';

import { SessionData } from './MockIntSessionTypes';
import { SessionDataContext } from '../MockIntSessionDataContext';

import { CurrentModeContext } from './CurrentModeContext';
import MockIntYj from './MockIntYjs';
import {
  FirebaseStoredSession,
  loadSessionFromDb,
} from '../../data/firebase';
import useReadFirebase from '../../data/useReadFirebase'; 
import CenterDivWrapper from '../SessionNotFound';
import SessionNotFound from '../SessionNotFound';

const SplitPaneWrapper = styled(Box)({
  height: '60%',
  width: '100%',
});

type URLParamType = {
  sessionName: string;
};

const MockIntSession: React.FC<{}> = ({children}) => {
  const { sessionName } = useParams<URLParamType>();
  const [
    status,
    error,
    firebaseData,
  ] = useReadFirebase(loadSessionFromDb, [sessionName]);
  const [mode, setMode] = useState<string>('editor');

  // declare an instance of yjs here at the root of mock int session
  const [yjsInstance, setYjsInstance] = useState<MockIntYj | null>(
    null,
  );

  const cleanupYjs = () => {
    if (yjsInstance == null) {
      return;
    }
    yjsInstance.provider.disconnect();
    yjsInstance.provider.destroy();
  };

  // update the question from markdown file
  useEffect(() => {
    if (firebaseData) {
      // set the instance of yjs instance
      setYjsInstance(new MockIntYj(sessionName));
    }
    return cleanupYjs;
  }, [firebaseData]);

  let mockIntRightPanel: JSX.Element | null = null;
  if (mode === 'editor') {
    mockIntRightPanel = (
      <MockIntSessionEditor yjsInstance={yjsInstance} />
    );
  } else if (mode === 'whiteboard') {
    mockIntRightPanel = <MockIntSessionWhiteboard />;
  }

  // api call has finished and returned null. No session is present
  if (status === 'fetched' && !firebaseData) {
    return (
      <SessionNotFound enteredSessionName={sessionName} />
    );
  }

  if (status === 'fetched' && firebaseData) {
    return (
      <SessionDataContext.Provider 
        value={firebaseData as FirebaseStoredSession}
      >
        <CurrentModeContext.Provider
          value={{ mode, toggleMode: setMode }}
        >
          <Flex direction="column">
            <MockIntSessionHeader yjsInstance={yjsInstance} />
            <SplitPaneWrapper>
              <SplitPane
                split="vertical"
                minSize={500}
                defaultSize={500}
                className="primary"
                allowResize={false}
                primary="first"
                pane1Style={{ overflowY: 'auto' }} // to get scrollable questions
              >
                <MockIntQuestionRenderer
                  sessionQuestion={(firebaseData as FirebaseStoredSession).sessionQuestion}
                />
                {mockIntRightPanel}
              </SplitPane>
            </SplitPaneWrapper>
          </Flex>
        </CurrentModeContext.Provider>
      </SessionDataContext.Provider>
    );
  }

  return null;
};

export default MockIntSession;
