import React,{useEffect,useState} from "react"
import {View,Text,TouchableOpacity,ScrollView}from "react-native"
import firebase from "firebase"
import * as Location from 'expo-location';
import { observe } from "react-native/Libraries/LogBox/Data/LogBoxData";
import { Header,Button } from "../../components";
import { headerbackground,globaltextcolor } from "../../constants";



const DriverDashboard=({navigation})=>{

    const [driverLocation,setDriverLocation]=useState({})
   const [driverInfo,setDriverInfo]=useState({})
   const[availableRides,SetAvailableRides]=useState({})
   
    const logout = async() =>{
      await  deleteProduct();
        await  firebase.auth().signOut()
            
     .then(res=>{
        console.log(res,"Response");
     })
     .catch(err=>{
        console.log(err,"Error");
     })
    }

    console.log(driverLocation,"Location");



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

      useEffect(()=>{
          (async () => await DriverLocation())
      },[])

      useEffect(async()=>{
        await userInfo()
      },[])


      useEffect(()=>{
        MyRides()
      },[])
      
      const deleteProduct=async()=>{
        let id= firebase.auth().currentUser.uid
        await firebase.database().ref(`All Drivers/${id}`).remove()
        .then(response=>{
            console.log(response.messege,"REsponseee");
        })
        .catch(err=>{
            console.log(err.messege,"Error");
        })
        }

const DriverLocation=async()=>{
    let id=firebase.auth().currentUser.uid
   await firebase.database().ref(`All Drivers/${id}`)
    .set({
        id:id,
        longitude:driverLocation.coords.longitude,
        latitude:driverLocation.coords.latitude,
        name:driverInfo.name,
        image:driverInfo.image,
    })
    .then((res) => {
        console.log(res,"Responsee");
}).catch((err) => {
    // console.log(err, "ERRRRRRRRRRR");
})
}


const AcceptedAleart=()=>{
    Alert.alert(
        "Successfull",
        "You LogedIn successfully ",
        [
          {
            text: "OK",
            onPress: () => {DriverLocation()},
            style: "cancel"
          },
         
        ]
      )
}


const Id=firebase.auth().currentUser.uid;

const userInfo=async()=>{
   let id=firebase.auth().currentUser.uid
     await firebase.database().ref(`driver/${id}`)
    .on("value",snapshot=>{
        
        let data=snapshot.val()?snapshot.val():{}
        setDriverInfo(data)
        console.log(data,"details");
    })
}

const MyRides=()=>{
    firebase.database().ref("AllRides")
    .on("value",snapshot=>{
        let data=snapshot.val()?snapshot.val():{}
        SetAvailableRides(data)
    })
}

let ridesKey=Object.keys(availableRides)
// console.log(ridesKey,"Key");

const AcceptRide=(keys)=>{
   
           firebase.database().ref(`AllRides/${keys}`).update(
               {isAccepted:"accepted"}
           )
        .then(response=>{
        //  {()=>navigation.navigate("DriverMap")};
        })
        .catch(err=>{
        console.log(err.messege,"Error");
        })
    }

    const RejectRide=(keys)=>{
        firebase.database().ref(`AllRides/${keys}`).update(
            {driverId:null,
            driverLatitude:null,
            driverLongitude:null,
            driverName:null,
            distancebwUD:null,
            isAccepted:"rejected",
            })
        .then(res=>{
            console.log(res.messege,"Respp");
        })
        .catch(err=>{
            console.log(err.messege,"RESSSSSS");
        })
    }



    // const RejectRide=(keys)=>{
    //     firebase.database().ref(`AllRides/${keys}`).remove()
    //     .then(res=>{
    //         console.log(res.messege,"Respp");
    //     })
    //     .catch(err=>{
    //         console.log(err.messege,"RESSSSSS");
    //     })
    // }

    return(
      <ScrollView>
          <Header heading={"Welcome  " + driverInfo.name}/>
        <View style={{marginTop:20}}>
        
            {ridesKey.length > 0 ? ridesKey.map(values=>{
                if(availableRides[values].driverId==Id && availableRides[values].isCompleted==null){
                return(
                    
                    <View
                    style={{borderWidth:1,borderColor:headerbackground,borderRadius:10,marginHorizontal:10,elevation:10,backgroundColor:headerbackground}}
                    >
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Name: {availableRides[values].username}</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Fair: {availableRides[values].Charges}Rs</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>User Distance: {availableRides[values].distancebwUD}km</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Total Ride Distance : {availableRides[values].distance}km</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Pickup Address : {availableRides[values].pickupPlace}</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Pickup Location : {availableRides[values].pickupAddress}</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Drop Location : {availableRides[values].dropPlace}</Text>
                        <Text style={{color:globaltextcolor,fontSize:16,fontWeight:"bold",marginHorizontal:10}}>Drop Address : {availableRides[values].dropAddress}</Text>

                        
                        <View style={{color:globaltextcolor,marginVertical:10}}>
                       
                        </View>
                        <TouchableOpacity style={{marginVertical:10}}>
                        <Button heading="Accept" color="black" onPress={()=>navigation.navigate("DriverMap",{
                          driverLatitude:availableRides[values].driverLatitude,
                          driverLongitude:availableRides[values].driverLongitude,
                          dropLatitude:availableRides[values].dropLatitude,
                          dropLongitude:availableRides[values].dropLongitude,
                          pickupLongitude:availableRides[values].pickupLongitude,
                          pickupLatitude:availableRides[values].pickupLatitude,
                          Fair:availableRides[values].Charges,
                          AllData:values,
                        }) + AcceptRide(values)}/>
                        </TouchableOpacity>
                        <View style={{marginVertical:10}}>
                        <Button heading="Reject" color="black" onPress={()=>RejectRide(values)}/>
                        </View>
                        
                    </View >
                ) }
                
                else{
                    return(
                        <View></View>
                    )
                }
            })
        :
        <View style={{flex:1,marginTop:50,marginHorizontal:100}}>
            <Text style={{color:"black",fontSize:18}}>
                No Request Found
            </Text>

        </View>
        }
        <View style={{marginVertical:50}}>
            <Button heading="Start Finding Ride" color={headerbackground} onPress={DriverLocation}/>
        </View>
        </View>
        </ScrollView>
    )

}

export default DriverDashboard