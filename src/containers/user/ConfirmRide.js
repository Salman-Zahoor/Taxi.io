import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Modal,Alert} from "react-native"
import firebase from "firebase"
import {getDistance,getCompassDirection} from "geolib";
import { Button, Header} from "../../components";
import { headerbackground, headerfont, headerfontcolor } from "../../constants";
import { render } from "react-dom";



const CconfirmRide=({route,navigation})=>{

    useEffect(()=>{
        {userDetails()}
    },[])


const [key,setKey]=useState()
 
 const randomKey= Math.floor(Math.random() * 1000000000000000);

 useEffect(()=>{
    setKey(randomKey)
 },[])


console.log(key,"State key");
    const[rides,setRides]=useState({})
    const [newRec,setNewRec]=useState({})
    const[myDetail,setMyDetail]=useState({})
    const driverLatitude=route.params.driverLatitude;
    const driverId=route.params.driverId;
    const driverName=route.params.driverName;
    const driverLongitude=route.params.driverLongitude;
    const Pickup=route.params.locationName;
    const PickupAddress=route.params.address;
    const {dropLatitude,dropLongitude,pickupLatitude,pickupLongitude,distance, distancebwUD,dropLocation
        ,dropLocationAddress,name,locationName,address,ridekey
    }=route.params
    const Charges=distance*100;
   
console.log(dropLocationAddress,"Address");
    
    console.log(driverName,"Latiiii");
console.log(distance,"disss");


    console.log(driverLongitude,"Longiiii");
    const userDetails=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`)
        .on("value",snapshot=>{
            let data=snapshot.val()?snapshot.val():{}
            setMyDetail(data)
        })
    }
console.log(rides,"rides");
    const RideConfirm=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`AllRides/${key}`)
        .set({
            driverId,
            driverName,
            driverLatitude,
            driverLongitude,
            dropLatitude,
            dropLongitude,
            pickupLatitude,
            pickupLongitude,
            distance,
            distancebwUD,
            Charges,
            username:myDetail.name,
            userId:myDetail.uuid,
            isAccepted:"pending",
            name,
            pickupPlace:locationName,
            pickupAddress:address,
            dropPlace:dropLocation,
            dropAddress:dropLocationAddress,
            key,
        })
        .then(response =>{
           alert("successed");
        })
        .catch(eror =>{
            console.log(eror,"EERRREERRR");
        })
    }

    useEffect(()=>{
        {RideInfo()}
    },[])

    const reDirect=()=>{   
     navigation.navigate("map",{
                driverLatitude,
                driverLongitude,
                pickupLatitude,
                pickupLongitude,
                dropLatitude,
                dropLongitude,
                key,
            })
    }


    const reDirectToDriver=()=>{  
        firebase.database().ref(`AllRides/${key}`).update({
            isAccepted:"pending",
        }).then(res=>{
         navigation.navigate("SelectDriver",{
            dropLatitude,dropLongitude,pickupLatitude,pickupLongitude,distance, dropLocation
            ,dropLocationAddress,name,locationName,address,ridekey:key,
               })
        }) 
       
       }

    const AcceptedAleart=()=>{
        Alert.alert(
            "Accepted",
            "Your Ride has been confirmed please wait a while for driver",
            [
              {
                text: "OK",
                onPress: () => {reDirect()},
                style: "cancel"
              },
             
            ]
          )
    }

    const RejectAleart=()=>{
        Alert.alert(
            "Rejected",
            "Your Ride has been rejected please select another driver",
            [
              {
                text: "OK",
                onPress: () => {reDirectToDriver()},
                style: "cancel"
              },
             
            ]
          )
    }
    

    

    const id=firebase.auth().currentUser.uid

    const RideInfo=()=>{
        firebase.database().ref(`AllRides`)
        .on("value",snapshot=>{
        snapshot.forEach(element => {
                let data=element.val()?element.val():{}
                setRides(data)
            });
        })
    }


     if(rides.isAccepted=="accepted" && key==rides.key)
    {
        return(

            <View>
                {AcceptedAleart()}
            </View>
           
        )
    }
   else if(rides.isAccepted=="rejected" && key==rides.key)
    {
        return(

            <View>
                {RejectAleart()}
            </View>
           
        )
    }
    else if(rides.isAccepted=="pending" && ridekey==rides.key)
    {
        return(
            <View style={{flex:1}}>
            <Header heading="Ride Confirmation" color={headerbackground}/>
            
            <View style={{marginVertical:30,borderWidth:2,borderRadius:10,marginHorizontal:10,backgroundColor:headerbackground,borderColor:headerbackground,elevation:10,}}>
    
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Driver Name : " + driverName }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Pickup Location : " + Pickup }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Pickup Adderss : " + PickupAddress }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Drop Location : " + dropLocation }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Drop Location Address : " + dropLocationAddress }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Total Distance : " + distance  + " KM" }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold" ,marginTop:10}}>
                   {"Total Fair : " + Charges  + " Rs" }
                </Text>
                </View>
                <Button heading="Confirm Ride" onPress={RideConfirm} color={headerbackground}/>
                <Button heading="back" onPress={()=>navigation.navigate("Dashboard")} color={headerbackground}/>
            </View>
        )
            
    }

    else
    {
        return(
            <View style={{flex:1}}>
            <Header heading="Ride Confirmation" color={headerbackground}/>
            
            <View style={{marginVertical:30,borderWidth:2,borderRadius:10,marginHorizontal:10,backgroundColor:headerbackground,borderColor:headerbackground,elevation:10,}}>
    
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Driver Name : " + driverName }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Pickup Location : " + Pickup }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Pickup Adderss : " + PickupAddress }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Drop Location : " + dropLocation }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Drop Location Address : " + dropLocationAddress }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
                   {"Total Distance : " + distance  + " KM" }
                </Text>
                <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold" ,marginTop:10}}>
                   {"Total Fair : " + Charges  + " Rs" }
                </Text>
                </View>
                <Button heading="Confirm Ride" onPress={RideConfirm} color={headerbackground}/>
                <Button heading="back" onPress={()=>navigation.navigate("Dashboard")} color={headerbackground}/>
            </View>
        )
            
    }


}
export default CconfirmRide