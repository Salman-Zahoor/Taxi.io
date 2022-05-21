import React,{useEffect,useState} from "react"
import { View,Text ,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Modal} from "react-native"
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Autocomplete from 'react-native-autocomplete-input';
import {getDistance,getCompassDirection} from "geolib";
import PolylineDirection from '@react-native-maps/polyline-direction';
import MapViewDirections from 'react-native-maps-directions';
import firebase from "firebase";
import { Header,Button } from "../../components";
import { headerbackground } from "../../constants";

const Dashboard=(props)=>{
    const [location, setLocation] = useState({
        latitude: 24.9179871,
        longitude: 67.0961782,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
      const [droplocation, setDroplocation] = useState({
        latitude: 24.9179872,
        longitude: 67.0961783,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
      const [hidePickup, setHidepickup] = useState(false);
      const [hideDrop,setHidedrop]=useState(false)

      const [places, setPlaces] = useState([])
      const [newplaces, setNewplaces] = useState([])
  const [query, setQuery] = useState('')
  const [querysec, setQuerysec] = useState('')
  const[driversData,setDriverdata] = useState([])
  const [myInfo,setMyInfo]=useState({})
      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
    
          // let currentLocation = await Location.getCurrentPositionAsync({});
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        // timeInterval: 100,
        distanceInterval: 2
      }, (currentLocation) => {
        const { coords: { longitude, latitude } } = currentLocation
      })
        })();
      }, []);
      
      useEffect(()=>{
        availabaleDrivers()
      },[])

      useEffect(()=>{
        userInfo()
      },[])

      const getPlaces = async (text) => {
        setQuery(text)
        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${text}&near=Karachi&limit=2`, {
          headers: {
            Accept: 'application/json',
            Authorization: 'fsq3OjhxIAtQQ35vAij8tyWXSdxIop81GhbLiCDbKYX0GXE='
          }
        })
        const { results } = await response.json()
        setPlaces(results)
      }
      

      const searchPlaces = async (text) => {
        setQuerysec(text)
        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${text}&near=Karachi&limit=5`, {
          headers: {
            Accept: 'application/json',
            Authorization: 'fsq3OjhxIAtQQ35vAij8tyWXSdxIop81GhbLiCDbKYX0GXE='
          }
        })
        const { results } = await response.json()
        setNewplaces(results)
      }


      const setHideresultPickup=(item,name,address)=>{
        setLocation({...item,name,address})
        setHidepickup(!hidePickup)
      }

      
      const setHideresultDrop=(item,name,address)=>{
        setDroplocation({...item,name,address})
        setHidedrop(!hideDrop)
      }
      console.log(droplocation,"dropppp");
      
      
  
    const Logout=()=>{
      firebase.auth().signOut()
    }   

    const availabaleDrivers=()=>{
      firebase.database().ref("All Drivers")
      .on("value",snapshot=>{
        console.log(snapshot,"Available drivers.........");
        let data=snapshot.val()?snapshot.val():{}
        setDriverdata(data)
      })
    }

    const userInfo=()=>{
      let Id=firebase.auth().currentUser.uid
      firebase.database().ref(`users/${Id}`)
      .on("value",snapshot=>{
        let data =snapshot.val()?snapshot.val():{}
        setMyInfo(data)
      })
    }

    // let driverKey=Object.keys(driversData)
    // console.log(driverKey,"DriverKey");
    // let dholkey=Object.keys(driversData).map(name =>(driversData[name].latitude));

    const origin = {latitude: location.latitude, longitude: location.longitude};
    const destination = {latitude:droplocation.latitude, longitude: droplocation.longitude};
    const GOOGLE_MAPS_APIKEY ="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGsI054v7tVM-sT-U4Tc4bfnCe-c1kxTw_KEY&callback=initMap";
    return(
      <View>
      <Header heading={"Welcome  " + myInfo.name} imageUri={myInfo.image}/>
        <View style={{flex:2}}>
            <Text>
                Salman
            </Text>
            
      <View style={styles.autocompleteContainer} >
      <Autocomplete
      placeholder="Pick Up location"
        data={places}
        value={query}
        onChangeText={getPlaces}
       hideResults={hidePickup}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
        renderItem: ({ item } ) => 
        // console.log(item,"item")
        (<View style={styles.autocompleteItem}>
          <TouchableOpacity onPress={()=>{setHideresultPickup(item.geocodes.main,item.name,item.location.address)}}>
            <Text style={styles.autocompleteText} >{item.name}, {item.location.address}
            </Text>
            </TouchableOpacity>
          </View>), }
      }
    />
<Autocomplete
      placeholder="Drop up location"
        data={newplaces}
        value={querysec}
        onChangeText={searchPlaces}
       hideResults={hideDrop}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => (<View style={styles.autocompleteItem}>
          <TouchableOpacity onPress={()=>{setHideresultDrop(item.geocodes.main,item.name,item.location.address) }}>
            <Text style={styles.autocompleteText} >{item.name}, {item.location.address}
            </Text>
            </TouchableOpacity>
          </View>), }
      }
    />

    


            <MapView
        style={styles.map}
        region={location}
      >
        <Marker 
          coordinate={location}
          title={'Driver Location'}
        description={'Driver is 2 minutes away!'}
        />

        <Marker 
          coordinate={droplocation}
          title={'Driver Location'}
        description={'Driver is 2 minutes away!'}
        />
      </MapView>

      <MapViewDirections
          origin={origin}
          destination={destination}
          apiKey={GOOGLE_MAPS_APIKEY}
          // strokeWidth={4}
          // strokeColor="#12bc00"
        />

      
      <View style={{marginTop:5}}>
      <Button heading="Continue" color={headerbackground}  onPress={()=>props.navigation.navigate("SelectDriver",{
          pickupLongitude:location.longitude,
          pickupLatitude:location.latitude,
          dropLongitude:droplocation.longitude,
          dropLatitude:droplocation.latitude,
          nameLocation:location.name,
          address:location.address,
          dropLocation:droplocation.name,
          dropLocationAddress:droplocation.address,
          userName:myInfo.name,
        })}/>
        </View>
        <View>
        <Button heading="Logout" color={headerbackground}  onPress={Logout}/>
        </View>
        </View>
        </View>
        </View>
    )

}
const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.7,
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
export default Dashboard