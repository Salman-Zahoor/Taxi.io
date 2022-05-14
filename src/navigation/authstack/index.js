import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../containers/auth/Login';

const Stack = createStackNavigator();

function authStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default  authStack