import React from "react"
import {View,Text,StyleSheet,Image,TouchableOpacity } from "react-native"
import { globalcolor, globaltextcolor, headerbackground, headerfont, headerfontcolor, vh,vw } from "../constants"

const ButtonAdmin=({heading,onPress,color})=>{
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={{...styles.container,backgroundColor:color}}>
            <Text style={styles.textstyle} >
                {heading}
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        height:vh*0.06,
        width:vw*0.8,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:vh*0.01,
    },
    textstyle:{
        color:headerfontcolor,
        fontSize:headerfont,
    }
})
export default ButtonAdmin