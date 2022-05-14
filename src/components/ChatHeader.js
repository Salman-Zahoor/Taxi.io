import React from "react"
import {View,Text,StyleSheet,TouchableOpacity,Image,SafeAreaView} from "react-native"
import { headerbackground, headerfont, headerfontcolor, vh, vw } from "../constants"




const ChatHeader=({heading,imageUri,onPress,backbtn})=>{
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.imageView} onPress={onPress}>
            <Image source={backbtn} style={{height:30,width:30,}} />
            </TouchableOpacity>
            <Image source={imageUri} style={{height:40,width:40,marginTop:25,marginRight:5,borderRadius:50}} />
            <View style={styles.textView}>
            <Text style={styles.textstyle}>
                {heading}
                </Text>
                </View>
                
            
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        height:vh*0.1,
        backgroundColor:headerbackground,
    },
    textstyle:{
        color:headerfontcolor,
        fontSize:20,
        fontWeight:"bold",
    },
   
    textView:{
        justifyContent:"center",
        marginTop:10,
    },
    imageView:{
        justifyContent:"flex-start",
        marginLeft:10,
        marginTop:10,
        justifyContent:"center"
    },
    
})
export default ChatHeader