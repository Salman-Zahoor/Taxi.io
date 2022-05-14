import { View, Text, Button } from 'react-native'

export default function Trips({ navigation }) {
  return (
    <View>
      <Text>Trips</Text>

      <Button
        title="Trip Detail"
        onPress={() => navigation.navigate('Trip Detail')}
        />
    </View>
  )
}