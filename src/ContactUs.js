import React, { useState } from 'react';
import { Box, Input, Textarea, Button, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      college_name: collegeName,
      location: location,
      message: message,
      to_email: 'vaibhavgupta92735@gmail.com',  // replace with your email address
    };

    emailjs
      .send('service_kdxwu5m', 'template_451yyxr', templateParams, 'naQalkUTUH3U_-TCE')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Message sent successfully!');
        setCollegeName('');
        setLocation('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
        alert('Failed to send message.');
      });
  };

  return (
    <Box p={5} maxWidth="600px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" textAlign="center" mb={5}>Contact Us</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="college-name" mb={4} isRequired>
          <FormLabel>College Name</FormLabel>
          <Input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
          />
        </FormControl>
        <FormControl id="location" mb={4} isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl id="message" mb={4} isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">Send</Button>
      </form>
    </Box>
  );
};

export default ContactUs;
