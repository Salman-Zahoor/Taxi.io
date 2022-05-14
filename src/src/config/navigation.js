import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Destination from '../views/Destination'
import Trips from '../views/Trips'
import TripDetail from '../views/TripDetail'
import Chats from '../views/Chats'
import Calls from '../views/Calls'
import Status from '../views/Status'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createMaterialTopTabNavigator()

export default function MainNavigator() {
  const user = true
  return (
    <NavigationContainer>
      {!user ?
        <AuthStack />
        :
        <MainDrawer />
      }
    </NavigationContainer>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Dashboard" component={TabNavigator} /> */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Destination" component={Destination} />
    </Stack.Navigator>
  )
}

function TripsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Trips" component={Trips} />
      <Stack.Screen name="Trip Detail" component={TripDetail} />
    </Stack.Navigator>
  )
}


function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard Stack" component={DashboardStack} />
      <Drawer.Screen name="Your Trips" component={TripsStack} />
    </Drawer.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Calls" component={Calls} />
    </Tab.Navigator>
  )
}


/*
 1. Stack Navigator
 2. Drawer Navigator
 3. Tab Navigator
*/