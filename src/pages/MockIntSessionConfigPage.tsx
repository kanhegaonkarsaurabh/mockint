import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core';
import styled from '@emotion/styled';
// import { SessionDetails } from '../components/MockIntSession/MockIntSessionTypes';
import MockIntQuestionConfigTab from '../components/MockIntConfig/MockIntQuestionConfigTab';

const ConfigPageContainerWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const ConfigPageContainer = styled(Box)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const MockIntSessionConfigPage = () => {
  return (
    <ConfigPageContainerWrapper>
      <ConfigPageContainer>
        <Flex flexDirection="column">
          <Heading size="lg" ml={3}>
            My-Awesome-Session Settings
          </Heading>
          <Flex mt={6}>
            <Tabs variant="soft-rounded" variantColor="teal">
              <TabList>
                <Tab>Session Info</Tab>
                <Tab>Question</Tab>
                <Tab>Whiteboard</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <MockIntQuestionConfigTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </ConfigPageContainer>
    </ConfigPageContainerWrapper>
  );
};

export default MockIntSessionConfigPage;
