import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import { Flex, Box, Heading, Button } from '@chakra-ui/react'; // Assuming Chakra UI for styling

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="#908caa"
      color="white"
      boxShadow="md"
    >
      <Box>
        <Heading bgGradient='linear(to-l, #7928CA, #FF0080)'  bgClip='text' size="md">MelodyMatch</Heading>
      </Box>
      <Box>
        <Link to="/matcheslist">
          <Button variant="ghost" mr="2">Matches</Button>
        </Link>
        <Link to="/matches">
          <Button variant="ghost" mr="2">Users</Button>
        </Link>

        <Link to="/profile">
          <Button variant="ghost" mr="2">Profile</Button>
        </Link>

        {/* Add more navigation links as needed */}
      </Box>
    </Flex>
  );
};

export default Header;
