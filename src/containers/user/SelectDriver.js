import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,Button,TouchableOpacity,ScrollView,Modal} from "react-native"
import firebase from "firebase"
import {getDistance,getCompassDirection} from "geolib";



const SelectDriver=({route,navigation})=>{

    const [driverData,setDriverData]=useState({})
    const [driverLoc,setDriverLoc]=useState([])


    const info=route.params;
    const pickupLongitude=info.pickupLongitude
    const pickupLatitude=info.pickupLatitude
    const dropLongitude=info.dropLongitude
    const dropLatitude=info.dropLatitude

    let driverLat=Object.keys(driverData).map(name =>(driverData[name].latitude));
    let driverLong=Object.keys(driverData).map(name =>(driverData[name].longitude));
    let driverName=Object.keys(driverData).map(name =>(driverData[name].name));
    let driverId=Object.keys(driverData).map(name =>(driverData[name].id));

    var totalDis = getDistance(
        { latitude: driverLat, longitude:driverLong },
        { latitude: pickupLatitude, longitude: pickupLongitude}
      );
     var distancebwUD=totalDis / 1000;
      // console.log(distance,"Distance bw user and -----");

    

    useEffect(()=>{
        availabaleDrivers()
      },[])


    const availabaleDrivers=()=>{
        firebase.database().ref("All Drivers")
        .on("value",snapshot=>{
        //   console.log(snapshot,"Available drivers.........");
          let data=snapshot.val()?snapshot.val():{}
          setDriverData(data)
        })
      }
    //   console.log(driverData,"Driver Data");

    let driverKey=Object.keys(driverData)
    // console.log(driverKey,"Keysss ");
       var dis = getDistance(
          { latitude: pickupLatitude, longitude:pickupLongitude },
          { latitude: dropLatitude, longitude: dropLongitude}
        );
       var distance=dis / 1000;
        // console.log(distance,"Distanceeeeeeeeee");

        
    return(
        <View style={{flex:1}}>
            {driverKey.map(values=>{
                return(
                <View style={{marginTop:300}}>
                <Text style={{color:"black"}}>
                    {driverData[values].name}
                </Text>
                <Text style={{color:"black"}}>
                    {distancebwUD}
                </Text>
            </View>
            )})}
            <Button
            title="Continue"
            onPress={()=>navigation.navigate("ConfirmRide",{
              pickupLongitude,
             pickupLatitude,
             dropLongitude,
             dropLatitude,
             driverLat,
             driverLong,
             driverName,
             driverId,
             distance,
             distancebwUD
            })}
            ></Button>
            
        </View>
    )

}

export default SelectDriver