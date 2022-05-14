import { View, Text, Button } from 'react-native'

export default function Dashboard({ navigation }) {
  return (
    <View>
      <Text>Chats</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Destination')}
        />
    </View>
  )
}