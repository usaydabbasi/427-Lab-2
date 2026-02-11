// Mapbox token
mapboxgl.accessToken = "pk.eyJ1IjoidXNheWRhYmJhc2kiLCJhIjoiY21saGI2OXdmMDd0cDNncHNrNHJlaTUzNyJ9.QMCUc67ZJaEqL_gwaX-bvA";

// Creates map
const map = new mapboxgl.Map({
  container: "map",
style: "mapbox://styles/mapbox/streets-v12",

  center: [-79.65, 43.59],
  zoom: 11
});

// Zoom buttons
map.addControl(new mapboxgl.NavigationControl());

// Add GeoJSON layers when map loads
map.on("load", () => {

  // Adds library layer to map using GeoJSON source and circle styling
  map.addSource("libraries-src", {
    type: "geojson",
    data: "data/libraries.geojson"
  });

  map.addLayer({
    id: "libraries-layer",
    type: "circle",
    source: "libraries-src",
    paint: {
      "circle-radius": 6,
      "circle-color": "#1e66ff",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff"
    }
  });

  // Adds park layer to map using GeoJSON source and circle styling
  map.addSource("parks-src", {
    type: "geojson",
    data: "data/parks.geojson"
  });

  map.addLayer({
    id: "parks-layer",
    type: "circle",
    source: "parks-src",
    paint: {
      "circle-radius": 5,
      "circle-color": "#22aa44",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff"
    }
  });

});
// Library popups
map.on('click', 'libraries-layer', (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const props = e.features[0].properties;

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML("<b>Library</b>")
    .addTo(map);
});

// Park popups
map.on('click', 'parks-layer', (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const props = e.features[0].properties;

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML("<b>Park</b>")
    .addTo(map);
});

// Changes cursor to pointer on hover
map.on('mouseenter', 'libraries-layer', () => {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'libraries-layer', () => {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'parks-layer', () => {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'parks-layer', () => {
  map.getCanvas().style.cursor = '';
});
