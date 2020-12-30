import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
// import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';



export default function Break({ route, navigation }) {
    const { item, title, text, image, image1, key} = route.params;
  
    return (
      <View>
        <Image style={styles.img} source={image}/>
        <View  style={styles.view}>
            <Text style={styles.name}>{title}</Text>
            <Text>Description</Text>
            <Text>{text}</Text>   
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
   
    view:{
      flex: 1,
      padding: 10
    },
    img:{
        resizeMode:'cover',
        width: '100%',
        height: 350,
    },
    name:{
        paddingBottom: 10,
        fontWeight:'bold',
        fontSize:32
    }
  });
