// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { headerbackground, vh, vw } from '../constants';
// import { Ionicons } from '@expo/vector-icons'; 

// export default function ImagePickers({ width, borderRadius, height, title,getImage,val,type }) {
//     const [image, setImage] = useState(null);

//     const pickImage = async () => {
//         // No permissions request is necessary for launching the image library
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//             base64:true,
//         });
//         // console.log(image,"Image");
//         // console.log(result);

//         if (!result.cancelled) {
//             setImage(result.uri);
//             let base64Img=`data:image/jpg;base64,${result.base64}`
//             getImage(base64Img)
//         }
//     };

//     const renderregisterimage=()=>{
//         return(
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//             {image ?<Image source={{ uri: image }} style={Styles.ImageProps} />:
//             <Image style={Styles.image} source={{uri:'https://cdn-icons-png.flaticon.com/512/64/64572.png'}}/>}
                        

//         </View>
//         )
//     }



//     return (
//        <View style={{flexDirection:"row"}}>
//             { type === "profile" ?
//             <TouchableOpacity  onPress={pickImage}>
//                  <Image source={{ uri: val }} style={Styles.ImageProps} />
//             </TouchableOpacity>
//             :
//             renderregisterimage()}
//              <View style={Styles.uploadicon}>
//            { type !== "profile" && <Ionicons name="md-cloud-upload-outline" size={28} color="black"  onPress={pickImage}/> }
//            </View>
//        </View>
//     );
// }

// const Styles = StyleSheet.create({
//     ImageProps: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginTop:vh*0.02,
//         marginLeft:5,

//     },
//     image:{
//         height:100,
//         width:100,
//         marginTop:vh*0.02,
//     },
//     uploadicon:{
//         marginTop:vh*0.07,
//     }
// })