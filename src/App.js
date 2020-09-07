import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import CreateInterviewPage from "./pages/CreateInterviewPage";
import PageLayout from "./components/PageLayout";
import mockintTheme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={mockintTheme}>
      <CSSReset />
      <PageLayout>
        <CreateInterviewPage />
      </PageLayout>
    </ThemeProvider>
  );
}
