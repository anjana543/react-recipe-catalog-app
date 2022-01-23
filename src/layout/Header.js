import React from 'react';
import Flex from '../components/Flex';

const Header = () => (
  <Flex
    boxShadow="md"
    backgroundColor="neutral_100"
    justifyContent="center"
    alignItems="center"
    padding="sm">
    <a href="/" title="Home">
      <img
        height="100px"
        src={`${process.env.PUBLIC_URL}/FreshToHome.png`}
        alt="FreshToHome Logo"
      />
    </a>
  </Flex>
);

export default Header;
