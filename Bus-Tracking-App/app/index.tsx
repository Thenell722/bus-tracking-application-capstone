import SearchBar from "@/components/SearchBar";
import polyline from "@mapbox/polyline"; // ⬅️ decoder for Google polyline
import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native"; // ⚡ Added Animated
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { AnimatedRegion, Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"; // ⚡ Added AnimatedRegion
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Driver, getAllDrivers } from "../libraries/DriverService";
import DragMenu from "@/components/DragMenu";


const SIMULATED_USER_LOCATION = {
  latitude: 13.934306643469037, 
  longitude: -60.934880657006254,
};

const [userLocation, setUserLocation] = useState(SIMULATED_USER_LOCATION);


const stops = [
  { latitude: 13.953428, longitude: -60.927178, title: "Stop 1 (Main)" },
  { latitude: 13.936703, longitude: -60.915417, title: "Stop 2" },
  { latitude: 13.92782, longitude: -60.943595, title: "Stop 3" },
  { latitude: 13.95497, longitude: -60.97655, title: "Stop 4" },
  { latitude: 13.984785, longitude: -60.997685, title: "Stop 5" },
  { latitude: 14.009459, longitude: -60.992526, title: "Stop 6 (Final)" },
];

/**
 * Main Map Screen Component
 * Displays an interactive map with bus markers and search functionality
 */
interface State {
  search: string;
}

export default function Index() {

 
  // State for drivers data
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routePoints, setRoutePoints] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  // Animated bus position
  const [busPosition] = useState(
    new AnimatedRegion({
      latitude: 13.953428,
      longitude: -60.927178,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  );
//finding the nearset bus to the user 
const [nearestBus, setNearestBus] = useState<{
  distance: string;
  duration: string;
  bus: Driver | null;
}>({
  distance: '',
  duration: '',
  bus: null
});

  useEffect(() => {
    // Initial fetch for driver locations
    getAllDrivers().then(setDrivers).catch(console.error);

    // Polling every 5 seconds
    const interval = setInterval(() => {
      getAllDrivers().then(setDrivers).catch(console.error);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Fetch bus route from Google Directions API
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const origin = "13.953428,-60.927178";
        const destination = "14.009459,-60.992526";
        const waypoints = [
          "13.936703,-60.915417",
          "13.92782,-60.943595",
          "13.95497,-60.97655",
          "13.984785,-60.997685",
        ].join("|");

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}
          &mode=driving&key=AIzaSyAHOCnme4wpOcNI0Aso5l6jd8P5y3Bw9wE`
        );

        const json = await response.json();

        if (json.routes.length) {
          const points = polyline.decode(json.routes[0].overview_polyline.points);
          const coords = points.map(([lat, lng]) => ({
            latitude: lat,
            longitude: lng,
          }));
          setRoutePoints(coords);
        } else {
          console.warn("No routes found");
        }
      } catch (err) {
        console.error("Error fetching directions:", err);
      }
    };

    fetchRoute();
  }, []);

  // Animate bus along polyline
  useEffect(() => {
    if (routePoints.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < routePoints.length) {
        const nextCoord = routePoints[index];
        busPosition.timing({
          latitude: nextCoord.latitude,
          longitude: nextCoord.longitude,
          duration: 100000, // adjust speed here
          useNativeDriver: false,
        }).start();
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [routePoints]);

  // Component state for search functionality
  const [state, setState] = useState<State>({ search: "" });
  const { search } = state;

  const DEFAULT_REGION = {
    latitude: 14.005,
    longitude: -60.990,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const STOPS = [
    { id: "stop-0", latitude: 13.953428, longitude: -60.927178, title: "Main Stop" },
    { id: "stop-1", latitude: 13.936703, longitude: -60.915417, title: "Stop 1" },
    { id: "stop-2", latitude: 13.92782, longitude: -60.943595, title: "Stop 2" },
    { id: "stop-3", latitude: 13.95497, longitude: -60.97655, title: "Stop 3" },
    { id: "stop-4", latitude: 13.984785, longitude: -60.997685, title: "Stop 4" },
    { id: "stop-5", latitude: 14.009459, longitude: -60.992526, title: "Final Stop" },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapBackground}
            initialRegion={DEFAULT_REGION}
            showsUserLocation={true}
          >
            {/* Polyline from Google Directions */}
            {routePoints.length > 0 && (
              <Polyline
                coordinates={routePoints}
                strokeColor="#05D8F2"
                strokeWidth={5}
                zIndex={1}
              />
            )}

            {/* Stops Markers */}
            {STOPS.map((stop) => (
              <Marker
                key={stop.id}
                coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
                title={stop.title}
                pinColor="green"
              >

               <Image
                source={require("@/assets/images/bus_stop.png")}
                style={styles.busMarker}
                resizeMode="contain"
              />
                </Marker>
            ))}

            {/* Animated Bus Marker */}
            <Marker.Animated
              coordinate={busPosition}
              title="Bus"
            >
              <Image
                source={require("@/assets/images/bus_marker.png")}
                style={styles.busMarker}
                resizeMode="contain"
              />
            </Marker.Animated>

            <Marker
            coordinate={userLocation}
           title="You"
           pinColor="blue" 
           />


            // Replace your current drivers.map(...) block
{drivers.map((bus) => {
  const coords = bus.current_location?.coordinates;
  if (!coords || coords.length !== 2) return null;

  const [lng, lat] = coords; // GeoJSON order is usually [lng, lat]

  busPosition.timing({
    latitude: lat,
    longitude: lng,
    duration: 1000, // smooth transition
    useNativeDriver: false,
  }).start();

  return null; // don't render extra markers
})}
          </MapView>

          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.searchBar}>
            <SearchBar />
          </View>

          {/* Drag Menu */} 

            
          <View style={styles.drag}> 
          <DragMenu /> 
          </View>
                     
           


        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapBackground: { ...StyleSheet.absoluteFillObject },
  searchBar: { paddingTop: 35 },
  busMarker: { width: 40, height: 40 },
  drag: { position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", pointerEvents: "box-none" },
  image: { flex: 1, justifyContent: "center" },
});
 