function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = Array.from({ length: 3 }, () => {
    return {
        lat: getRandomInRange(30, 35, 3),
        lng: getRandomInRange(-90, -100, 3),
    };
});

const map = L.map('map').setView([32.5, -95], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

async function fetchLocality(lat, lng, markerIndex) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    const locality = data.locality || "Unknown locality";
    document.getElementById(`marker${markerIndex}`).innerHTML = `Marker ${markerIndex}: ${lat}, ${lng} <br> Locality: ${locality}`;
}

coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    fetchLocality(coord.lat, coord.lng, index + 1);
});
