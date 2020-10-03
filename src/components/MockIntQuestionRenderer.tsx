import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flex } from '@chakra-ui/core';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import './MockIntQuestionRenderer.css';

type QuestionRendererProps = {
  sessionQuestion: string;
};

const MockIntQuestionRenderer: React.FC<QuestionRendererProps> = ({
  sessionQuestion,
}: QuestionRendererProps) => {
  return (
    <Flex direction="column" pl="20px" pr="20px" pb="20px">
      <ReactMarkdown
        source={sessionQuestion}
        renderers={ChakraUIRenderer()}
      />
    </Flex>
  );
};

export default MockIntQuestionRenderer;
