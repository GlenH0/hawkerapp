import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";

import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { Entypo } from '@expo/vector-icons';    

const HEIGHT = Dimensions.get("window").height;

export default function About({navigation}){

    return(
        
            <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/wok.jpg')}/>

            <View>
                <View style={styles.outerCrossBtn}>
                <Entypo name="menu" size={26} color="white" style={styles.crossBtn} onPress={() => navigation.openDrawer()}/>
                </View>
            </View>
            
           <View style={styles.whiteBox}>
                <View style={styles.box}>
                
                    <Text style={styles.head}>About</Text>
                    <Text style={styles.content}>EH! Hawker Leh app aims to spread and reach out to individuals who are interested in the different aspects of Singapore's Hawker Culture, from the breakdown of common drinks and dishes to the ways of enjoying it.
                    </Text>

                    </View>

                        <View style={styles.video}>
                            <YoutubePlayer
                                height={240}
                                videoId={"l1gcm8g5EHY"}
                                play={false}
                            />
                        </View>


                <Image style={styles.logo} source={require('../assets/logo.png')}/>
            </View>
           
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height:'100%'
    },
    image:{
        width:"100%",
        height: 320
    },
    content:{
        width: '85%',
        paddingTop: 15,
        fontSize: 16,
        fontFamily:'latoR',
        color: 'black'
    },
    box:{
        alignItems:'center',
    },
    button:{
        width:129,
        height: 46,
        textAlign:'center',
        padding: 10,
        borderRadius: 6,
        fontFamily:'latoB',  
        backgroundColor:'#FF4343',
        color:'#fff',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    btnBox:{
        alignItems:'center',
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    whiteBox:{
        backgroundColor: 'white',
        position:'absolute',
        borderTopLeftRadius: 85,
        top: "29%",
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('100%'),
    },
    head: {
        width: '85%',
        paddingTop: 50,
        fontSize: 26,
        fontFamily:'sat'
    },
    logo: {
        width: 55, 
        height: 55,
        justifyContent:'center',
        alignSelf:'center',
        top:-25,
        // opacity: 0.1,
        position:'absolute',
        overflow:'hidden',
        borderRadius: 20,
    },
    imgBox:{
        width: '90%',
        height: 160,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        transform: [{ rotate: '0deg' }],
        left: 60,
        top: 160
    },
    imgBox1:{
        width: '90%',
        height: 160,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        transform: [{ rotate: '25deg' }],
        left: 110,
        top: 290,
        position: 'absolute'
    },
    video:{
        width:'85%', 
        justifyContent:'center', 
        alignSelf:'center',
        paddingTop: 30,
        height: 240
    },
    crossBtn:{
      justifyContent:'center',
      alignSelf:'center',
    },
    outerCrossBtn: {
      height:40, width: 40, backgroundColor:'red',
      flexDirection: 'row',
      position: 'absolute',
      top: -280,
      left: 15,
      margin: 3,
      justifyContent:'center',
      alignSelf:'center',
      backgroundColor: '#3d3d3d96',
      borderRadius: 20,
    }
})