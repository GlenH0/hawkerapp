import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
// import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Break({ route, navigation }) {
    const { item, title, text, image, image1, key, video} = route.params;
  
    return (
      <ScrollView>
        <Image style={styles.img} source={image}/>
        <View  style={styles.view}>
            <Text style={styles.name}>{title}</Text>

            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Description</Text>
                <Text>{text}</Text>  
              </View> 
            </View>

            <YoutubePlayer 
              height={240}
              videoId={video}
            />
            <Text style={styles.header}>Where to find them?</Text>
            <Text>Rate this food </Text>
            <Text>Tell others what you think</Text>
            <TouchableOpacity style={{flexDirection:'row'}}>
              <Icon name="noodles" color={"#aeaeae"} size={50} />
              <Icon name="noodles" color={"#aeaeae"} size={50} />
              <Icon name="noodles" color={"#aeaeae"} size={50} />
              <Icon name="noodles" color={"#aeaeae"} size={50} />
              <Icon name="noodles" color={"#aeaeae"} size={50} />
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
   
    view:{
      padding: 10,
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
    },
    desc: {
      fontWeight: 'bold',
      fontSize: 16
    },
    desContent:{
      width: '90%',
      padding:10,
      paddingLeft:20,
      backgroundColor:'#E2DEDE',
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 20
    }
  });
