import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import "./MockIntSession.css";
import { MockIntQuestionRenderer } from "./MockIntQuestionRenderer";
import mockQuestion from "./mockQuestion.md";
import { Flex, Box, Heading } from "@chakra-ui/core";

const SplitPaneWrapper = styled(Box)({
  height: "60%",
  width: "100%",
});

const MockIntSession: React.FunctionComponent<{ message: string }> = () => {
  const [question, setQuestion] = useState<string>("");
  useEffect(() => {
    fetch(mockQuestion)
      .then((ques) => ques.text())
      .then((quesText) => setQuestion(quesText));
  });

  return (
    <Flex direction="column">
      <Box style={{ height: "70%" }}>
        <Heading> Name of the session </Heading>
      </Box>
      <SplitPaneWrapper>
        <SplitPane
          split="vertical"
          minSize={300}
          defaultSize={300}
          className="primary"
          allowResize={true}
          primary="first"
          pane1Style={{ overflowY: "auto" }} // to get scrollable questions
        >
          <MockIntQuestionRenderer questionAsMdString={question} />
          <div>Using a Pane allows you to specify any constraints directly</div>
        </SplitPane>
      </SplitPaneWrapper>
    </Flex>
  );
};

export default MockIntSession;
