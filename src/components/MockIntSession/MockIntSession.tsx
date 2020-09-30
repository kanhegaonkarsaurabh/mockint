import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Flex, Box, Heading } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';

import './MockIntSession.css';
import { MockIntQuestionRenderer } from './MockIntQuestionRenderer';
import mockQuestion from './mockQuestion.md';
import MockIntSessionHeader from './MockIntSessionHeader';
import MockIntSessionWhiteboard from './MockIntSessionWhiteboard';
import MockIntSessionEditor from './MockIntSessionEditor';

import { SessionDetails } from './MockIntSessionTypes';
import { SessionDetailsContext } from './MockIntSessionDetailsContext';

import { CurrentModeContext } from './CurrentModeContext';
import MockIntYj from './MockIntYjs';

const SplitPaneWrapper = styled(Box)({
  height: '60%',
  width: '100%',
});

type URLParamType = {
  sessionName: string;
};

const MockIntSession: React.FunctionComponent<Record<
  string,
  unknown
>> = () => {
  const { sessionName } = useParams<URLParamType>();
  const [sessionDetails, setSessionDetails] = useState<
    SessionDetails
  >({
    sessionName,
    sessionLanguage: 'javascript',
    sessionTime: 10,
    sessionQuestion: '',
  });

  const [mode, setMode] = useState<string>('editor');

  // declare an instance of yjs here at the root of mock int session
  const [yjsInstance, setYjsInstance] = useState<MockIntYj>(
    new MockIntYj(sessionName),
  );

  const cleanupYjs = () => {
    yjsInstance.provider.disconnect();
    yjsInstance.provider.destroy();
  };

  // update the question from markdown file
  useEffect(() => {
    fetch(mockQuestion)
      .then((ques) => ques.text())
      .then((quesText) =>
        setSessionDetails({
          ...sessionDetails,
          sessionQuestion: quesText,
        }),
      );

    return cleanupYjs;
  }, []);

  let mockIntRightPanel: JSX.Element | null = null;
  if (mode === 'editor') {
    mockIntRightPanel = (
      <MockIntSessionEditor yjsInstance={yjsInstance} />
    );
  } else if (mode === 'whiteboard') {
    mockIntRightPanel = <MockIntSessionWhiteboard />;
  }

  return (
    <SessionDetailsContext.Provider value={sessionDetails}>
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
              <MockIntQuestionRenderer />
              {mockIntRightPanel}
            </SplitPane>
          </SplitPaneWrapper>
        </Flex>
      </CurrentModeContext.Provider>
    </SessionDetailsContext.Provider>
  );
};

export default MockIntSession;
