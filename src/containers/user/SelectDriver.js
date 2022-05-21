import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,Button,TouchableOpacity,ScrollView,Modal,Image} from "react-native"
import firebase from "firebase"
import {getDistance,getCompassDirection} from "geolib";
import { Header } from "../../components";
import { headerbackground, headerfont, headerfontcolor } from "../../constants";
import { logIfNoNativeHook } from "react-native/Libraries/Utilities/RCTLog";



const SelectDriver=({route,navigation})=>{

    const [driverData,setDriverData]=useState({})
    const [driverLoc,setDriverLoc]=useState({})


    const info=route.params;
    const pickupLongitude=info.pickupLongitude
    const pickupLatitude=info.pickupLatitude
    const dropLongitude=info.dropLongitude
    const dropLatitude=info.dropLatitude
    const locationName=info.nameLocation
    const address=info.address
    const name=info.userName
    const dropLocation=info.dropLocation
    const dropLocationAddress=info.dropLocationAddress
    const ridekey=info.ridekey
    


     let driverLat=Object.keys(driverData).map(name =>(driverData[name].latitude));
    let driverLong=Object.keys(driverData).map(name =>(driverData[name].longitude));


    var totalDis = getDistance(
         { latitude: driverLat, longitude:driverLong },
         { latitude: pickupLatitude, longitude: pickupLongitude}
      );
     var distancebwUD=totalDis / 1000;
    
console.log(driverLoc,"Driver Location");
    useEffect(()=>{
        availabaleDrivers()
      },[])


    const availabaleDrivers=()=>{
        firebase.database().ref("All Drivers")
        .on("value",snapshot=>{
          let data=snapshot.val()?snapshot.val():{}
          setDriverData(data)
        })
      }

    let driverKey=Object.keys(driverData)
       var dis = getDistance(
          { latitude: pickupLatitude, longitude:pickupLongitude },
          { latitude: dropLatitude, longitude: dropLongitude}
        );
       var distance=dis / 1000;

    return(
        <View style={{flex:1}}>
      <Header heading="Select Your nearby driver" color={headerbackground}/>
            {driverKey.length > 0 ? driverKey.map(values=>{
              const driverLatitude=driverData[values].latitude;
              const driverLongitude=driverData[values].longitude;
              const driverName=driverData[values].name;
              const driverId=driverData[values].id;
              const driverImage=driverData[values].image;
              console.log(driverImage,"image");
               return(
                  <View style={{flex:1}}>
                <View style={{marginVertical:30,borderWidth:2,borderRadius:10,marginHorizontal:10,backgroundColor:headerbackground,borderColor:headerbackground,elevation:10}}>
                  <TouchableOpacity onPress={()=>navigation.navigate("ConfirmRide",{
              pickupLongitude,
             pickupLatitude,
             dropLongitude,
             dropLatitude,
             driverLatitude,
             driverLongitude,
             driverName,
             driverId,
             distance,
             distancebwUD,
             locationName,
             address,
             dropLocation,
             dropLocationAddress,
             name,
             ridekey,
            })}>
              <Image source={{uri:driverImage}} style={{height:70,width:70,borderRadius:50,marginVertical:5,marginHorizontal:5}}/>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont}}>
                    {"Name : " +  driverData[values].name}
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10}}>
                    {distancebwUD + " km away"}
                </Text>
                </TouchableOpacity>
            </View>
            </View>
            )}):
            <View style={{marginVertical:300,marginHorizontal:120}}>
              <Text>No Drivers Available</Text>
            </View>
            }
            
        </View>
    )

}

export default SelectDriver