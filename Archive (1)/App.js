import { StyleSheet, View } from 'react-native';
import MainNavigator from './src/config/navigation'

export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


/*
  Workarounds for MacOS for windows user

  1. VMWare (Virtual Box) 
  2. Hackintosh
  3. Client se teamviewer ka access
  4. Client ko bolu ke MAC bhijwae

*/

/*
  1. File structure
  2. Navigations
  3. Map
  4. Location
*/