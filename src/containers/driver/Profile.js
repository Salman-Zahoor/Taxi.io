import React,{useEffect,useState} from "react"
import {View,Text,TextInput,Image,StyleSheet,TouchableOpacity} from "react-native"
import { Header,ImagePickers } from "../../components"
import{marginTop, vh, vw,headerfont,globalfontcolor, headerbackground, headertextcolor}from"../../constants"
import firebase from "firebase"

const Profile =()=>{
     
     useEffect(()=>{
        getUserDetails()

    },[]);
    

    
    const[userDetails,setuserDetails]=useState({})

    const getUserDetails=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`driver/${id}`)
        .on("value",snapshotttt =>{
        //  console.log(id,"IDDDDD");
            // console.log(snapshotttt.val(),"Valuee");
            // setuserDetails(snapshotttt.val())
            setuserDetails(snapshotttt.val())
        })
    }

    const logout=()=>{
        firebase.auth().signOut()
    }
    return(
        <View style={styles.mainView}>
        <Header heading="Profile"/>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <View style={{backgroundColor:headerbackground,width:vw*0.9,height:"60%",justifyContent:"center",alignItems:"flex-start",borderRadius:20,elevation:10}}>
         <Image source={{uri:userDetails.image}} style={styles.image}/>
        <View style={styles.cardview}>
            <Text style={styles.text}>
            Name: {userDetails.name}
        </Text>
        </View>
        <View style={styles.cardview}>
            <Text style={styles.text}>
            Email: {userDetails.email}
        </Text>
        </View>
        </View>
        </View>
            <TouchableOpacity style={styles.updatebtn} onPress={logout}>
                <Text style={styles.text}>
                LOGOUT
            </Text>
            </TouchableOpacity>
       
    </View>
    )
}
const styles=StyleSheet.create({
    mainView:{
        flex:1,
    },
    image:{
        height:100,
        width:100,
        borderRadius:50,
        marginTop:vh*0.01,
        marginHorizontal:vw*0.04,
    },
    logoutbtn:{
        borderWidth:1,
        marginHorizontal:vw*0.07,
        borderRadius:10,
        padding:10,
        elevation:20,
        backgroundColor:"black"
    },
    updatebtn:{
        borderWidth:1,
        marginHorizontal:vw*0.07,
        borderRadius:10,
        padding:10,
        elevation:20,
        backgroundColor:"black",
        marginTop:vh*0.02
    },
    cardview:{
        marginVertical:vh*0.01,
        marginHorizontal:vw*0.02,
        padding:10,
        color:headertextcolor,
        fontSize:headerfont,
        fontWeight:"bold",
        textAlign:"center"
    },
    text:{
        color:headertextcolor,
        fontSize:headerfont,
        fontWeight:"bold",
        textAlign:"center"
    }
})

export default Profile