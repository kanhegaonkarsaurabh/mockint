import * as React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import PageLayout from './components/PageLayout';
import mockintTheme from './theme';
import MockIntSessionConfigPage from './pages/MockIntSessionConfigPage';
import CreateInterviewPage from './pages/CreateInterviewPage';
import MockIntSession from './components/MockIntSession/MockIntSession';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={mockintTheme}>
      <CSSReset />
      <Router>
        <Switch>
          <Route path="/session/:sessionName">
            <MockIntSession />
          </Route>
          <Route path="/config/:sessionName">
            <MockIntSessionConfigPage />
          </Route>
          <Route path="/">
            <PageLayout>
              <CreateInterviewPage />
            </PageLayout>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
