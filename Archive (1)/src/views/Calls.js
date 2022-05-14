import { View, Text, Button } from 'react-native'

export default function Calls({ navigation }) {
  return (
    <View>
      <Text>Calls</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Destination')}
        />
    </View>
  )
}