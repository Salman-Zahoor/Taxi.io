import { createStackNavigator } from '@react-navigation/stack';
import {DriverDashboard} from '../../containers/driver';

const Stack = createStackNavigator();

function driverStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DriverDashboard" component={DriverDashboard} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default driverStack