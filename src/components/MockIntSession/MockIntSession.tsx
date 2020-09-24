import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Flex, Box, Heading } from '@chakra-ui/core';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/core';

import './MockIntSession.css';
import { MockIntQuestionRenderer } from './MockIntQuestionRenderer';
import mockQuestion from './mockQuestion.md';
import MockIntSessionHeader from './MockIntSessionHeader';
import MockIntSessionWhiteboard from './MockIntSessionWhiteboard';
import MockIntSessionEditor from './MockIntSessionEditor';
import EventEmitterContext from './EventEmitterContext';
import {
  SessionDetails,
  SessionDetailsContext,
} from './MockIntSessionDetailsContext';

const SplitPaneWrapper = styled(Box)({
  height: '60%',
  width: '100%',
});

const MockIntSession: React.FunctionComponent<{}> = () => {
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>({
    sessionName: 'My-Awesome-Session',
    sessionLanguage: 'javascript',
    sessionTime: 10,
    sessionQuestion: ''
  });

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
  });

  return (
      <SessionDetailsContext.Provider value={sessionDetails}>
        <Flex direction="column">
          <MockIntSessionHeader />
          <SplitPaneWrapper>
            <SplitPane
              split="vertical"
              minSize={300}
              defaultSize={300}
              className="primary"
              allowResize={true}
              primary="first"
              pane1Style={{ overflowY: 'auto' }} // to get scrollable questions
            >
              <MockIntQuestionRenderer />
              {/* <MockIntSessionWhiteboard /> */}
              <MockIntSessionEditor />
            </SplitPane>
          </SplitPaneWrapper>
        </Flex>
      </SessionDetailsContext.Provider>
  );
};

export default MockIntSession;
