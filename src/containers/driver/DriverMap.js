import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Modal,Alert} from "react-native"
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header,Button } from "../../components";
import { headerbackground } from "../../constants";
import firebase from "firebase";
import { render } from "react-dom";
import { NavigationContainer } from "@react-navigation/native";

const DriverMap=({route,navigation})=>{

    const {
        driverLatitude,
        driverLongitude,
        pickupLatitude,
        pickupLongitude,
        dropLatitude,
        dropLongitude,
        AllData,
        Fair,
    }=route.params

// console.log(Fair,"data");
   
    const [location, setLocation] = useState({
        latitude:pickupLatitude,
        longitude: pickupLongitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })

      const [isClick,setIsClick]=useState(false);
      console.log(isClick,"ISCLICKKKKK");

      const [driverLocation, setDriverLocation] = useState({
        latitude:driverLatitude,
        longitude: driverLongitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })

      const [droplocation, setDroplocation] = useState({
        latitude:dropLatitude,
        longitude:dropLongitude,
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
            Fair + "Rs",
            [
              {
                text: "OK",
                onPress: () => {rideCompleted()},
                style: "cancel"
              },
             
            ]
          );
    }

    const renderButton=()=>{
        if(isClick===true){
            return(          
      <Button heading="Ride Completed"  color={headerbackground} onPress={()=>myAleart() + setIsClick(true)}/>
            )
        }
        else(isClick===false)
        {
            return(
                
      <Button heading="Start" onPress={()=>ReachedPickup() + setIsClick(true)} color={headerbackground}/>
            )
        }
    }

    let key=AllData

    const ReachedPickup=()=>{  
        firebase.database().ref(`AllRides/${key}`).update(
            {isCompleted:"reachedLocation",       
        }
        )
     .then(response=>{
     console.log(response,"Response");
     })
     .catch(err=>{
     console.log(err.messege,"Error");
     })
 }




 const rideCompleted=()=>{
    firebase.database().ref(`AllRides/${key}`).update(
        {isCompleted:"completed",
        isAccepted:"completed",
    }).then(response=>
        {
     navigation.navigate("DriverDashboard");
     setIsClick(false);
 }).catch(err=>{
 console.log(err,"Error");
 })
}

    return(
        <View style={{flex:1}}>
             <Header heading="Map"/>
        <MapView
        style={styles.map}
        region={location}
      >
        <Marker 
          coordinate={location}
          title={'Pickup Location'}
        description={'Pickup Location'}
        />

        <Marker 
          coordinate={droplocation}
          title={'Drop Location'}
        description={'Drop Location!'}
        />

        
        <Marker 
          coordinate={driverLocation}
          title={'Driver Location'}
        description={'Driver Location!'}
        />
      </MapView>
     
       {renderButton()}
      </View>
    )
    }
    const styles = StyleSheet.create({
        map: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.85,
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
    
export default DriverMap;