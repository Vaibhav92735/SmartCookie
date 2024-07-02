import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Heading,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import './App.css';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
} from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import Papa from 'papaparse';

const center = { lat: 36.7783, lng: -119.4179 }; // Default center for California
const sanjose = { lat:37.335480, lng: -121.893028};
const sacramento = { lat:38.575764, lng: -121.478851};
const la = { lat:34.0549, lng: -118.2426};
const sb = { lat: 34.420830, lng:-119.698189 }
const sd = { lat: 32.715736, lng:-117.161087 };
const libraries = ['places']; // Static array for libraries

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
    libraries: libraries, // Use the static array
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState(new Set());
  const [activeMarker, setActiveMarker] = useState(null);
  const [starbucksLocations, setStarbucksLocations] = useState([]);
  const [starbucksLocations1, setStarbucksLocations1] = useState([]);
  const [starbucksLocations2, setStarbucksLocations2] = useState([]);
  const [starbucksLocations3, setStarbucksLocations3] = useState([]);
  const [starbucksLocations4, setStarbucksLocations4] = useState([]);

  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    // Fetch and parse the CSV file for colleges
    fetch('/final_dataset.csv') // Ensure this path is correct and accessible
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const collegeData = result.data.map((row) => ({
              name: row['College Name'],
              lat: parseFloat(row['Latitude_x']),
              lng: parseFloat(row['Longitude_x']),
            }));
            setColleges(collegeData);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });

    // Fetch Starbucks locations using Google Places API
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: sanjose,
        radius: 100000, // Search within a 50 km radius of the center
        query: 'Starbucks',
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const starbucksData = results.map(place => ({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setStarbucksLocations(starbucksData);
        } else {
          console.error('Error fetching Starbucks locations:', status);
        }
      });
    }

    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: sd,
        radius: 100000, // Search within a 50 km radius of the center
        query: 'Starbucks',
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const starbucksData = results.map(place => ({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setStarbucksLocations4(starbucksData);
        } else {
          console.error('Error fetching Starbucks locations:', status);
        }
      });
    }
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: sb,
        radius: 100000, // Search within a 50 km radius of the center
        query: 'Starbucks',
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const starbucksData = results.map(place => ({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setStarbucksLocations3(starbucksData);
        } else {
          console.error('Error fetching Starbucks locations:', status);
        }
      });
    }

    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: sacramento,
        radius: 100000, // Search within a 50 km radius of the center
        query: 'Starbucks',
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const starbucksData = results.map(place => ({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setStarbucksLocations1(starbucksData);
        } else {
          console.error('Error fetching Starbucks locations:', status);
        }
      });
    }
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: sacramento,
        radius: 100000, // Search within a 50 km radius of the center
        query: 'Starbucks',
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const starbucksData = results.map(place => ({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setStarbucksLocations2(starbucksData);
        } else {
          console.error('Error fetching Starbucks locations:', status);
        }
      });
    }
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: la,
        radius: 200000, // Search within a 50 km radius of the center
        query: 'Starbucks',
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const starbucksData = results.map(place => ({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setStarbucksLocations2(starbucksData);
        } else {
          console.error('Error fetching Starbucks locations:', status);
        }
      });
    }
  }, [isLoaded, map]);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      waypoints: Array.from(selectedColleges).map((college) => ({
        location: { lat: college.lat, lng: college.lng },
        stopover: true,
      })),
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs.reduce((total, leg) => total + leg.distance.value, 0) / 1000 + ' km');
    setDuration(results.routes[0].legs.reduce((total, leg) => total + leg.duration.value, 0) / 60 + ' mins');
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setWaypoints([]);
    setSelectedColleges(new Set());
    originRef.current.value = '';
    destinationRef.current.value = '';
    setActiveMarker(null);
  }

  function handleMapClick(event) {
    setWaypoints([...waypoints, event.latLng]);
  }

  function handleCollegeClick(college, marker) {
    const newSelectedColleges = new Set(selectedColleges);
    if (newSelectedColleges.has(college)) {
      newSelectedColleges.delete(college);
    } else {
      newSelectedColleges.add(college);
    }
    setSelectedColleges(newSelectedColleges);
    setActiveMarker(marker);
  }

  return (
    <Flex className="app-container" id='app'>
      <Heading as="h1" size="lg" mb={4} textAlign="center">College Routes</Heading>
      <Box className="map-container">
        <GoogleMap
          center={center}
          zoom={6}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
          onClick={handleMapClick}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {waypoints.map((point, index) => (
            <Marker key={index} position={point} />
          ))}
          {colleges.map((college, index) => (
            <Marker
              key={index}
              position={{ lat: college.lat, lng: college.lng }}
              onClick={(e) => handleCollegeClick(college, index)}
              icon={{
                url: selectedColleges.has(college)
                  ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              }}
            >
              {activeMarker === index && (
                <InfoWindow
                  position={{ lat: college.lat, lng: college.lng }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>{college.name}</div>
                </InfoWindow>
              )}
            </Marker>
          ))}
          {starbucksLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
            >
              {/* <InfoWindow
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div>{'tr'}</div>
              </InfoWindow> */}
            </Marker>
          ))}
          {starbucksLocations4.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
            >
              {/* <InfoWindow
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div>{'tr'}</div>
              </InfoWindow> */}
            </Marker>
          ))}
          {starbucksLocations3.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
            >
              {/* <InfoWindow
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div>{'tr'}</div>
              </InfoWindow> */}
            </Marker>
          ))}
          {starbucksLocations1.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
            >
              {/* <InfoWindow
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div>{'tr'}</div>
              </InfoWindow> */}
            </Marker>
          ))}
          {starbucksLocations2.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
            >
              {/* <InfoWindow
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div>{'tr'}</div>
              </InfoWindow> */}
            </Marker>
          ))}
        </GoogleMap>
      </Box>
      <Box className="controls-container">
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='clear route'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={2} mt={2} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default App;
