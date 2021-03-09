import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, Keyboard, ScrollView } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { Searchbar } from 'react-native-paper';
import firebase from '../firebase/fb'
import renderIf from 'render-if';
import { shuffle } from "lodash";

const numColumns = 2
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Centre({ navigation }) {

  const [list, setList] = useState([])
  const [memory, setMemory] = useState([])
  const [searchText, setSearchText] = useState('')


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
    // flatListRef.scrollToOffset({ animated: true, offset: 0 });

  }

  const _renderItem = ({ item, index }) => {
    if (searchText !== '') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => navigation.navigate('hawkerDetail', item)}>
              <Image style={styles.img} source={{ uri: item.image }} />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={{ padding: 15, paddingTop: 0, paddingBottom: 15 }}>{item.title}</Text>
        </View>
      )
    }
  }

  useEffect(() => {
    firebase.database().ref('hawker').on('value', (snapshot) => {

      var li = []
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          title: child.val().title,
          image: child.val().image,
          add: child.val().add,
          lat: child.val().lat,
          long: child.val().long,
          time: child.val().time,
          place: child.val().place,
        })
      })
      setList(li)
      setMemory(li)
    })
  }, [])

  // when clear text, will return to top of page
  const flatListRef = useRef(0)

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  })

  return (
    <View>
      {/* search bar */}
      <Searchbar
        placeholder="Search for Hawker..."
        onChangeText={(text) => handleSearch(text)}
        value={searchText}
        style={{ borderRadius: 20, width: "95%", alignSelf: 'center', margin: 5 }}

      />

      <FlatList
        data={shuffle(list)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => (index.toString())}
        numColumns={numColumns}
        onScrollBeginDrag={Keyboard.dismiss}
        ref={flatListRef}

        ListHeaderComponent={<>
          <View>

            {
              renderIf(!searchText)(

                <ScrollView>
                  <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('North')}>
                      <View style={styles.responsiveBox}>
                        <Image source={require('../assets/amk.png')} style={styles.image} />
                        {/* <Text style={styles.text}>NORTH</Text> */}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('NorthE')}>
                      <View style={styles.responsiveBox}>
                        <Image source={require('../assets/Chomp-Chomp-1.jpg')} style={styles.image} />
                        {/* <Text style={styles.text}>NORTH EAST</Text> */}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Central')}>
                      <View style={styles.responsiveBox}>
                        <Image source={require('../assets/bugis.png')} style={styles.image} />
                        {/* <Text style={styles.text}>CENTRAL</Text> */}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('East')}>
                      <View style={styles.responsiveBox}>
                        <Image source={require('../assets/bed.png')} style={styles.image} />
                        {/* <Text style={styles.text}>EAST</Text> */}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('West')}>
                      <View style={styles.responsiveBox}>
                        <Image source={require('../assets/blhawk.png')} style={styles.image} />
                        {/* <Text style={styles.text}>WEST</Text> */}
                      </View>
                    </TouchableOpacity>

                  </View>

                </ScrollView>
              )
            }
          </View>

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
    height: HEIGHT * 1.05
  },
  responsiveBox: {
    width: widthPercentageToDP('95%'),
    height: heightPercentageToDP('18%'),
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 0,
    top: -25,
  },
  text: {
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
    top: '35%',
    left: 0,
    right: 0,
    fontSize: 32,
    fontFamily: 'jetbrains-var'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: "hidden"
  },
  itemStyle: {
    // shadow 
    shadowOffset: { width: 12, height: 12 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    flex: 1,
    margin: 10,
    height: WIDTH / numColumns,
    borderRadius: 12

  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10,

  }
});