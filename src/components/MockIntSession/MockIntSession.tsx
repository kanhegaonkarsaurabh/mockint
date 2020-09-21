import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Flex, Box, Heading } from '@chakra-ui/core';

import './MockIntSession.css';
import { MockIntQuestionRenderer } from './MockIntQuestionRenderer';
import mockQuestion from './mockQuestion.md';
import MockIntSessionHeader from './MockIntSessionHeader';
import MockIntSessionWhiteboard from './MockIntSessionWhiteboard';
import MockIntSessionEditor from './MockIntSessionEditor';
import EventEmitterContext from './EventEmitterContext';

const SplitPaneWrapper = styled(Box)({
  height: '60%',
  width: '100%',
});

const MockIntSession: React.FunctionComponent<{}> = () => {
  const [question, setQuestion] = useState<string>('');
  useEffect(() => {
    fetch(mockQuestion)
      .then((ques) => ques.text())
      .then((quesText) => setQuestion(quesText));
  });

  return (
    <Flex direction="column">
      <MockIntSessionHeader sessionName="My-Awesome-Session" />
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
          <MockIntQuestionRenderer questionAsMdString={question} />
          <MockIntSessionWhiteboard />
          {/* <MockIntSessionEditor language="javascript" /> */}
        </SplitPane>
      </SplitPaneWrapper>
    </Flex>
  );
};

export default MockIntSession;
