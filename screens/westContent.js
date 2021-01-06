import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Linking, FlatList, Dimensions } from "react-native";
import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {dataList} from '../array/data';
import {dataList2} from '../array/dataCentre';
import { NavigationContainer } from '@react-navigation/native';


const numColumns = 2
const WIDTH = Dimensions.get("window").width;


export default function West({ route, navigation }) {
    const { item, title, text, video, rating, add, image, time, phone, lat, long, mrt, bus, place} = route.params;
   
    const _renderItem = ({item, index}) => {
      if(item.place = {place}){
        return (
          <View style={{flex:1}}>
           
            <View>
              <TouchableOpacity style={styles.itemStyle} onPress={() => navigation.navigate('break', item )}>
                <Image style={styles.img} source={item.image}/>
              </TouchableOpacity>
            </View>
      
            <Text style={{paddingLeft:10}}>{item.key}</Text>
            <Image style={{marginLeft:9}} source={item.rating} />
      
          </View>
        )
      }
    }
    
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
                        <Text style={{color:'#009dff'}} onPress={()=>{Linking.openURL('tel:'+ phone);}}>{phone}</Text>
                    </View>
                )}   
              </View> 
            </View>          

            <View style={{alignItems:'center'}}>
              <View style={styles.desContent}>
                <Text style={styles.desc}>Where to find them?</Text>

                <View style={styles.mapcontainer}>
                  <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.map}
                      initialRegion={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.005,
                      }}
                      showUserLocation={true} >
                      <Marker coordinate={{
                        latitude: lat,
                        longitude: long,
                      }}  />

                  </MapView>
                </View>
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
                <Text style={styles.desc}>Directions</Text>

                <View style={{paddingBottom: 10}}>
                  <View style={styles.iconText}>
                    <Icon style={{paddingRight: 5}} name="train" color={'#FF4343'} size={26} />
                    <Text style={styles.transport}>Nearest MRT</Text>
                  </View>
                  <Text style={styles.transportText}>{mrt}</Text>
                </View>

                <View style={styles.iconText}>
                  <Icon style={{paddingRight: 5}} name="bus" color={'#FF4343'} size={26} />
                  <Text style={styles.transport}>By Bus</Text>
                </View>
                <Text style={styles.transportText}>{bus}</Text>
              </View>
            </View>  

            <View>
              <Text>Recommended</Text>
              <FlatList
                scrollEnabled={false}
                data={dataList.slice(0,4)}
                renderItem={_renderItem}
                keyExtractor={(item, index)=> (index.toString())}
                numColumns={numColumns}
              />
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
    rate:{
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    },
    rateText:{
      color:'#8d8d8d',
      textAlign: 'center'
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
      fontWeight: 'bold',
      fontSize:16
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
      borderRadius: 12
      
    }
  });
