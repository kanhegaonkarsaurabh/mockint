import React from "react";
import ReactMarkdown from "react-markdown";
import { Flex } from "@chakra-ui/core";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import './MockIntQuestionRenderer.css';
import { useSessionDetails } from './MockIntSessionDetailsContext';

export const MockIntQuestionRenderer = () => {
  const { sessionQuestion } = useSessionDetails();
  return (
    <Flex direction="column" pl={'20px'} pr={'20px'} pb={'20px'}>
      <ReactMarkdown
        source={sessionQuestion}
        renderers={ChakraUIRenderer()}
      />
    </Flex>
  );
};
