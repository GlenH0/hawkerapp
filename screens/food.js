import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, Image, BackHandler,Alert, ScrollView, FlatList, Keyboard } from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

import { Searchbar } from 'react-native-paper';
import firebase from '../firebase/fb'
import renderIf from 'render-if';
import { runInContext, shuffle } from "lodash";

import {globalStyles} from '../styles/global';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
 
export default function Food({navigation}) {
  
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to exit?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   // return () => backHandler.removeEventListener("hardwareBackPress", handleBackButton);
  // }, []);

  const [list, setList] = useState([])
  const [memory, setMemory] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loaded, setLoaded] = useState(false)

  const NoData = ({ item }) => {
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{ padding: 10 }}>Ops! No results found</Text>
            {/* <Image
        style={{width: "80%", height: "80%", resizeMode:'contain'}}
        source={{
          uri: 'https://www.buzzdine.com/img/not-found.png',
        }}
      /> */}
          </View>
    );
  };
  

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

  const imageLoaded = () => {
    setLoaded(true)
  }

  const _renderItem = ({item, index}) => {
     if(searchText !== ''){
      return (
        <View key={item.key} style={{flex:1, backgroundColor:'white',}}>
          <View>
            <TouchableOpacity style={globalStyles.itemStyle} onPress={() => navigation.navigate('break', item )}>
              <Image key={item.key} style={globalStyles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' onLoadStart={imageLoaded}/>
            </TouchableOpacity>
          </View>
    
          <Text key={item.key} numberOfLines={1} style={globalStyles.foodTitle}>{item.title}</Text>
        </View>
      )
     }
  }

  useEffect(() => {
    firebase.database().ref('foodBreak').on('value', (snapshot) => {
      
      var li = []
      snapshot.forEach((child) => {
        li.push({
          key: child.val().key,
                title: child.val().title,
                image: child.val().image,
                image2: child.val().image2,
                image3: child.val().image3,
                video: child.val().video,
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
                place:child.val().place,
                description: child.val().description,
                descriptionIndex: child.val().descriptionIndex
        })
      })
      setList(li)
      setMemory(li)
    })
  }, [])

    // when clear text, will return to top of page
    const flatListRef = useRef(0)

    useEffect(()=>{   
        if(flatListRef.current){
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }    
    })

    return (
      
      <View style={{backgroundColor:"white",  height: '100%'}}>
        {/* search bar */}
         <Searchbar
            placeholder="What are you craving?"
            onChangeText={(text) => handleSearch(text)}
            value={searchText}
            style={{borderRadius: 20, width: "95%", alignSelf:'center', marginTop:15}}
            
          />
          {/* item count */}
          {
            renderIf(searchText)(
              <View style={{flexDirection:'row', padding: 10}}> 
                <Text style={globalStyles.foodNum}>{list.length}</Text>
                <Text style={globalStyles.foodNumText}> food items available</Text>
              </View>
            )
          }
        
              <FlatList 
                data={shuffle(list)}
                renderItem={_renderItem}
                keyExtractor={(item, index)=> (index.toString())}
                numColumns= {numColumns}
                onScrollBeginDrag={Keyboard.dismiss}
                ref={flatListRef}
                style={searchText?{backgroundColor:"white", width: "100%"}:null}
                initialNumToRender={4}
                maxToRenderPerBatch={10}
                ListEmptyComponent={NoData}

                ListHeaderComponent={ <>  
                    <View>
          
                      {
                        renderIf(!searchText)(
                          
                          <ScrollView>
                          <View  style={styles.container}>
                          <TouchableOpacity onPress={() => navigation.navigate('Breakfast')}>
                            <View style={styles.responsiveBox}>                  
                                <Image source={require('../assets/bannerBreakfast.png')} style={styles.image}/>
                                {/* <Text style={styles.text}>BREAKFAST</Text> */}
                            </View>
                          </TouchableOpacity>
                        
                          <TouchableOpacity onPress={() => navigation.navigate('Lunch/Dinner')}>
                            <View style={styles.responsiveBox}>                  
                                <Image source={require('../assets/lunch.png')} style={styles.image}/>
                                {/* <Text style={styles.text}>LUNCH/DINNER</Text> */}
                            </View>
                          </TouchableOpacity>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Dessert')}>
                            <View style={styles.responsiveBox }>                  
                                <Image source={require('../assets/des.png')} style={styles.image}/>
                                {/* <Text style={styles.text}>DESSERT</Text> */}
                            </View>
                          </TouchableOpacity>
                        
                          <TouchableOpacity onPress={() => navigation.navigate('Drink')}>
                            <View style={styles.responsiveBox}>                  
                                <Image source={require('../assets/dri.png')} style={styles.image}/>
                                {/* <Text style={styles.text}>DRINKS</Text> */}
                            </View>
                          </TouchableOpacity>
                          </View>
                        
                        </ScrollView>
                        )
                      }
                    </View>
                  
               </> }
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
    height: HEIGHT
  },
  responsiveBox: {
    width: widthPercentageToDP('95%'),
    height: heightPercentageToDP('22%'),
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 0,
  },
  text: {
    position: 'absolute',
    color: 'white',
    textAlign:'center',
    top: '45%',
    left: 0,
    right: 0,
    fontSize: 22,
    fontFamily: 'sat'
  },
  image:{
      width:'100%',
      height: '100%',
      backgroundColor:'black',
      borderRadius: 10,
      overflow: "hidden",
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