import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import PageLayout from './components/PageLayout';
import mockintTheme from './theme';
import MockIntSessionConfigPage from './pages/MockIntSessionConfigPage';
// import CreateInterviewPage from './pages/CreateInterviewPage';
import MockIntSession from './components/MockIntSession/MockIntSession';

export default function App() {
  return (
    <ThemeProvider theme={mockintTheme}>
      <CSSReset />
      <MockIntSession />
      {/* <PageLayout>
        <MockIntSessionConfigPage />  
      </PageLayout>      */}
    </ThemeProvider>
  );
}
