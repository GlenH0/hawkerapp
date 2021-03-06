import React, { useState } from 'react'
import { render } from 'react-dom';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Button, Image, Animated } from 'react-native';
import { dessertData } from '../array/dataDessert'
import firebase from '../firebase/fb'
import { shuffle } from "lodash";
import { FontAwesome5 } from '@expo/vector-icons';

const numColumns = 1
const WIDTH = Dimensions.get("window").width;

// const numOfFood = 3;
// const random = Math.ceil(Math.random() * numOfFood)

export default class FilterDessert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      num:1,
      lastRefresh: Date(Date.now()).toString(),
      animatedValue: new Animated.Value(0)
    };
    this.refreshScreen = this.refreshScreen.bind(this)
  }

  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
    Animated.sequence([
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.animatedValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    ]).start()
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>

        <View>
          <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
            <Image style={styles.img} source={{uri: item.image}} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={{ paddingLeft: 10, paddingBottom: 10 }}>{item.title}</Text>
        {/* <Image style={{ marginLeft: 9 }} source={item.rating} /> */}

      </View>
    )
  }

  componentDidMount() {
    firebase.database().ref('foodBreak').once('value').then(snapshot=> {
      var li = []
      snapshot.forEach((child) => {
        if(child.val().food_id != "3"){
          li.push({
            title: child.val().title,
            image: child.val().image,
            image2: child.val().image2,
            video: child.val().video,
            subpage: child.val().subpage,
            subpageadd: child.val().subpageadd,
            subpageimg: child.val().subpageimg,
            subpagetime: child.val().subpagetime,
            subpagelat: child.val().subpagelat,
            subpagelong: child.val().subpagelong,
            subpagephone: child.val().subpagephone,
            // rating: child.val().rating,
            type: child.val().type,
            foodtype: child.val().foodtype
          })
        }
      })
      this.setState({ list: li})
    })  
  }
  
  render() {
    const rotation = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
    const animatedStyle = {
      transform: [
        {rotate: rotation}
      ]
    }
    return (
      <View style={styles.container}>
        <Text style={{padding:10}}> <Text style={{fontWeight:'bold'}}>10</Text> food items available</Text>
        <FlatList
        // this was previous halal filter
          // data={dessertData.filter(data => data.status === 'Halal').map(filteredData => (filteredData))}
          data={shuffle(this.state.list).slice(0,10)}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => (index.toString())}
          numColumns={numColumns}  
          ref={(ref) => { this.flatListRef = ref; }}
        />
      {/* randomiser button */}
      <View style={{justiftyContent:"center", alignItems:"center"}}>
          <TouchableOpacity onPress={this.refreshScreen} style={styles.dice}>
            <Animated.View style={animatedStyle}>
              <FontAwesome5 name="dice-three" size={44} color="white" style={{ left:0, padding: 10, }}/>
            </Animated.View>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    height: 250,
    borderRadius: 12

  },
  itemText: {
    color: 'white',
    fontSize: 30
  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10,

  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'red',
    padding: 10,
    justifyContent: 'center'
  },
  btnTabActive: {
    backgroundColor: 'blue'
  },
  dice: {
    position:'absolute', 
    zIndex:100, 
    bottom:30, 
    right: 0, 
    backgroundColor:'#ff5959',
    borderBottomLeftRadius: 10, 
    borderTopLeftRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
  }
})