import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {ActivityIndicator} from "react-native"
import AuthStack from './authstack';
import UserStack from './userstack';
import DriverStack from './driverStack';
import firebase from 'firebase';


export default function Navigation() {
  const [component, setComponent] =
        useState(
            <ActivityIndicator color="blue" size={'large'}
                style={{ flex: 1 }}
                animating={true}
            />
        )
            // useEffect(()=>{
            //     firebase.database().ref(`driver/${firebase.auth().currentUser.uid}`)
            //     .on("value",snapshot=>{
            //         console.log(snapshot.val(),"snapshot");
            //     })
            // },[])

        useEffect(()=>{
            setTimeout(() =>{
            firebase.auth().onAuthStateChanged(user =>{
                console.log(user,'usseee');
                if(user){
                firebase.database().ref(`driver/${user.uid}`).on('value',snapshot=>{
                    console.log(snapshot.val(),'sss');
                    if(snapshot.val()?.type=='driver'){
                        setComponent(<DriverStack/>)
                    }
                    
                })
                firebase.database().ref(`users/${user.uid}`).on('value',snapshot=>{
                    console.log(snapshot.val(),"user Snapshot");
                    if(snapshot.val()?.type=='user'){
                        setComponent(<UserStack/>)
                    }
                })
            }
            else{
                setComponent(<AuthStack/>)
            }
            })
            },3000);
        },[])
  return (
    <NavigationContainer>
        {/* <AuthStack/> */}
        {component}
        {/* <AppStack/> */}
        {/* <AdminStack/> */}
    </NavigationContainer>
  );
}