/**
 * Simulates a moving driver by generating a real driving route using the
 * Google Maps Directions API, decoding the route into GPS coordinates,
 * and sending location updates every second to a local backend API.
 */

const axios = require("axios");
const polyline = require("@mapbox/polyline"); // npm install @mapbox/polyline

async function generateRoute() {
  const origin = "13.953428,-60.927178";
  const destination = "14.009459,-60.992526";
  const waypoints = [
    "13.936703,-60.915417",
    "13.92782,-60.943595",
    "13.95497,-60.97655",
    "13.984785,-60.997685",
  ].join("|");

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}
  &waypoints=${waypoints}&mode=driving&key=AIzaSyAHOCnme4wpOcNI0Aso5l6jd8P5y3Bw9wE`;

  const res = await axios.get(url);
  const points = polyline.decode(res.data.routes[0].overview_polyline.points);

  // Convert to objects { lat, lng }
  return points.map(([lat, lng]) => ({ lat, lng }));
}

async function startSimulator() {
  const smoothRoute = await generateRoute();
  let index = 0;

  setInterval(() => {
    const point = smoothRoute[index];

    axios
      .post("http://localhost:3000/api/drivers/update-location", {
        driver_id: "DRV001",
        lat: point.lat,
        lng: point.lng,
      })
      .then(() => {
        console.log(`Sent location: ${point.lat}, ${point.lng}`);
      })
      .catch(console.error);

    index++;
    if (index >= smoothRoute.length) index = 0; // loop
  }, 1000); // 1 update per sec
}

startSimulator();
