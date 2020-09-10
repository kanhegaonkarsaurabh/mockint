import React from 'react';
import SplitPane from 'react-split-pane';
import './MockIntSession.css';

const MockIntSession : React.FunctionComponent<{ message: string }> = () => {
  return (
    <SplitPane 
      split="vertical"
      minSize={300}
      defaultSize={300}
      className="primary"
      allowResize={true}
      primary="first"
    >
      <div>You can use a Pane component</div>
      <div>Using a Pane allows you to specify any constraints directly</div>
    </SplitPane>
  )
}

export default MockIntSession;