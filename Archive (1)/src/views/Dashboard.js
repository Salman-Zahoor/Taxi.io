import { useState, useEffect } from 'react'
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Dashboard({ navigation }) {

  const [location, setLocation] = useState({
    latitude: 24.9179871,
    longitude: 67.0961782,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { coords: { longitude, latitude } } = currentLocation

      setLocation({ ...location, longitude, latitude });
    })();
  }, []);

  //,
  return (
    <View>
      <Text>Dashboard</Text>

      <MapView
        style={styles.map}
        region={location}
      >
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
});