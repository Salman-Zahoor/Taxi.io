import { View, Text, Button } from 'react-native'

export default function Status({ navigation }) {
  return (
    <View>
      <Text>Status</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Destination')}
        />
    </View>
  )
}