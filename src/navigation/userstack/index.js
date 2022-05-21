import { createStackNavigator } from '@react-navigation/stack';
import {Dashboard,SelectDriver,CconfirmRide,map} from '../../containers/user';
import UserTabStack from '../tab/UserTab';

const Stack = createStackNavigator();

function userStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserTabStack" component={UserTabStack} options={{headerShown:false}}/>
      <Stack.Screen name="SelectDriver" component={SelectDriver} options={{headerShown:false}}/>
      <Stack.Screen name="ConfirmRide" component={CconfirmRide} options={{headerShown:false}}/>
      <Stack.Screen name="map" component={map} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default userStack