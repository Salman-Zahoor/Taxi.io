import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './src/containers/user/Dashboard';
import Register from './src/containers/auth/Register';
import Navigation from './src/navigation';
import React,{useEffect } from "react"
import firebase from "firebase"

export default function App() {
  useEffect(()=>{
    const firebaseConfig = {
      apiKey: "AIzaSyDybKAcjPocDey1HNxh5p7nYtw0m_Ap3tQ",
      authDomain: "taxi-app-8676c.firebaseapp.com",
      projectId: "taxi-app-8676c",
      storageBucket: "taxi-app-8676c.appspot.com",
      messagingSenderId: "383578172268",
      appId: "1:383578172268:web:507b703401da593aa02149",
      measurementId: "G-M6KW7B048P"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

  },[])
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
