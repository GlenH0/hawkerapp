import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Break({ route, navigation }) {
    const { item, title, text, image, image1, key, video, rating} = route.params;
  
    return (
      <ScrollView>
        <View style={styles.boxImg}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={image}/>
          </View>
        </View>
        <View  style={styles.view}>
            <View style={{paddingBottom:12}}>
              <Text style={styles.name}>{title}</Text>
              <Image source={images.ratings[rating]} />
            </View>
            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Description</Text>
                <Text>{text}</Text>  
              </View> 
            </View>
            
            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Where to find them?</Text>
              </View> 
            </View>

            <Text style={styles.desc}>Reviews</Text>

            <YoutubePlayer 
              height={240}
              videoId={video}
            />

            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.rate}>Rate this food </Text>
                <Text style={styles.rateText}>Tell others what you think</Text>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', paddingTop:10}}>
                  <Icon name="chef-hat" color={"#d3d3d3"} size={50} />
                  <Icon name="chef-hat" color={"#d3d3d3"} size={50} />
                  <Icon name="chef-hat" color={"#d3d3d3"} size={50} />
                  <Icon name="chef-hat" color={"#d3d3d3"} size={50} />
                  <Icon name="chef-hat" color={"#d3d3d3"} size={50} />
                </TouchableOpacity>
             </View> 
            </View>
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
   
    view:{
      padding: 10,
    },
    boxImg:{
      alignItems:'center',
      
    },
    img:{
        resizeMode:'contain',
        width: '100%',
        height: 350,
        borderRadius: 4,
        overflow:'hidden', 
    },
    imgContainer:{
      width:"95%",
      alignItems:'center',
      paddingTop: 10,
    },  
    name:{
        paddingBottom: 10,
        fontWeight:'bold',
        fontSize:28,
    },
    desc: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingBottom: 5
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
    },
    rate:{
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    },
    rateText:{
      color:'#8d8d8d',
      textAlign: 'center'
    }
  });
