import React from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Dimensions } from "react-native";
import {globalStyles} from '../styles/global';

const HEIGHT = Dimensions.get("window").height;

export default function About({navigation}){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/wok.jpg')}/>
            
           <View style={styles.whiteBox}>
                <View style={styles.box}>
                    <Text style={styles.head}>About</Text>
                    <Text style={styles.content}>EH! Hawker Leh app aims to spread and reach out to individuals who are interested in the different aspects of Singapore's Hawker Culture, from the breakdown of common drinks and dishes to the ways of enjoying it.
                    </Text>
                </View>

                <Image style={styles.logo} source={require('../assets/logo.png')}/>

                <View style={styles.imgBox}>
                    <Image style={styles.wok} source={require('../assets/wokhei.jpg')}/>
                </View>
                <View style={styles.imgBox1}>
                    <Image style={styles.wok} source={require('../assets/kway.jpg')}/>
                </View>
      
                {/* <View style={styles.btnBox}>
                    <TouchableOpacity onPress={() => navigation.navigate('Hawker Centres')}>
                        <Text style={styles.button}>Hawker Centres</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => navigation.navigate('Hawker Food')}>
                        <Text style={styles.button}>Hawker Food</Text>
                    </TouchableOpacity>
                </View> */}

           </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    image:{
        width:"100%",
        height: 320
    },
    content:{
        width: '85%',
        paddingTop: 20,
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
        height: "100%",
        position:'absolute',
        borderTopLeftRadius: 85,
        top: 250,
        width: "100%",
        
    },
    head: {
        width: '85%',
        paddingTop: 50,
        fontSize: 32,
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
    wok: {
        width: "96%",
        height: 150,
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 5
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
    }
})