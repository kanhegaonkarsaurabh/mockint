import * as React from 'react';
import ReactMde from 'react-mde';
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
    <ReactMde
      value={questionValue}
      onChange={setQuestionValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={
        (markdown) =>
          Promise.resolve(
            <MockIntQuestionRenderer sessionQuestion={markdown} />,
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
    />
  );
};

export default MockIntQuestionTab;
