import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from "react-native-vector-icons/Ionicons";

type BottomSheet_2Props = {

  //title: string; 
  //children: React.ReactNode;
}

export default function BottomSheet_2() {

  const snapPoints = React.useMemo(() => ['15%', '90%', ], []);

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
   
  return (
  <View style={styles.container}>
   <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={0}
        backgroundStyle={{backgroundColor:'#00BCFF'}}
        handleIndicatorStyle={{backgroundColor: '#545454', padding:1}}
        >
                   
      <BottomSheetView style={styles.contentContainer}>
            <View style={styles.yellow} >

                <View style={styles.container2}> 
                <Text style={styles.bottomSheetText}> Dennery To Castries </Text>
              </View>
              
               <View style={styles.container3}>
               <View style={styles.details}>
                <Icon name="bus" size={46} color="" style={{paddingRight:10}} />
                <View > 
                <Text style={styles.detailsText1}> $7.00 </Text>
                <Text style={styles.detailsText2}> Price of trip </Text>
                  </View>
               </View>

               
               
               <View style={styles.details}>
                <Icon name="bus" size={46} color="" style={{paddingRight:10}} />
                <View > 

                <Text style={styles.detailsText1}> $5.00 </Text>
                <Text style={styles.detailsText2}> Price from current location </Text>
                  </View>
               </View>

               

               <View style={styles.details}>
                <Icon name="time" size={46} color="" style={{paddingRight:10}} />
                <View > 
                
                <Text style={styles.detailsText1}> 10 mins </Text>
                <Text style={styles.detailsText2}> Estimated arrival time </Text>
                  </View>
               </View>


              <View style={styles.details}>
                <Icon name="pin" size={46} color="" style={{paddingRight:10}} />
                <View > 
                <Text style={styles.detailsText1}> 300ft </Text>
                <Text style={styles.detailsText2}> Nearest Bus </Text>
                  </View>
               </View>

               </View>

                </View>
      </BottomSheetView>
            
    </BottomSheet>
   </View>
  );
}

const styles = StyleSheet.create({

  bottomSheetText:{

    fontSize: 26,
    marginBottom:25,
  
    },

  container: {
   flex: 1 ,

  },
  container2:{
   flexDirection:'row',
   justifyContent:'center',

  },

  container3:{
   
    flex:1,
    alignContent:'center',
    
  },

  contentContainer: {
    flex: 1,
    padding:36,
  },
  
  details: {
  flexDirection:'row',
  margin:10,
  marginLeft:30,
  marginBottom:10,
  borderBottomColor: '#808080',
  borderBottomWidth:1,
  paddingBottom:10,

  },
  
  detailsText1: {
   fontSize:22,
  },
   
  detailsText2: {
    fontSize:16,
   },
  yellow: {
  flex:1,
  backgroundColor: '#FAFA73',
  width:'100%',
  
 
  
  
  },
  
 
});
