import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Linking, Button } from "react-native";
import { globalStyles, images } from '../styles/global';
import Modal from 'react-native-modal';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';
import firebase from '../firebase/fb'

//fb icon
import { Entypo } from '@expo/vector-icons';
//location icon
import { MaterialIcons } from '@expo/vector-icons';
// opening hour icon
import { Ionicons } from '@expo/vector-icons';
// for unit no.
import { FontAwesome5 } from '@expo/vector-icons';

import ReadMore from 'react-native-read-more-text';

import { Rating, AirbnbRating } from 'react-native-ratings';

// for img in slider
const { width } = Dimensions.get("window");
const height = width * 0.65;

export default function Break({ route, navigation }) {
  const { phone, title, text, image, image2, link, video, rating, subpage, subpageimg, subpageadd, subpagetime, subpagephone, subpagelat, subpagelong, store, place, unit, description, descriptionIndex } = route.params;

  //Review API call here 

  var picture = [image, image2]

  // this is state equvilent in class
  const [state, setState] = useState(0)

  // for the dots
  scroll = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== state) {
      setState(slide);
    }
  }
  // this is for description (relation)
  const [list, setList] = useState([])
  useEffect(() => {
    firebase.database().ref('description').on('value', (snapshot) => {
      
      var li = []
      snapshot.forEach((child) => {
        li.push({
          // key: child.key,
          text: child.val().text,
          description: child.val().description,
          index: child.val().index
        })
      })
      setList(li)
    })
  }, [])

    // read more text
    renderTruncatedFooter = (handlePress) => {
      return (
        <Text style={{color: '#4286f4', marginTop: 5}} onPress={handlePress}>
          Read more
        </Text>
      );
    }
   
    renderRevealedFooter = (handlePress) => {
      return (
        <Text style={{color: '#4286f4', marginTop: 5}} onPress={handlePress}>
          Show less
        </Text>
      );
    }

  const DescriptionGroup = () => {
    return list.map(function (desGroup, i) {
      if (descriptionIndex == i) {
        return (
          <View key={i}>
            <View>
            <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}
                    >
                    <Text style={{padding: 10, paddingTop: 0}}>
                      {desGroup.text}
                    </Text>
                  </ReadMore>
            </View>
          </View>
        );
      }
    });
  }
  // for video pop out
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <ScrollView
          pagingEnabled
          horizontal={true}
          onScroll={scroll}
          showsHorizontalScrollIndicator={false}
          style={{ width, height }}
        >
          {/* this is if only 1 image */}
          {
            renderIf(!image2)(
              <Image style={styles.img} source={{ uri: image }} />
            )
          }
          {/* for > 1 images */}
          {
            renderIf(image2)(
              picture.map((item, index) => (
                <Image style={styles.img} key={index} source={{ uri: item }} />
              ))
            )
          }
        </ScrollView>
        <View style={styles.scrolldot}>
          {
            renderIf(image2)(
              picture.map((i, k) => (
                <Text key={k} style={k == state ? styles.dotsActive : styles.dots}>⬤</Text>
              ))
            )
          }
        </View>
      </View>

      <View style={styles.view}>
        <View style={{ paddingLeft: 20, paddingBottom: 10, width: '90%' }}>
          <Text style={styles.name}>{title}</Text>
          
        </View>

        <View
          style={{
            borderBottomColor: '#aeaeae',
            borderBottomWidth: 1,
            marginBottom: 12

          }}
        />

        <View style={{ alignItems: 'center' }}>
          <View style={styles.desContent}>
            <Text style={styles.desc}>Description</Text>
            {/* this is for description */}
            {
              renderIf(description)(
                <View>
                  <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}
                    >
                    <Text style={{padding: 10, paddingTop: 0}}>
                      {description}
                    </Text>
                  </ReadMore>
                </View>
              )
            }
            {
              renderIf(!description)(
                <DescriptionGroup />
              )
            }

            {/* phone */}
            {
              renderIf(phone)(
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                  <Entypo name="old-phone" size={24} color="black" style={{ top: 7 }} />
                  <View>
                    <Text style={{ color: 'grey' }}>    Phone</Text>
                    <Text style={{ color: '#4286f4', paddingTop: 3 }} onPress={() => { Linking.openURL('tel:' + phone); }}>    {phone}</Text>
                  </View>
                </View>
              )
            }
            {/* to include new variable unit */}
            {
              renderIf(unit)(
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                  <FontAwesome5 name="store" size={20} color="black" style={{ top: 7 }} />
                  <View style={{ paddingLeft: 15, width: 200 }}>
                    <Text style={{ color: 'grey' }}>Unit no.</Text>
                    <Text style={{ color: 'black', paddingTop: 3 }}>{unit}</Text>
                  </View>
                </View>
              )
            }
            {/* description/opening hr from dB */}
            {
              renderIf(text)(
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                  <Ionicons name="time-sharp" size={24} color="black" style={{ top: 7 }} />
                  <View style={{ paddingLeft: 15, width: 300 }}>
                    <Text style={{ color: 'grey' }}>Opening Hours</Text>
                    <Text style={{ color: '#2f2f2f', fontFamily: 'latoR', lineHeight: 30 }}>{text}</Text>
                  </View>
                </View>
              )
            }

            {/* socials */}
                <View style={{ width: 100, flexDirection: 'row' }}>
                  {/* fb */}
                  {
                    renderIf(link)(
                      <TouchableOpacity style={{ padding: 5 }}>
                        <Entypo name="facebook-with-circle" style={{ paddingLeft: 0 }} size={44} color="#3b5998" onPress={() => { Linking.openURL('fb://page/' + link); }} />
                      </TouchableOpacity>
                      )
                  }
                  {/* youtube */}
                 {
                   renderIf(video)(
                    <TouchableOpacity style={{ padding: 5 }}>
                      <Entypo name="youtube-with-circle" style={{ paddingLeft: 0 }} size={44} color="#c4302b" onPress={toggleModal} />
                    </TouchableOpacity>
                   )
                 }

                  {/* pop out for youtube video */}
                  <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1, top: 200 }}>
                     
                      <View style={{ alignItems: 'center' }}>
                        <View style={styles.videoContent}>
                          <View>
                            
                            <View style={{alignItems:'flex-end'}}>
                             <Entypo name="circle-with-cross" style={{textAlign:'right', flexDirection:'row'}} size={24} color="white" onPress={toggleModal}/>
                            </View>
                            <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Reviews</Text>
                          </View>
                          <YoutubePlayer
                            height={240}
                            videoId={video}
                            play={false}
                          />
                        </View>
                      </View>

                      {/* <Button title="Return"  /> */}
                      
                    </View>
                  </Modal>

                </View>
              
           
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.desContent}>
            <Text style={styles.desc}>Where to find them?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('hawkerDetail', {
              // key: subpage,
              title: subpage,
              image: subpageimg,
              add: subpageadd,
              time: subpagetime,
              phone: subpagephone,
              lat: subpagelat,
              long: subpagelong,
              place: place
            })}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="place" size={24} color="#c71521" />
                <Text style={{ color: '#4286f4', fontFamily: 'latoR', top: 4 }}>{subpage}</Text>
              </View>
            </TouchableOpacity >

            {
              renderIf(store)(
                <View style={{ alignItems: 'center' }}>
                  <Image style={styles.imgStore} source={store} />
                </View>
              )
            }
          </View>
        </View>
        {/* replacing with review soon... */}

        {/* <View style={{ alignItems: 'center' }}>
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
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  view: {
    padding: 10,
  },
  boxImg: {
    // alignItems:'center',

  },
  img: {
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  imgStore: {
    resizeMode: 'contain',
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',

  },
  imgContainer: {
    width: width,
    height: height
  },
  scrolldot: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    margin: 3
  },
  dots: {
    color: '#888',
    margin: 2
  },
  dotsActive: {
    color: 'white',
    margin: 2
  },
  name: {
    paddingTop: 10,
    fontSize: 24,
    fontFamily: 'playB',
    includeFontPadding: false,
    lineHeight: 35
  },
  desc: {
    fontFamily: 'playB',
    fontSize: 16,
    paddingBottom: 5
  },
  desContent: {
    width: '90%',
    padding: 10,

    backgroundColor: '#E2DEDE',
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
  rate: {
    fontFamily: 'latoB',
    fontSize: 16,
    textAlign: 'center'
  },
  rateText: {
    color: '#8d8d8d',
    textAlign: 'center',
    fontFamily: 'latoR'
  },
  videoContent: {
    width: '100%',
    justifyContent: 'center',
  },

});
