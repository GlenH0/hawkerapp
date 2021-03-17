import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Linking, FlatList, Dimensions } from "react-native";
import { globalStyles, images } from '../styles/global';

import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import firebase from '../firebase/fb'

import { Ionicons } from '@expo/vector-icons';

const numColumns = 1
const WIDTH = Dimensions.get("window").width;

export default function West({ route, navigation, navigation: {goBack} }) {
  const { title, video, rating, add, time, phone, lat, long, place, image } = route.params;
  const [loaded, setLoaded] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    firebase.database().ref('foodBreak').on('value', (snapshot) => {
      // console.log(snapshot.val())
      var li = []
      snapshot.forEach((child) => {
        if (child.val().place == place) {
          li.push({
            key: child.val().key,
            title: child.val().title,
            image: child.val().image,
            place: child.val().place,
            image2: child.val().image2,
            subpage: child.val().subpage,
            subpageadd: child.val().subpageadd,
            subpageimg: child.val().subpageimg,
            subpagetime: child.val().subpagetime,
            subpagelat: child.val().subpagelat,
            subpagelong: child.val().subpagelong,
            subpagephone: child.val().subpagephone,
            unit: child.val().unit,
            type: child.val().type,
            foodtype: child.val().foodtype,
            text: child.val().text,
            link: child.val().link,
            phone: child.val().phone,
            description: child.val().description,
            descriptionIndex: child.val().descriptionIndex,
            video: child.val().video,
          })
        }
      })
      setList(li)
    })
  }, [])

  const imageLoaded = () => {
    setLoaded(true)
  }

  const _renderItem = ({ item, index }) => {
    if (JSON.stringify(item.place) == JSON.stringify(place)) {
      return (
        <View key={item.key} style={{ flex: 1, backgroundColor: 'white' }}>
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => navigation.navigate('food2centre', item)}>
              <Image key={item.key} style={styles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' onLoadStart={imageLoaded}/>
            </TouchableOpacity>
          </View>

          <Text key={item.key} numberOfLines={1} style={{ paddingLeft: 15, paddingBottom: 25, width: 170, fontSize: 14, color: '#676767', fontFamily: 'latoB', }}>{item.title}</Text>
        </View>
      )
    }
  }

  return (
    <FlatList
      style={{ backgroundColor: 'white' }}

      ListHeaderComponent={<>
        <View style={styles.boxImg}>
          <View style={styles.imgContainer}>
            <Image style={{ width: '100%', height: 250 }} source={{ uri: image }} />
          </View>
        </View>

        {/* cross button */}
        <View>
            <View style={styles.outerCrossBtn}>
            {/* <Entypo name="circle-with-cross" size={26} color="white" /> */}
            <Ionicons name="chevron-back" size={26} color="white" style={styles.crossBtn} onPress={() => goBack()}/>
            </View>
         </View>

        <View style={styles.view}>
          <View style={{ paddingLeft: 20, paddingBottom: 10, width: '90%', paddingTop: 15 }}>
            <Text style={styles.name}>{title}</Text>
          </View>

          <View>
            <Text style={styles.btmRec}>Food Recommendations</Text>
            <FlatList
              data={list}
              renderItem={_renderItem}
              keyExtractor={(item, index) => (index.toString())}
              horizontal={true}
              initialNumToRender={2}
              maxToRenderPerBatch={4}
            />
          </View>
          
          <View>
            <View >

              <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
                <Ionicons name="ios-pin" size={24} color="#ff5959" style={{ top: 7 }} />
                <View style={{ paddingLeft: 15, width: 300 }}>
                  <Text style={{ color: 'grey' }}>Address</Text>
                  <Text style={{ color: '#2f2f2f', fontFamily: 'latoB', lineHeight: 30 }}>{add}</Text>
                </View>
              </View>

              {renderIf(time)(

                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
                  <Ionicons name="ios-time" size={24} color="#1c1c1d" style={{ top: 7 }} />
                  <View style={{ paddingLeft: 15, width: 300 }}>
                    <Text style={{ color: 'grey' }}>Opening Hours</Text>
                    <Text style={{ color: '#2f2f2f', fontFamily: 'latoB', lineHeight: 30 }}>{time}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={{paddingTop: 25}}>
            <Text style={styles.btmRec}>How to get there?</Text>

            <View style={{ alignItems: 'center', paddingTop:10 }}>
              <View style={styles.desContent}>
                <TouchableOpacity style={styles.mapcontainer} onPress={() => Linking.openURL('http://maps.google.com/maps?daddr=' + lat + '+' + long)}>
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
                    }} />

                  </MapView>
                </TouchableOpacity>
                {/* <Text style={{paddingTop:5, fontSize: 10}}>*Use two fingers to tap on the map to view GPS</Text> */}
              </View>
            </View>
          </View>
        </View>
      </>}
    />
  );
}



const styles = StyleSheet.create({

  view: {
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    top: -27
  },
  boxImg: {
    alignItems: 'center',
  },
  img: {
    resizeMode: 'cover',
    width: '90%',
    height: "90%",
    borderRadius: 4,
    overflow: 'hidden',
  },
  imgContainer: {
    width: "100%",
    alignItems: 'center',
  },
  name: {
    paddingBottom: 10,
    fontSize: 21,
    fontFamily: 'latoB'
  },
  desc: {
    fontFamily: 'latoB',
    fontSize: 16,
    paddingBottom: 5,
  },
  rec: {
    fontFamily: 'sat',
    fontSize: 14,
    textAlign: 'center',
    color: '#3a3b3c',
  },
  descDirection: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10
  },
  desContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
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
    color: '#FF4343'
  },
  transportText: {
    paddingLeft: 10,
    fontSize: 14,
    paddingBottom: 15,
    color: '#2f2f2f',
    fontFamily: 'latoR'
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  itemStyle: {
    // shadow 
    shadowOffset: { width: 12, height: 12 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#f6f6f6",
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 250,
    flex: 1,
    margin: 10,
    borderRadius: 12,

  },
  btmRec: {
    paddingLeft: 20,
    fontFamily: 'latoB',
    fontSize: 16,
    bottom: -2
  },
  crossBtn:{
    justifyContent:'center',
    alignSelf:'center',
  },
  outerCrossBtn: {
    height:40, width: 40, backgroundColor:'red',
    flexDirection: 'row',
    position: 'absolute',
    top: -210,
    left: 20,
    margin: 3,
    justifyContent:'center',
    alignSelf:'center',
    backgroundColor: '#3d3d3d96',
    borderRadius: 20,
  }
});
