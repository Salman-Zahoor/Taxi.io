import { createStackNavigator } from '@react-navigation/stack';
import {Dashboard} from '../../containers/user';

const Stack = createStackNavigator();

function userStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default userStack