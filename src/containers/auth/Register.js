import React,{useState} from "react"
import { View ,Text,TextInput,StyleSheet,TouchableOpacity,Image,KeyboardAvoidingView,ScrollView} from "react-native"
import {Button,Header,ImagePickers} from "../../components"
import { headerbackground, vh, vw ,marginTop} from "../../constants"

const Register=(props)=>{
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    })
   


    const onChangeHandler = (type, value) => {
        setInputs({
            ...inputs,
            [type]: value
        })
    }



    const RegisterUser=()=>{
        firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
        
        .then(response =>{
            let id=firebase.auth().currentUser.uid
            firebase.database().ref(`users/${id}`)
            .set({
                uuid:id,
                name:inputs.name,
                email:inputs.email,
                password:inputs.password,
                image
            })
            .then(responses =>{
                alert("successful")
            })
        })
        .catch(errr =>{
            alert(errr.message)
            console.log(errr,"ERRRRRRRR");
        })
    }
    

const renderTextInputs=(placeholder,type,secureTextEntry)=>{
    return(
        <TextInput
        style={styles.textinputs}
        placeholder={placeholder}
        value={inputs[type]}
        onChangeText={(text)=>onChangeHandler(type,text)}
        secureTextEntry={secureTextEntry}
        />
    )
}


    return(
        <View style={{flex:1}}>
            
            <Header heading="Register"/>
            <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.mainheading}>
            <Text style={styles.mainheadingText1}>
            Welcome To Taxi.io
                </Text>
                <Text style={styles.mainheadingText}>
                    Register to  Continue
                </Text>
            <View>
           
            </View>
            </View>
            <KeyboardAvoidingView>

            {renderTextInputs("Name","name",false)}
            {renderTextInputs("Email","email",false)}
            {renderTextInputs("Password","password",true)}
            </KeyboardAvoidingView>

            <TouchableOpacity onPress={()=>props.navigation.navigate("LogIn")}>
                <Text style={styles.touchableText}>Already Have an account?SignIn</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            <Button heading="Register" onPress={RegisterUser} color={headerbackground}/>
            </View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    textinputs:{
        height:vh*0.05,
        paddingHorizontal:10,
        borderBottomWidth:0.5,
        margin:10,
        borderRadius:10,
        borderColor:"black"
    },
    touchableText:{
        textAlign:"center"
    },
    button:{
        marginTop:10
    },
    mainheading:{
        alignItems:"center",
        justifyContent:"center"
    },
    mainheadingText1:{
        fontSize:22,
        fontWeight:"bold",
        color:"black",
        marginTop:100
    },
    mainheadingText:{
        fontSize:16,
        color:"black"
    },
    welcomeimg:{
        height:100,
        width:100,
        marginTop:vh*0.02,
    }


})
export default Register