import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';



export default function West({ route, navigation }) {
    const { item, title, text, video, rating, add, image, time,phone} = route.params;
  
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
                <Text style={styles.desc}>Address</Text>
                <Text>{add}</Text>
                <Text style={styles.desc}>Opening Hours</Text>
                <Text>{time}</Text>
                {renderIf(phone)(
                    <View>
                        <Text style={styles.desc}>Phone Number</Text>
                        <Text>{phone}</Text>
                    </View>
                )}   
              </View> 
            </View>
            


            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Where to find them?</Text>
              </View> 
            </View>
            {
              renderIf(video)(
                <Text style={styles.desc}>Reviews</Text>
              )
            }
            
            {
              renderIf(video)(
              <YoutubePlayer 
                height={240}
                videoId={video}
              />
              )
            }
            

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
        resizeMode:'cover',
        width: '100%',
        height: 300,
        // borderRadius: 4,
        // overflow:'hidden', 
    },
    imgContainer:{
      width:"100%",
      alignItems:'center',
     
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
