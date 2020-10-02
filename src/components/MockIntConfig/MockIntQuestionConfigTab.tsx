import * as React from 'react';
import ReactMde from 'react-mde';
import { Box, Text } from '@chakra-ui/core';
import 'react-mde/lib/styles/css/react-mde-all.css';
import MockIntQuestionRenderer from '../MockIntQuestionRenderer';

type QuestionTabProps = {};

const MockIntQuestionTab: React.FC<QuestionTabProps> = () => {
  const [questionValue, setQuestionValue] = React.useState<string>(
    '## Question',
  );

  const [selectedTab, setSelectedTab] = React.useState<
    'write' | 'preview'
  >('write');

  return (
    <Box>
      <Box mt={5}>
        <ReactMde
          value={questionValue}
          onChange={setQuestionValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={
            (markdown) =>
              Promise.resolve(
                <MockIntQuestionRenderer
                  sessionQuestion={markdown}
                />,
              )
            // eslint-disable-next-line react/jsx-curly-newline
          }
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MockIntQuestionTab;
