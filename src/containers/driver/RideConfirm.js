import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Modal} from "react-native"
import firebase from "firebase"
import {getDistance,getCompassDirection} from "geolib";
import { Button, Header} from "../../components";
import { headerbackground, headerfont, headerfontcolor } from "../../constants";



const RideConfirm=({route,navigation})=>{

    // useEffect(()=>{
    //     {userDetails()}
    // },[])

    // const[myDetail,setMyDetail]=useState({})
    // const driverLatitude=route.params.driverLatitude;
    // const driverId=route.params.driverId;
    // const driverName=route.params.driverName;
    // const driverLongitude=route.params.driverLongitude;
    // const Pickup=route.params.locationName;
    // const PickupAddress=route.params.address;
    // const {dropLatitude,dropLongitude,pickupLatitude,pickupLongitude,distance, distancebwUD,dropLocation
    //     ,dropLocationAddress,name
    // }=route.params
    // const Charges=distance*100;
   
    
    // console.log(driverName,"Latiiii");
    // console.log(driverLongitude,"Longiiii");

    // const userDetails=()=>{
    //     let id=firebase.auth().currentUser.uid
    //     firebase.database().ref(`users/${id}`)
    //     .on("value",snapshot=>{
    //         let data=snapshot.val()?snapshot.val():{}
    //         setMyDetail(data)
    //     })
    // }

    // const AcceptRide=()=>{
    //     let id=firebase.auth().currentUser.uid
    //     firebase.database().ref(`AllRides`)
    //     .push({
    //         driverId,
    //         driverName,
    //         driverLatitude,
    //         driverLongitude,
    //         dropLatitude,
    //         dropLongitude,
    //         pickupLatitude,
    //         pickupLongitude,
    //         distance,
    //         distancebwUD,
    //         Charges,
    //         username:myDetail.name,
    //         userId:myDetail.uuid,
    //         isAccepted:"pending",
    //         name,
    //     })
    //     .then(response =>{
    //        alert("successed");
    //     })
    //     .catch(eror =>{
    //         console.log(eror,"EERRREERRR");
    //     })
    // }

    return(
        <View style={{flex:1}}>
        <Header heading="Ride Confirmation" color={headerbackground}/>
        <View style={{marginVertical:30,borderWidth:2,borderRadius:10,marginHorizontal:10,backgroundColor:headerbackground,borderColor:headerbackground,elevation:10,}}>

            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
               {"Driver Name : " }
            </Text>
            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
               {"Pickup Location : "  }
            </Text>
            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
               {"Pickup Adderss : "  }
            </Text>
            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
               {"Drop Location : "  }
            </Text>
            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
               {"Drop Location Address : "  }
            </Text>
            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold",marginTop:10}}>
               {"Total Distance : "  }
            </Text>
            <Text style={{color:headerfontcolor,marginStart:10,fontSize:headerfont,fontWeight:"bold" ,marginTop:10}}>
               {"Total Fair :" }
            </Text>
            </View>
            <Button heading="Confirm Ride"  color={headerbackground}/>
        </View>
    )


}
export default RideConfirm