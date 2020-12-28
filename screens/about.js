import React from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import {globalStyles} from '../styles/global';

export default function About({navigation}){
    return(
        <View style={globalStyles.container}>
            <Image style={styles.image} source={require('../assets/abou.png')}/>
            <View style={styles.box}>
                <Text style={styles.content}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
            
                <View style={styles.btnBox}>
                     <TouchableOpacity onPress={() => navigation.navigate('Hawker Centres')}>
                        <Text style={styles.button}>Hawker Centres</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => navigation.navigate('Hawker Food')}>
                        <Text style={styles.button}>Hawker Food</Text>
                    </TouchableOpacity>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width:"100%"
    },
    content:{
        width: '85%',
        textAlign:'center',
        paddingTop: 20,
        fontSize: 16,
        fontFamily:'latoR'
    },
    box:{
        alignItems:'center'
    },
    button:{
        width:129,
        height: 46,
     
        textAlign:'center',
        padding: 10,
        borderRadius: 6,
        fontFamily:'latoR',
        fontWeight:'bold',
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
    }
})