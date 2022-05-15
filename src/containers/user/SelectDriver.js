import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,Button,TouchableOpacity,ScrollView,Modal} from "react-native"
import firebase from "firebase"
import {getDistance,getCompassDirection} from "geolib";



const SelectDriver=({route})=>{

    const [driverData,setDriverData]=useState({})
    const [driverLoc,setDriverLoc]=useState([])


    const info=route.params;
    const pickupLongitude=info.pickupLongitude
    const pickupLatitude=info.pickupLatitude
    const dropLongitude=info.dropLongitude
    const dropLatitude=info.dropLatitude

    let driverLat=Object.keys(driverData).map(name =>(driverData[name].latitude));
    let driverLong=Object.keys(driverData).map(name =>(driverData[name].longitude));

    var totalDis = getDistance(
        { latitude: driverLat, longitude:driverLong },
        { latitude: pickupLatitude, longitude: pickupLongitude}
      );
     var distance=`Distance ${totalDis / 1000} KM`;
      console.log(distance,"Distance bw user and -----");

    

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
       var distance=`Distance ${dis / 1000} KM`;
        console.log(distance,"Distanceeeeeeeeee");

        
    return(
        <View style={{flex:1}}>
            {driverKey.map(values=>{
                return(
                <View style={{marginTop:300}}>
                <Text style={{color:"black"}}>
                    {driverData[values].name}
                </Text>
                <Text style={{color:"black"}}>
                    {totalDis}KM away
                </Text>
            </View>
            )})}
            
        </View>
    )

}

export default SelectDriver