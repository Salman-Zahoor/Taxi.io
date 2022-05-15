import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,Button,TouchableOpacity,ScrollView,Modal} from "react-native"
import firebase from "firebase"
import {getDistance,getCompassDirection} from "geolib";


const CconfirmRide=({route,navigation})=>{

    useEffect(()=>{
        {userDetails()}
    },[])

    const[myDetail,setMyDetail]=useState({})
    const driverLat=route.params.driverLat[0];
    const driverId=route.params.driverId[0];
    const driverName=route.params.driverName[0];
    const driverLong=route.params.driverLong[0];
    const {dropLatitude,dropLongitude,pickupLatitude,pickupLongitude,distance, distancebwUD}=route.params
    const Charges=distance*100;
    
    const userDetails=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`)
        .on("value",snapshot=>{
            let data=snapshot.val()?snapshot.val():{}
            setMyDetail(data)
        })
    }

    const RideConfirm=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`AllRides`)
        .push({
            driverId,
            driverName,
            driverLat,
            driverLong,
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
        })
        .then(response =>{
           alert("successed");
        })
        .catch(eror =>{
            console.log(eror,"EERRREERRR");
        })
    }

    return(
        <View>
            <Text>
                Salman
            </Text>
            <View style={{marginTop:400}}>
            <Button
            title="Confirm Ride"
            onPress={RideConfirm}
            ></Button>
            </View>
        </View>
    )


}
export default CconfirmRide