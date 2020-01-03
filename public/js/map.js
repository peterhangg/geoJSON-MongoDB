mapboxgl.accessToken =
  "pk.eyJ1IjoicGV0ZXJoYW5nIiwiYSI6ImNrNHhpdDl1MTAxZGszbXMzNTM4NnFneXoifQ.6AFPXBHLk9CuTCXViqvQLw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-71.157895, 42.707741]
});

// Fetch store from API
const getStores = async () => {
  // fetching all stores from database
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  
  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
const loadMap = (stores) => {
  map.on("load", function() {
    // mapbox gl js 'add a icon to map'
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      // more layout options can be found in mapbox doc
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
};

getStores();