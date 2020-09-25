import React, { FunctionComponent } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  PseudoBox,
  Heading,
} from '@chakra-ui/core';

const Header = () => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
    >
      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={[
            'center',
            'space-between',
            'flex-end',
            'flex-end',
          ]}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <Heading size="lg">MockInt</Heading>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
