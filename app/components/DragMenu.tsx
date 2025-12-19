import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/Ionicons";
import { Driver, getAllDrivers } from '../libraries/DriverService';
import { Route, getAllRoutes, getRouteByRouteId } from '../libraries/RouteService';
import CustomButton from './CustomButton';

const Stack = createNativeStackNavigator();

const stopsWithETA = [
  { id: "stop-1", title: "Stop 1", eta: "5 mins" },
  { id: "stop-2", title: "Stop 2", eta: "12 mins" },
  { id: "stop-3", title: "Stop 3", eta: "18 mins" },
  { id: "stop-4", title: "Stop 4", eta: "25 mins" },
  { id: "stop-5", title: "Stop 5", eta: "30 mins" },
  { id: "stop-6", title: "Stop 6", eta: "35 mins" },
  
];


// Props type definition (currently unused but available for future expansion)
type DragMenuProps = {
  //title: string; 
  //children: React.ReactNode;
}

export default function DragMenu() {
  // State for drivers data
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // State for routes data
  const [routes, setRoutes] = useState<Route[]>([]);

  // State for currently selected route
  const [route, setRoute] = useState<Route | null>(null);

  // Fetch all drivers on component mount
  useEffect(() => {
    getAllDrivers()
      .then(setDrivers)
      .catch(console.error);
  }, []);

  // Fetch all routes on component mount
  useEffect(() => {
    getAllRoutes()
      .then(setRoutes)
      .catch(console.error);
  }, []);

  // Fetch default route (R001) on component mount
  useEffect(() => {
    getRouteByRouteId("R001")
      .then(setRoute)
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Snappoints
  let index = 0;
  const snapPoints = React.useMemo(() => ['20%', '85%'], []);





  const snapPoints2 = React.useMemo(() => ['15%','90%'], []);
  
  // Reffor bottom sheet

  const bottomSheetRef = React.useRef<BottomSheet>(null);



  const bottomSheetRef2 = React.useRef<BottomSheet>(null);
  
  // Sheet change handlers
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  
  const handleSheetChanges2 = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Current view state ('home' or 'detail')
  const [stage, setStage] = React.useState("home");
  
  // Navigate back to home view
  const goToHome = async() => {
    bottomSheetRef.current?.snapToIndex(1);
    setStage('home');
  }

  // Handle keyboard show/hide events
  React.useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      bottomSheetRef.current?.snapToPosition(0);
      bottomSheetRef2.current?.snapToPosition(0);
    });
  
    return () => {
      keyboardListener.remove();
    };
  }, []);

  React.useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      bottomSheetRef.current?.snapToIndex(0);
      bottomSheetRef2.current?.snapToIndex(0);
    });

    return () => {
      keyboardListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HOME VIEW - Shows list of available routes */}
      {stage == "home" && (
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          index={0}
          backgroundStyle={{backgroundColor:'#00BCFF'}}
          handleIndicatorStyle={{backgroundColor: '#545454', padding:1}}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View>
              <Text style={styles.bottomSheetTitle}>Available Routes</Text>
            </View>
            
            {/* Render all routes as buttons from database */}
            {routes.map((r) => (
              <CustomButton
                key={r.route_id}
                title={r.name ?? "Unnamed Route"}
                onPress={() => {
                  setRoute(r);
                  setStage("detail");
                }}
              />
            ))}
          </BottomSheetView>
        </BottomSheet>
      )}

      {/* DETAIL VIEW - Shows specific route information */}
      {stage == "detail" && (
        <BottomSheet
          ref={bottomSheetRef2}
          onChange={handleSheetChanges2}
          snapPoints={snapPoints2}
          index={1}
          backgroundStyle={{backgroundColor:'#00BCFF'}}
          handleIndicatorStyle={{backgroundColor: '#545454', padding:1}}
        >
  
          <View style={{ flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, borderColor:'grey', borderBottomWidth:.5 }}> 
            <TouchableOpacity
              onPress={goToHome}
              style={styles.buttonConfig}
            >
              <Icon name="arrow-back" size={30} color="grey" />
            </TouchableOpacity>
          </View>

        
          <BottomSheetScrollView style={styles.contentContainer2}>
            <View style={styles.yellow}>
       
              <View style={styles.container2}> 
                <Text style={styles.bottomSheetText2}>{route?.name}</Text>
              </View>
              
              {/* Route details section */}
              <View style={styles.container3}>
                {/* Fare information */}
                <View style={styles.details}>
                  <Icon name="bus" size={46} color="" style={{paddingRight:10}} />
                  <View> 
                    <Text style={styles.detailsText1}>$5.00</Text>
                    <Text style={styles.detailsText2}>Price of trip</Text>
                  </View>
                </View>
                
                {/* Location pricing */}
                <View style={styles.details}>
                  <Icon name="logo-usd" size={46} color="" style={{paddingRight:10}} />
                  <View> 
                    <Text style={styles.detailsText1}>$5.00</Text>
                    <Text style={styles.detailsText2}>Price from current location</Text>
                  </View>
                </View>
                
               {/* Arrival of next bus*/}
                <View style={styles.details}>
                  <Icon name="pin" size={46} color="" style={{paddingRight:10}} />
                  <View> 
                    <Text style={styles.detailsText1}>5 mins</Text>
                    <Text style={styles.detailsText2}>Arrival of next bus</Text>
                  </View>
                </View>
                   
              {/* Estimated arrival times */}
<View style={styles.details}>
  <Icon name="time" size={46} color="black" style={{ paddingRight: 10 }} />
  <View>
    {stopsWithETA.map((stop) => (
      <Text key={stop.id} style={styles.detailsText2}>
        Arrival to  {stop.title} – {stop.eta}
      </Text>
    ))}
  </View>
</View>


                
                
                {/* Drivers list */}
                <View>
                  <Text style={styles.driverText1}>Drivers</Text>
                  
                  {drivers.map((driver) => (
                    <View key={driver.driver_id} style={styles.driverDetails}>
                      <Text style={styles.driverText3}>ID: {driver.driver_id}</Text>
                      
                      <View>
                        <Text style={styles.driverText2}>Plate Number: {driver.number_plate}</Text>
                        <Text style={styles.driverText2}>Number: {driver.contact_number}</Text>
                      </View>
                      
                      <View style={styles.statusIndicator}>
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor: driver.work_status === 'active' ? 'green' : 'red',
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  bottomSheetText: {
    fontSize: 22,
  },
  bottomSheetText2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontFamily: 'monospace',
    marginBottom: 40,
  },
  buttonConfig: {
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: 'grey',
  },
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    alignContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  contentContainer2: {
    flexGrow: 1,
    padding: 36,
  },
  details: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 30,
    marginBottom: 10,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  detailsText1: {
    fontSize: 22,
  },
  detailsText2: {
    fontSize: 16,
  },
  driverDetails: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 30,
    marginBottom: 10,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  driverText1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 130,
    marginBottom: 10, 
  },
  driverText2: {
    fontSize: 16,
  },
  driverText3: {
    fontSize: 18,
    fontWeight:'bold',
  },
  statusIndicator: {
    marginLeft:20,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  yellow: {
    backgroundColor: '#FAFA73',
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  driverCard: {
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});