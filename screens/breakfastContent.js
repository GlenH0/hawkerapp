import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';

import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Break({ route, navigation }) {
    const { item, title, text, image, image1, key, video, rating, subpage, subpageimg, subpageadd, subpagetime, subpagephone, subpagelat, subpagelong, subpagemrt, subpagebus, subpageplace, store } = route.params;
    

    return (
      <ScrollView>
        <View style={styles.boxImg}>
          <View style={styles.imgContainer}>
            {/* this is for normal array */}
            {/* <Image style={styles.img} source={image}/>   */}
            
            {/* this is for my db ver */}
            <Image style={styles.img} source={{uri: image}}/>          
          </View>
        </View>
        <View  style={styles.view}>
            <View style={{paddingLeft:20, paddingBottom:10, width:'90%'}}>
              <Text style={styles.name}>{title}</Text>
              <Image source={images.ratings[rating]} />
            </View>

            <View
              style={{
                borderBottomColor: '#aeaeae',
                borderBottomWidth: 1,
                marginBottom: 12
                
              }}
            />

            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Description</Text>
                <Text style={{color: '#2f2f2f', fontFamily:'latoR'}}>{text}</Text>  
              </View> 
            </View>

            {
              renderIf(video)(
                <View style={{alignItems:'center'}}>
                  <View style={styles.videoContent}>
                    <Text style={styles.desc}>Reviews</Text>
                      <YoutubePlayer 
                        height={220}
                        videoId={video}
                      />
                  </View> 
                </View>
              )
            }
            
            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Where to find them?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('hawkerDetail',  {
                  key: subpage,
                  title: subpage,
                  image: subpageimg,
                  add: subpageadd,
                  time: subpagetime,
                  phone:subpagephone,
                  lat: subpagelat,
                  long: subpagelong,
                  mrt: subpagemrt,
                  bus: subpagebus,
                  place: subpageplace
                })}>
                  <Text style={{color:'#4286f4', fontFamily:'latoR'}}>{subpage}</Text>
                </TouchableOpacity >

                {
                  renderIf(store)(
                    <View style={{alignItems:'center'}}>
                      <Image style={styles.imgStore} source={store}/>  
                    </View>
                  )
                }

              </View> 
              
            </View>
            
           

            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.rate}>Rate this food </Text>
                <Text style={styles.rateText}>Tell others what you think</Text>
                <AirbnbRating
                count={5}
                reviews={["Terrible", "Meh", "OK", "Good", "Wow"]}
                defaultRating={0}
                size={44}
                tintColor='white'
              />

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
    imgStore:{
      resizeMode:'contain',
      width: '100%',
      height: 250,
      borderRadius: 10,
      overflow:'hidden', 
        
    },
    imgContainer:{
      width:"100%",
      alignItems:'center',
     
    },  
    name:{
        paddingTop: 10,
        fontSize:24,
        fontFamily:'playB',
        includeFontPadding: false,
        lineHeight: 35
    },
    desc: {
      fontFamily:'playB',
      fontSize: 16,
      paddingBottom: 5
    },
    desContent:{
      width: '90%',
      padding:10,
      
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
      marginBottom: 20,
    },
    rate:{
      fontFamily:'latoB',
      fontSize: 16,
      textAlign: 'center'
    },
    rateText:{
      color:'#8d8d8d',
      textAlign: 'center',
      fontFamily:'latoR'
    },
    videoContent:{
      width: '90%',
    },
    
  });
