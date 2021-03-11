import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, Keyboard, ScrollView, } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { Searchbar } from 'react-native-paper';
import firebase from '../firebase/fb'
import renderIf from 'render-if';
import { shuffle } from "lodash";

import {globalStyles} from '../styles/global';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default function Centre({ navigation }) {

  const [list, setList] = useState([])
  const [memory, setMemory] = useState([])
  const [searchText, setSearchText] = useState('')
  

  useEffect(() => {
    firebase.database().ref('hawker').on('value', (snapshot) => {
      var li = []
      snapshot.forEach((child) => {
        li.push({
          key: child.val().key,
          title: child.val().title,
          image: child.val().image,
          add: child.val().add,
          lat: child.val().lat,
          long: child.val().long,
          time: child.val().time,
          place: child.val().place,
          rank: child.val().rank
        })
      })
      setList(li)
      setMemory(li)
    })
  }, [])

  const handleSearch = (text) => {

    const filter = memory.filter(
      list => {
        let title = list.title.toLowerCase()
        let search = text.toLowerCase()

        return title.indexOf(search) > -1
      }
    )
    setSearchText(text)
    setList(filter)
  }

  const _renderItem = ({ item, index }) => {
    if (searchText !== '') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          <View>
            <TouchableOpacity style={styles.itemStyle1} onPress={() => navigation.navigate('hawkerDetail', item)}>
              <Image style={styles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={{padding: 15, paddingTop: 0, paddingBottom: 15}}>{item.title}</Text>
        </View>
      )
    }
  }

  const _renderItem1 = ({ item, index }) => {
    // for west
    if (item.key < 14 && item.rank == 'best') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => navigation.navigate('hawkerDetail', item)}>
            <Image style={styles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={styles.foodName}>{item.title}</Text>
        </View>
      )
    }
  }

  const _renderItem2 = ({ item, index }) => {
    // for east
    if (item.key > 13 && item.rank == 'best' || item.rank == 'best10') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => navigation.navigate('hawkerDetail', item)}>
            <Image style={styles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={styles.foodName}>{item.title}</Text>
        </View>
      )
    }
  }

  const _renderItem5 = ({ item, index }) => {
    if (item.rank == 'best10') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          <View>
            <TouchableOpacity style={styles.itemStyle2} onPress={() => navigation.navigate('hawkerDetail', item)}>
              <Image style={styles.img} source={{ uri: item.image }} />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={styles.foodName}>{item.title}</Text>
        </View>
      )
    }
  }


  // when clear text, will return to top of page
  // const flatListRef = useRef(0)

  // useEffect(() => {
  //   if (flatListRef.current) {
  //     flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  //   }
  // })

  return (
    <View style={{ backgroundColor: 'white' }}>

      {/* search bar */}
      <Searchbar
        placeholder="Search for Hawker..."
        onChangeText={(text) => handleSearch(text)}
        value={searchText}
        style={{ borderRadius: 20, width: "95%", alignSelf: 'center', margin: 5}}
      />

      <FlatList
        data={shuffle(list)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => {
          return item.key;
        }}
        numColumns={numColumns}
        onScrollBeginDrag={Keyboard.dismiss}
        // ref={flatListRef}
        extraData={useState([])}

        ListHeaderComponent={<>
         {
           renderIf(searchText === '')(
            <View>
              <View>
              <ScrollView horizontal={true}>

              <View style={styles.container}>
       
                  <TouchableOpacity onPress={() => navigation.navigate('North')}>
                    <View style={styles.responsiveBox}>
                      <Image source={require('../assets/amk.png')} style={styles.image} />
                    </View>
                    <Text style={styles.text}>North</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('NorthE')}>
                    <View style={styles.responsiveBox}>
                      <Image source={require('../assets/Chomp-Chomp-1.jpg')} style={styles.image} />
                    </View>
                    <Text style={styles.text}>North East</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('Central')}>
                    <View style={styles.responsiveBox}>
                      <Image source={require('../assets/bugis.png')} style={styles.image} />
                    </View>
                    <Text style={styles.text}>Central</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('East')}>
                    <View style={styles.responsiveBox}>
                      <Image source={require('../assets/bed.png')} style={styles.image} />
                    </View>
                    <Text style={styles.text}>East</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('West')}>
                    <View style={styles.responsiveBox}>
                      <Image source={require('../assets/blhawk.png')} style={styles.image} />
                    </View>
                    <Text style={styles.text}>West</Text>
                  </TouchableOpacity>

                  
                  
                </View>
              </ScrollView>

          <View
            style={{
              borderBottomColor: '#e3e5e5',
              borderBottomWidth: 1,
            }}
          />
        </View>
         
              <View>
              <Text style={styles.title}>Best Hawker Centres</Text>
              <FlatList
                data={shuffle(list)}
                renderItem={_renderItem5}
                keyExtractor={(item, index) => (index.toString())}
                onScrollBeginDrag={Keyboard.dismiss}
                horizontal={true}
                extraData={useState}
                removeClippedSubviews
              />
              <View
                style={{
                  borderBottomColor: '#e3e5e5',
                  borderBottomWidth: 1,
                }}
              />
            </View>

              <View>
              <Text style={styles.title}>West Side Favourites</Text>
              <FlatList
                data={shuffle(list)}
                renderItem={_renderItem1}
                keyExtractor={(item, index) => (index.toString())}
                onScrollBeginDrag={Keyboard.dismiss}
                horizontal={true}
                extraData={useState}
                removeClippedSubviews
              />
              <View
                style={{
                  borderBottomColor: '#e3e5e5',
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.title}>East Side Finest</Text>
              <FlatList
                data={shuffle(list)}
                renderItem={_renderItem2}
                keyExtractor={(item, index) => (index.toString())}
                onScrollBeginDrag={Keyboard.dismiss}
                horizontal={true}
                extraData={useState}
                removeClippedSubviews
              />
              <Text></Text>
              <Text></Text>
            </View>
            </View>
           )
         }
        </>}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 25,
    
  },
  responsiveBox: {
    width: widthPercentageToDP('32.4%'),
    height: heightPercentageToDP('9.6%'),
    justifyContent: 'space-around',
    margin: 5,
    top: 10,
    marginRight: -13,
    marginLeft: -10,
  },
  text: {
    // position: 'absolute',
    color: '#676767',
    textAlign: 'center',
    margin: 5,
    fontSize: 12,
    fontFamily: 'latoB',
    right: 26,
    top: 5
  },
  image: {
    width: '60%',
    height: '100%',
    borderRadius: 100,
    overflow: "hidden"
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
    flex: 1,
    margin: 10,
    height: 170,
    width: 170,
    borderRadius: 12,
    marginRight: 0
  },
  itemStyle1: {
    // shadow 
    shadowOffset: { width: 12, height: 12 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#f6f6f6",
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    flex: 1,
    margin: 10,
    height: WIDTH / 2,
    borderRadius: 12,
    marginRight: 0
  },
  itemStyle2: {
    // shadow 
    shadowOffset: { width: 12, height: 12 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#f6f6f6",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    height: 150,
    width: 200,
    borderRadius: 12,
    marginRight: 0
  },
  img: {
    resizeMode: 'cover',
    width: '90%',
    height: '90%',
    overflow: 'hidden',
    borderRadius: 10,

  },
  title: {
    fontFamily: 'latoB',
    paddingLeft: 15,
    backgroundColor: 'white',
    fontSize: 18,
    color: '#5a5a5a',
    paddingTop: 10
  },
  foodName: {
    paddingLeft: 15, 
    paddingBottom: 25, 
    width: 170,
    fontSize: 14,
    color:'#676767',
    fontFamily: 'latoB',
  }
});