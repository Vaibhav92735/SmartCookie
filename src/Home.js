import React from 'react';
import { Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import './Home.css'; // Import the CSS file for additional styles
import Img from "./Img.jpg";

const Home = () => {
  return (
    <Flex direction="column" align="center" justify="center" className="home-container" id='home'>
      <Heading as="h1" size="2xl" mb={8} className="main-heading">
        Smart Cookie
      </Heading>
      <Flex direction={['column', 'column', 'row']} className="content-container">
        <Box className="left-section">
          <Box className="image-container">
            <Image src={Img} alt="Placeholder Image" className="main-image" />
            {/* <Box className="text-overlay">
              <Text>This is line 1</Text>
              <Text>This is line 2</Text>
              <Text>This is line 3</Text>
              <Text>This is line 4</Text>
            </Box> */}
          </Box>
        </Box>
        <Box className="right-section">
          <Heading as="h2" size="lg" mb={4} className="small-heading">
            Welcome to Smart Cookie
          </Heading>
          <Text className="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text className="paragraph">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text className="paragraph">
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, 
            nec luctus magna felis sollicitudin mauris.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
