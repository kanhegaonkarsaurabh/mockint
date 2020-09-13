import React from "react";
import ReactMarkdown from "react-markdown";
import { Flex } from "@chakra-ui/core";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import "./MockIntQuestionRenderer.css";
interface Props {
  questionAsMdString: string;
}

export const MockIntQuestionRenderer = (props: Props) => {
  return (
    <Flex direction="column" pl={"20px"} pr={"20px"} pb={"20px"}>
      <ReactMarkdown
        source={props.questionAsMdString}
        renderers={ChakraUIRenderer()}
      />
    </Flex>
  );
};
