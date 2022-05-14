import { useState, useEffect } from 'react'
import { View, Text, Button, Dimensions, StyleSheet, TextInput } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Autocomplete from 'react-native-autocomplete-input'

export default function Dashboard({ navigation }) {

  const [location, setLocation] = useState({
    latitude: 24.9179871,
    longitude: 67.0961782,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
  })

  const [places, setPlaces] = useState([])
  const [query, setQuery] = useState('')
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
        setLocation({ ...location, longitude, latitude });
      })
      // const { coords: { longitude, latitude } } = currentLocation

      // setLocation({ ...location, longitude, latitude });
    })();
  }, []);

  //,

  const getPlaces = async (text) => {
    setQuery(text)
    const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${text}&near=Karachi&limit=10`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'fsq3OjhxIAtQQ35vAij8tyWXSdxIop81GhbLiCDbKYX0GXE='
      }
    })
    const { results } = await response.json()
    console.log('result --->', results)
    setPlaces(results)
  }

  return (
    <View>
      <Text>Dashboard</Text>

      {/* <TextInput style={{ borderWidth: 2 }} onChangeText={getPlaces} /> */}

      <View style={styles.autocompleteContainer}>
      <Autocomplete
        data={places}
        value={query}
        onChangeText={getPlaces}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => (<View style={styles.autocompleteItem}>
            <Text style={styles.autocompleteText}>{item.name}, {item.location.address}</Text>
          </View>),
        }}
    />
    </View>

      <MapView
        style={styles.map}
        region={location}
      >
        {/* <TextInput onChangeText={(text) => getPlaces(text)} /> */}
        <Marker
          coordinate={location}
          title={'Driver Location'}
          description={'Driver is 2 minutes away!'}
        />
      </MapView>

      <Button
        title="Continue"
        onPress={() => navigation.navigate('Destination', {
          // pickupLocation: {
          //   longitute, latitude
          // }
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
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