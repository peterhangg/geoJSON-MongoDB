mapboxgl.accessToken =
  "pk.eyJ1IjoicGV0ZXJoYW5nIiwiYSI6ImNrNHhpdDl1MTAxZGszbXMzNTM4NnFneXoifQ.6AFPXBHLk9CuTCXViqvQLw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-71.157895, 42.707741]
});

// mapbox gl js 'add a icon to map'
const loadMap = () => {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-71.157895, 42.707741]
              },
              properties: {
                storeId: "0001",
                icon: "shop"
              }
            }
          ]
        }
      },
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

loadMap();