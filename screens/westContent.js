import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Linking, FlatList, Dimensions } from "react-native";
import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {lunchData} from '../array/dataLunch';

import { NavigationContainer } from '@react-navigation/native';
import { dataList } from '../array/data';

import firebase from '../firebase/fb'

const numColumns = 2
const WIDTH = Dimensions.get("window").width;


export default function West({ route, navigation }) {
    const {  title, video, rating, add, image, time, phone, lat, long, place} = route.params;

    // const [list, setList] = useState([])
    

    const _renderItem = ({item, index}) => {
      if(item["place"] === place){
        return (
          <View style={{flex:1, backgroundColor:'white'}}>
           
            <View>
              <TouchableOpacity style={styles.itemStyle} onPress={() => navigation.navigate('food2centre', item )}>
                <Image style={styles.img} source={item.image}/>
              </TouchableOpacity>
            </View>
      
            <Text numberOfLines={1} style={{paddingLeft:10}}>{item.key}</Text>
            <Image style={{marginLeft:9}} source={item.rating} />
      
          </View>
        )
      }
    }
    
        
    return (   
        <FlatList 
                data={lunchData}
                renderItem={_renderItem}
                keyExtractor={(item, index)=> (index.toString())}
                numColumns={numColumns}
                

                ListHeaderComponent={ <>   
                  <View style={styles.boxImg}>
                    <View style={styles.imgContainer}>
                      <Image style={styles.img} source={{uri: image}}/>
                    </View>
                  </View>
                  <View  style={styles.view}>
                      <View style={{paddingLeft:20, paddingBottom:10, width:'90%'}}>
                        <Text style={styles.name}>{title}</Text>
                        <Image source={images.ratings[rating]} />
                      </View>
                      <View style={{alignItems:'center'}}>
                        <View style={styles.desContent}>
                          <Text style={styles.desc}>Address</Text>
                          <Text style={{paddingBottom: 20, paddingLeft:10, color: '#2f2f2f'}}>{add}</Text>
                          {renderIf(time)(
                            <View>
                              <Text style={styles.desc}>Opening Hours</Text>
                              <Text style={{paddingBottom: 20, paddingLeft:10, color: '#2f2f2f'}}>{time}</Text>
                            </View>
                          )}
                          {renderIf(phone)(
                              <View>
                                  <Text style={styles.desc}>Phone Number</Text>
                                  <Text style={{color:'#4286f4', paddingLeft:10}} onPress={()=>{Linking.openURL('tel:'+ phone);}}>{phone}</Text>
                              </View>
                          )} 
                        </View> 
                      </View>          

                      <View style={{alignItems:'center'}}>
                        <View style={styles.desContent}>
                          <Text style={styles.desc}>How to get there?</Text>

                         <TouchableOpacity style={styles.mapcontainer} onPress={() => Linking.openURL('http://maps.google.com/maps?daddr='+lat+'+'+long)}>                      
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                initialRegion={{
                                  latitude: lat,
                                  longitude: long,
                                  latitudeDelta: 0.001,
                                  longitudeDelta: 0.005,
                                }}
                                showUserLocation={true} 
                                scrollEnabled={false}>
                                <Marker coordinate={{
                                  latitude: lat,
                                  longitude: long,
                                  title: title,
                                }}  />

                            </MapView>
                         </TouchableOpacity>
                         {/* <Text style={{paddingTop:5, fontSize: 10}}>*Use two fingers to tap on the map to view GPS</Text> */}
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

                      {/* <View style={{alignItems:'center'}}>
                        <View style={styles.desContent}>
                          <Text style={styles.descDirection}>How to get there?</Text>
                          <View style={{paddingBottom: 10}}>
                            <View style={styles.iconText}>
                              <Icon style={{paddingRight: 5}} name="train" color={'#FF4343'} size={26} />
                              <Text style={styles.transport}>Nearest MRT/LRT</Text>
                            </View>
                            <Text style={styles.transportText}>{mrt}</Text>
                          </View>

                          <View style={styles.iconText}>
                            <Icon style={{paddingRight: 5}} name="bus" color={'#FF4343'} size={26} />
                            <Text style={styles.transport}>By Bus</Text>
                          </View>
                          <Text style={styles.transportText}>{bus}</Text>
                        </View>
                      </View>   */}
       
                  </View>

                  
                  <View style={styles.btmRec}>
                    <Text style={styles.rec}>What's recommended here?</Text> 
                  </View>   
                  
               </> }
      />
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
        //  overflow:'hidden', 
    },
    imgContainer:{
      width:"100%",
      alignItems:'center',
     
    },  
    name:{
        paddingBottom: 10,
        fontWeight: "300",
        fontSize:28,
        fontFamily:'latoR'
    },
    desc: {
      fontFamily:'latoB',
      fontSize: 16,
      paddingBottom: 5,
    },
    rec:{
      fontFamily:'sat',
      fontSize: 22,
      textAlign: 'center',
      color:'#3a3b3c',
    },
    descDirection: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingBottom: 10
    },
    desContent:{
      width: '90%',
      padding:20,
      backgroundColor:'white',
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

    mapcontainer: {
      height: 300,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
          ...StyleSheet.absoluteFillObject,
    },

    transport: {
      color:'#FF4343'
    },
    transportText: {
      paddingLeft:10,
      fontSize:14,
      paddingBottom: 15,
      color: '#2f2f2f',
      fontFamily: 'latoR'
    },
    iconText: {
      flexDirection: 'row',
      alignItems:'baseline',
    },
    itemStyle: {   
      // shadow 
      shadowOffset: { width: 12, height: 12 },
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation: 3,
      backgroundColor : "#fff", 

      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      flex: 1,
      margin: 10,
      height: WIDTH/numColumns,    
      borderRadius: 12,
      overflow:'hidden'
    },
    btmRec:{
      backgroundColor:'white',
      paddingTop: 10,
      paddingBottom: 10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  });
