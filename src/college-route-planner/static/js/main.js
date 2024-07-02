let map;
let markers = [];
let route = [];
let startMarker, endMarker;
let isSettingStart = false;
let isSettingEnd = false;

function initMap() {
    map = L.map('map').setView([39.8283, -98.5795], 4);  // Center on the US
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', onMapClick);
}

function onMapClick(e) {
    if (isSettingStart) {
        setStartLocation(e.latlng);
    } else if (isSettingEnd) {
        setEndLocation(e.latlng);
    }
}

function setStartLocation(latlng) {
    if (startMarker) {
        map.removeLayer(startMarker);
    }
    startMarker = L.marker(latlng, {icon: createIcon('green')}).addTo(map);
    document.getElementById('start').value = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    isSettingStart = false;
    document.getElementById('set-start').classList.remove('active');
}

function setEndLocation(latlng) {
    if (endMarker) {
        map.removeLayer(endMarker);
    }
    endMarker = L.marker(latlng, {icon: createIcon('red')}).addTo(map);
    document.getElementById('end').value = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    isSettingEnd = false;
    document.getElementById('set-end').classList.remove('active');
}

function createIcon(color) {
    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

function addMarker(lat, lng, title, cluster) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(title);
    markers.push({marker, cluster});
}

function clearRoute() {
    route.forEach(line => map.removeLayer(line));
    route = [];
}

function drawRoute(coordinates) {
    clearRoute();
    const line = L.polyline(coordinates, {color: 'blue'}).addTo(map);
    route.push(line);
    map.fitBounds(line.getBounds());
}

function updateRouteInfo(distance, colleges) {
    const routeInfo = document.getElementById('route-info');
    routeInfo.innerHTML = `
        <h3>Route Information</h3>
        <p>Total Distance: ${distance.toFixed(2)} km</p>
        <h4>Colleges to Visit:</h4>
        <ol>
            ${colleges.map(college => `<li>${college}</li>`).join('')}
        </ol>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();

    // Mock data - replace with actual data from backend
    const clusters = ['Cluster 1', 'Cluster 2', 'Cluster 3'];
    const colleges = [
        {name: 'College A', lat: 40.7128, lng: -74.0060, cluster: 'Cluster 1'},
        {name: 'College B', lat: 34.0522, lng: -118.2437, cluster: 'Cluster 2'},
        {name: 'College C', lat: 41.8781, lng: -87.6298, cluster: 'Cluster 3'},
        {name: 'College D', lat: 39.9526, lng: -75.1652, cluster: 'Cluster 1'},
        {name: 'College E', lat: 47.6062, lng: -122.3321, cluster: 'Cluster 2'}
    ];

    // Add cluster checkboxes
    const clustersDiv = document.getElementById('clusters');
    clusters.forEach(cluster => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = cluster;
        checkbox.name = cluster;
        const label = document.createElement('label');
        label.htmlFor = cluster;
        label.appendChild(document.createTextNode(cluster));
        clustersDiv.appendChild(checkbox);
        clustersDiv.appendChild(label);
        clustersDiv.appendChild(document.createElement('br'));
    });

    // Add college markers
    colleges.forEach(college => {
        addMarker(college.lat, college.lng, college.name, college.cluster);
    });

    // Set start location button
    document.getElementById('set-start').addEventListener('click', () => {
        isSettingStart = true;
        isSettingEnd = false;
        document.getElementById('set-start').classList.add('active');
        document.getElementById('set-end').classList.remove('active');
    });

    // Set end location button
    document.getElementById('set-end').addEventListener('click', () => {
        isSettingEnd = true;
        isSettingStart = false;
        document.getElementById('set-end').classList.add('active');
        document.getElementById('set-start').classList.remove('active');
    });

    // Calculate route button click handler
    document.getElementById('calculate').addEventListener('click', () => {
        const start = document.getElementById('start').value.split(',').map(Number);
        const end = document.getElementById('end').value.split(',').map(Number);
        const selectedClusters = Array.from(document.querySelectorAll('#clusters input:checked')).map(input => input.name);
        
        // Mock route calculation - replace with actual API call
        const selectedColleges = colleges.filter(college => selectedClusters.includes(college.cluster));
        const routePoints = [
            start,
            ...selectedColleges.map(college => [college.lat, college.lng]),
            end
        ];
        
        drawRoute(routePoints);
        
        // Calculate mock distance (replace with actual distance calculation)
        const distance = routePoints.reduce((total, point, index, array) => {
            if (index === 0) return 0;
            const dx = point[0] - array[index-1][0];
            const dy = point[1] - array[index-1][1];
            return total + Math.sqrt(dx*dx + dy*dy) * 111;  // Rough km conversion
        }, 0);
        
        updateRouteInfo(distance, selectedColleges.map(college => college.name));
    });

    // Reset button click handler
    document.getElementById('reset').addEventListener('click', () => {
        document.getElementById('start').value = '';
        document.getElementById('end').value = '';
        document.querySelectorAll('#clusters input').forEach(input => input.checked = false);
        clearRoute();
        document.getElementById('route-info').innerHTML = '';
        if (startMarker) map.removeLayer(startMarker);
        if (endMarker) map.removeLayer(endMarker);
        startMarker = endMarker = null;
    });
});
