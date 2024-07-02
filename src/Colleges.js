import React, { useEffect, useState } from 'react';
import { storage, ref, listAll, getDownloadURL } from './firebase';
import { Heading, Input, Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, List, ListItem, Text } from '@chakra-ui/react'; 
import Papa from 'papaparse';
import './Colleges.css';

const Colleges = () => {
  const [images, setImages] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [assignedColleges, setAssignedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, 'Colleges/');
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map((item) => getDownloadURL(item))
        );
        setImages(urls);
      } catch (error) {
        console.error('Error fetching images from Firebase', error);
      }
    };

    const fetchColleges = async () => {
      try {
        const response = await fetch('/final_dataset.csv');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const collegeData = result.data.map((row) => ({
              name: row['College Name'],
              lat: parseFloat(row['Latitude_x']),
              lng: parseFloat(row['Longitude_x']),
              rank: row['Rank'],
              no_stu: parseInt(row['Number of Students_x']),
              rso: parseInt(row['Research Score_x']),
              tso: parseInt(row['Teaching Score_X']),
              desc: row['Description_x'],
              email: row['contact']
            }));
            setColleges(collegeData);
            console.log(collegeData);
            setFilteredColleges(collegeData); 
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchImages();
    fetchColleges();
  }, []);

  useEffect(() => {
    if (images.length > 0 && colleges.length > 0) {
      const sortedColleges = [...colleges].sort((a, b) => a.name.localeCompare(b.name));
      const sortedImages = [...images].sort();
      const mappedColleges = sortedColleges.map((college, index) => ({
        ...college,
        image: sortedImages[index % sortedImages.length],
      }));
      setAssignedColleges(mappedColleges);
      setFilteredColleges(mappedColleges);
    }
  }, [images, colleges]);

  const handleImageClick = (index) => {
    setSelectedCollege(index);
  };

  const handleScheduleMeeting = () => {
    const timings = prompt('Enter the meeting timings:');
    if (timings && selectedCollege !== null) {
      const collegeEmail = assignedColleges[selectedCollege].email;
      sendEmail(timings, collegeEmail);
    }
  };

  const sendEmail = async (timings, collegeEmail) => {
    const response = await fetch('http://localhost:5000/send-email', { // Ensure the correct URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to_email: collegeEmail,
        subject: 'Internship Program and Smart Cookie Platform Introduction',
        message: `${timings}`,
      }),
    });

    if (response.ok) {
      alert('Meeting request sent!');
    } else {
      alert('Failed to send meeting request.');
    }
  };

  const handleSearch = () => {
    const filtered = assignedColleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(filtered);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectCollege = (index) => {
    setSelectedCollege(index);
    setIsModalOpen(false);
  };

  return (
    <div className="colleges-container" id='colleges'>
      <Heading as="h1" size="lg" mb={4} textAlign="center">
        Colleges
      </Heading>
      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
        <Input
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
          mr={2}
        />
        <Button onClick={handleSearch} colorScheme="blue">Search</Button>
      </Box>
      {selectedCollege === null ? (
        <div className="image-slider">
          {filteredColleges.map((college, index) => (
            <img
              key={index}
              src={college.image}
              alt={college.name}
              onClick={() => handleImageClick(index)}
              className="slider-image"
            />
          ))}
        </div>
      ) : (
        <div className="college-info">
          <img src={assignedColleges[selectedCollege].image} alt={assignedColleges[selectedCollege].name} className="selected-image" />
          <p>College Name: {assignedColleges[selectedCollege].name}</p>
          <p>College Rank: {assignedColleges[selectedCollege].rank}</p>
          <p>No of Students: {assignedColleges[selectedCollege].no_stu}</p>
          <p>Research Score: {assignedColleges[selectedCollege].rso}</p>
          <p>Teaching Score: {assignedColleges[selectedCollege].tso}</p>
          <p>Description: {assignedColleges[selectedCollege].desc}</p>
          <button onClick={handleScheduleMeeting}>Schedule a Meeting</button>
          <button onClick={() => setSelectedCollege(null)}>Back</button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Available Colleges</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              {filteredColleges.map((college, index) => (
                <ListItem key={index} onClick={() => handleSelectCollege(index)} cursor="pointer">
                  <Text>{college.name}</Text>
                </ListItem>
              ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Colleges;
