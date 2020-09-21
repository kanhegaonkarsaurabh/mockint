import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import PageLayout from './components/PageLayout';
import mockintTheme from './theme';
import MockIntSession from './components/MockIntSession/MockIntSession';

export default function App() {
  return (
    <ThemeProvider theme={mockintTheme}>
      <CSSReset />
      <MockIntSession />
    </ThemeProvider>
  );
}
