import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import './MockIntSession.css';
import { MockIntQuestionRenderer } from './MockIntQuestionRenderer';
import mockQuestion from './mockQuestion.md';

const MockIntSession : React.FunctionComponent<{ message: string }> = () => {
  const [question, setQuestion] =  useState<string>('');
  useEffect(() => {
    fetch(mockQuestion)
    .then(ques => ques.text())
    .then(quesText => setQuestion(quesText));
  });

  return (
    <SplitPane 
      split="vertical"
      minSize={300}
      defaultSize={300}
      className="primary"
      allowResize={true}
      primary="first"
      pane1Style={{overflowY: 'auto'}}  // to get scrollable questions
    >
      <MockIntQuestionRenderer questionAsMdString={question}/>
      <div>Using a Pane allows you to specify any constraints directly</div>
    </SplitPane>
  )
}

export default MockIntSession;