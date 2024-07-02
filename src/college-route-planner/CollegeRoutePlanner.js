import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CollegeRoutePlanner.css'; // Create this file for custom styles

const CollegeRoutePlanner = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [map, setMap] = useState(null);
    const [startMarker, setStartMarker] = useState(null);
    const [endMarker, setEndMarker] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const mapInstance = L.map(mapRef.current).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        setMap(mapInstance);
    }, []);

    const handleSetStart = () => {
        const [lat, lng] = start.split(',').map(Number);
        if (startMarker) map.removeLayer(startMarker);
        const marker = L.marker([lat, lng]).addTo(map).bindPopup('Start Location');
        setStartMarker(marker);
        map.setView([lat, lng], 13);
    };

    const handleSetEnd = () => {
        const [lat, lng] = end.split(',').map(Number);
        if (endMarker) map.removeLayer(endMarker);
        const marker = L.marker([lat, lng]).addTo(map).bindPopup('End Location');
        setEndMarker(marker);
        map.setView([lat, lng], 13);
    };

    const handleReset = () => {
        if (startMarker) map.removeLayer(startMarker);
        if (endMarker) map.removeLayer(endMarker);
        setStart('');
        setEnd('');
        setStartMarker(null);
        setEndMarker(null);
        map.setView([51.505, -0.09], 13);
    };

    const handleCalculateRoute = () => {
        // Implement route calculation logic here
    };

    return (
        <div id="app">
            <div id="controls">
                <h1>College Route Planner</h1>
                <div>
                    <label htmlFor="start">Start Location:</label>
                    <input
                        type="text"
                        id="start"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        placeholder="Latitude, Longitude"
                    />
                    <button onClick={handleSetStart}>Set Start on Map</button>
                </div>
                <div>
                    <label htmlFor="end">End Location:</label>
                    <input
                        type="text"
                        id="end"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        placeholder="Latitude, Longitude"
                    />
                    <button onClick={handleSetEnd}>Set End on Map</button>
                </div>
                <div id="clusters">
                    {/* Cluster checkboxes can be dynamically added here */}
                </div>
                <button onClick={handleCalculateRoute}>Calculate Route</button>
                <button onClick={handleReset}>Reset</button>
                <div id="route-info"></div>
            </div>
            <div id="map" ref={mapRef}></div>
        </div>
    );
};

export default CollegeRoutePlanner;
