import * as React from 'react';
import ReactMde from 'react-mde';
import { Box, Text } from '@chakra-ui/core';
import 'react-mde/lib/styles/css/react-mde-all.css';
import MockIntQuestionRenderer from '../MockIntQuestionRenderer';

type QuestionTabProps = {
  onQuestionChange: (editorVal: string) => void;
  questionValue: string;
};

const MockIntQuestionTab: React.FC<QuestionTabProps> = ({
  onQuestionChange,
  questionValue,
}: QuestionTabProps) => {
  const [selectedTab, setSelectedTab] = React.useState<
    'write' | 'preview'
  >('write');

  return (
    <Box>
      <Box mt={5}>
        <ReactMde
          value={questionValue}
          onChange={onQuestionChange}
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
