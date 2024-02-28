mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", //Style URL
  center: listing.geocordinate.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker1 = new mapboxgl.Marker({color: "red"})
.setLngLat(listing.geocordinate.coordinates) //listing.geometry.coordinate
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
    `<h4>${listing.title}</h4><p>Exact location will be after booking</p>`
  ))
.addTo(map);