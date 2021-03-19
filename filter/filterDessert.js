import React, { useState } from 'react'

import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Button, Image, Animated } from 'react-native';

import firebase from '../firebase/fb'
import { shuffle } from "lodash";
import { FontAwesome5 } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const numColumns = 2

// const numOfFood = 3;
// const random = Math.ceil(Math.random() * numOfFood)

export default class FilterDessert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loaded: false,
      num:1,
      lastRefresh: Date(Date.now()).toString(),
      animatedValue: new Animated.Value(0),
      place: 'all'
    };
    this.refreshScreen = this.refreshScreen.bind(this)
  }

  imageLoaded = () => {
    this.setState({ loaded: true })
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
      <View key={item.key} style={{ flex: 1 }}>
        
        <View style={{height:180}}>
          <TouchableOpacity style={globalStyles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
            <Image key={item.key} style={globalStyles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' onLoadStart={this.imageLoaded} />
          </TouchableOpacity>
        </View>

        <Text key={item.key} numberOfLines={1} style={globalStyles.foodTitle}>{item.title}</Text>

      </View>
    )
  }

  filter = () => {  
       if(this.state.place == 'west'){
        this.setState({ list: this.state.inMemory.filter(x => x.key < 109) })
       }
       else if(this.state.place =='east'){
        this.setState({ list: this.state.inMemory.filter(x => x.key > 109 && x.key < 195) })
       }
       else if(this.state.place =='all'){
        this.setState({ list: this.state.list})
       }
       else if(this.state.place =='north'){
        this.setState({ list: this.state.inMemory.filter(x => x.key > 195 && x.key < 222) })
       }
       else if(this.state.place =='central'){
        this.setState({ list: this.state.inMemory.filter(x =>  x.key > 223) })
       }
  }


  componentDidMount() {
    firebase.database().ref('foodBreak').once('value').then(snapshot=> {
      var li = []
      snapshot.forEach((child) => {
       
            li.push({
              key: child.val().key,
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
              unit: child.val().unit,
              type: child.val().type,
              foodtype: child.val().foodtype,
              text: child.val().text,
              link: child.val().link,
              phone: child.val().phone,
              place:child.val().place,
              description: child.val().description,
              descriptionIndex: child.val().descriptionIndex,
              food_id: child.val().food_id
            })
      })
      this.setState({ list: li, inMemory: li })
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
      <View style={globalStyles.container}>
        <Text style={styles.top10}> Your 10 picks for today!</Text>

        <DropDownPicker
            items={[
                {label: 'All', value: 'all', icon: () => <Icon name="map-pin" size={18} color="#ff5959" onPress={this.filter}/>},
                {label: 'West', value: 'west', icon: () => <Icon name="map-pin" size={18} color="#ff5959" onPress={this.filter}/>},
                {label: 'East', value: 'east', icon: () => <Icon name="map-pin" size={18} color="#ff5959" onPress={this.filter}/>},
                {label: 'North', value: 'north', icon: () => <Icon name="map-pin" size={18} color="#ff5959" onPress={this.filter}/>},
                {label: 'Central', value: 'central', icon: () => <Icon name="map-pin" size={18} color="#ff5959" onPress={this.filter}/>},
            ]}
            defaultValue={this.state.place}
            containerStyle={{height: 50}}
            style={{backgroundColor: 'white', width:'50%', alignSelf:'center', marginBottom: 15}}
            itemStyle={{
                justifyContent: 'flex-start', height: 40
            }}
            activeLabelStyle={{color:"#ff5959"}}
            labelStyle={{color: "black"}}
            dropDownStyle={{backgroundColor: 'white', width:'50%', alignSelf:'center'}}
            onChangeItem={(item) => this.setState({
                place: item.value
            },this.filter)} 
            
        />
        

        <FlatList
          data={shuffle(this.state.list).slice(0,10)} 
          renderItem={this._renderItem}
          keyExtractor={(item, index) => (index.toString())}
          numColumns={numColumns}  
          ref={(ref) => { this.flatListRef = ref; }}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
        />
      {/* randomiser button */}
      <View style={{justiftyContent:"center", alignItems:"center"}}>
          <TouchableOpacity onPress={this.refreshScreen} style={styles.dice}>
            <Animated.View style={animatedStyle}>
              <FontAwesome5 name="dice-three" size={44} color="white" style={{ padding: 10, }}/>
            </Animated.View>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
 
  dice: {
    position:'absolute', 
    zIndex:100, 
    bottom:20, 
    right: 10, 
    backgroundColor:'#ff5959',
    // borderBottomLeftRadius: 10, 
    // borderTopLeftRadius: 10, 
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 10,
  },
  top10: {
    padding:20, 
    fontSize: 20, 
    fontFamily: 'play', 
    textAlign:'center',
  }
})