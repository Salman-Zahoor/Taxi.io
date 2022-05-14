import React from "react"
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native"
import { headerbackground, headerfont, headerfontcolor, vh,vw } from "../constants"

const Button=({heading,onPress,color,imageUri})=>{
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={{...styles.container,backgroundColor:color}}>
             <Image source={imageUri} style={{height:30,width:30,marginRight:5}}/>
            <Text style={styles.textstyle} >
                {heading}
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        height:vh*0.06,
        marginHorizontal:vw*0.08,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
    },
    textstyle:{
        color:headerfontcolor,
        fontSize:headerfont,
        marginRight:35,
    }
})
export default Button