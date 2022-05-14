import { View, Text, Button } from 'react-native'

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>

      <Button 
        title="Login with Facebook" 
        onPress={() => navigation.navigate('Dashboard')}
        />
    </View>
  )
}