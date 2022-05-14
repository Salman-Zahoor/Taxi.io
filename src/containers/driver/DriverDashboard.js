import React,{useEffect,useState} from "react"
import {View,Text,TouchableOpacity}from "react-native"
import firebase from "firebase"
import * as Location from 'expo-location';


const DriverDashboard=()=>{

    const [driverLocation,setDriverLocation]=useState({})
    const logout = () =>{
            firebase.auth().signOut()
    }



    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
           
          }
          // let currentLocation = await Location.getCurrentPositionAsync({});
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        // timeInterval: 100,
        distanceInterval: 2
      }, (currentLocation) => {
        const { coords: { longitude, latitude } } = currentLocation
        setDriverLocation(currentLocation)
        })
        })();
      }, []);

      useEffect(async()=>{
        await DriverLocation();
        await chala()
      },[])
      console.log(driverLocation,"CurrentLocation=====>")

const DriverLocation=async()=>{
    let id=firebase.auth().currentUser.uid
   await firebase.database().ref(`All Drivers/${id}`)
    .set({
        id:id,
        longitude:driverLocation.coords.longitude,
        latitude:driverLocation.coords.latitude,
    })
    .then((res) => {
        alert("successfully loged in")
}).catch((err) => {
    // console.log(err, "ERRRRRRRRRRR");
})
}

const chala=()=>{
    alert("Chal gaya")
}
      
    return(
        <View style={{marginTop:200}}>
            <Text>
                {/* {driverLocation.coords.latitude} */}
                <TouchableOpacity onPress={logout} >
                    <Text>LogOut</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={DriverLocation} style={{marginTop:400}}>
                    <Text>IIDIDIDI</Text>
                </TouchableOpacity> */}
            </Text>
        </View>
    )
}

export default DriverDashboard