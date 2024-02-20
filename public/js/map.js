mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", //Style URL
  center: [77.209, 28.6138], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
