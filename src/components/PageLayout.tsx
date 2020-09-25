import React, { FunctionComponent } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import Header from './Header';

const PageLayout: FunctionComponent<{}> = (props) => {
  return (
    <Box>
      <Header />
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: '1200px' }}
        m="0 auto"
      >
        {props.children}
      </Flex>
    </Box>
  );
};

export default PageLayout;
