import { createStackNavigator } from '@react-navigation/stack';
import {DriverDashboard,RideConfirm,DriverMap} from '../../containers/driver';
import DriverTabStack from '../tab/DriverTab';
const Stack = createStackNavigator();

function driverStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DriverTabStack" component={DriverTabStack} options={{headerShown:false}}/>
      <Stack.Screen name="DriverMap" component={DriverMap} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default driverStack