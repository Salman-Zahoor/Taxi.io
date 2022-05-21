import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Modal,Alert} from "react-native"
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header,Button } from "../../components";
import { headerbackground } from "../../constants";
import firebase from "firebase";

const map=({route,navigation})=>{

    const [rides,setRides]=useState({})
    useEffect(()=>{
        RideInfo()
    },[])
    const {
        driverLatitude,
        driverLongitude,
        pickupLatitude,
        pickupLongitude,
        dropLatitude,
        dropLongitude,
        key,
    }=route.params

    console.log(key,"new  my keyyy");



    
    const RideInfo=()=>{
        firebase.database().ref(`AllRides/${key}`)
        .on("value",snapshot=>{
                let data=snapshot.val()?snapshot.val():{}
                setRides(data)  
        })
    }
console.log(rides,"filtered Information");





    const [location, setLocation] = useState({
        latitude: pickupLatitude,
        longitude: pickupLongitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
      const [driverLocation, setDriverLocation] = useState({
        latitude: driverLatitude,
        longitude: driverLongitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
      const [droplocation, setDroplocation] = useState({
        latitude:dropLatitude,
        longitude: dropLongitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })

      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
        }
        )
    })


    const myAleart=()=>{
        Alert.alert(
            "Total Fair",
            rides.Charges + "Rs",
            [
              {
                text: "OK",
                onPress: () => {navigation.navigate("Dashboard")},
                style: "cancel"
              },
             
            ]
          )
    }



    const popUp=()=>{
      alert("Driver Reached at your pickup locatio")
    }

    if(rides.isCompleted=="completed"){
        return(
          <View style={{flex:1}}>
          <Header heading="Map"/>
     <MapView
     style={styles.map}
     region={location}
   >
     <Marker 
       coordinate={location}
       title={'Pick up'}
     description={'Pick up!'}
     />
  
     <Marker 
       coordinate={driverLocation}
       title={'Driver location'}
     description={'Driver Location!'}
     />
  
     <Marker 
       coordinate={droplocation}
       title={'Drop location'}
     description={'Drop Location!'}
     />
  
   </MapView>
   {myAleart()}
   </View>
        )
    }
    else if(rides.isCompleted=="reachedLocation" && rides.isAccepted=="accepted")
    {
      return(
        <View style={{flex:1}}>
        <Header heading="Map"/>
   <MapView
   style={styles.map}
   region={location}
 >
   <Marker 
     coordinate={location}
     title={'Pick up'}
   description={'Pick up!'}
   />

   <Marker 
     coordinate={driverLocation}
     title={'Driver location'}
   description={'Driver Location!'}
   />

   <Marker 
     coordinate={droplocation}
     title={'Drop location'}
   description={'Drop Location!'}
   />

 </MapView>
 {popUp()}
 </View>
      )
    }

    else
    {
    return(
        <View style={{flex:1}}>
             <Header heading="Map"/>
        <MapView
        style={styles.map}
        region={location}
      >
        <Marker 
          coordinate={location}
          title={'Pick up'}
        description={'Pick up!'}
        />

        <Marker 
          coordinate={driverLocation}
          title={'Driver location'}
        description={'Driver Location!'}
        />

        <Marker 
          coordinate={droplocation}
          title={'Drop location'}
        description={'Drop Location!'}
        />

      </MapView>
      </View>
    )
    }
    }
    const styles = StyleSheet.create({
        map: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 1,
        },
        autocompleteContainer: {
            flex: 1,
            left: 0,
            position: 'absolute',
            backgroundColor: 'white',
            right: 0,
            top: 0,
            zIndex: 1
          },
          autocompleteItem: {
            height: 80,
            borderBottomWidth: 2,
            borderBottomColor: 'gray',
            justifyContent: 'center',
            paddingHorizontal: 10
          },
          autocompleteText: {
            fontSize: 18
          }
      });
    
export default map;