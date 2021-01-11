import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity, Button } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useState } from 'react/cjs/react.development';
import {dataList} from '../array/data';
import renderIf from 'render-if';
import { NavigationContainer } from '@react-navigation/native';

import { shuffle } from "lodash";



// const dataList = [
//   {
//     key: 'Prata', 
//     title:"Prata",
//     image: require('../assets/Breakfast/prata.png'),
//     text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
//     video: 'RSzITFbOtpQ',
//     rating: 4,
//   }, 
//   {
//     key: 'Chew', 
//     title:"hi",
//     text:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//     rating: 3,
//   }, 
//   {key: 'Chicken'}, {key: '4'},
//   {key: '1', title:"hi"}, 
//   {key: '2'}, 
//   {key: '3'}, 
//   {key: '3'}, 
//     ]

const numColumns = 2
const WIDTH = Dimensions.get("window").width;



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
   
  }
    _renderItem = ({item, index}) => {
     if(item["category"] === 'breakfast'){
      return (
        <View style={{flex:1}}>
         
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
              <Image style={styles.img} source={item.image}/>
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={{paddingLeft:10, fontFamily:'latoB'}}>{item.key}</Text>
          <Image style={{marginLeft:9}} source={item.rating} />

        </View>
      )
     }
    }
  
    render(){
      const filteredData = this.state.searchText
      ? dataList.filter(x =>
          x.key.toLowerCase().includes(this.state.searchText.toLowerCase())
        )
      : dataList;

      const {navigation} = this.props

      return (
        <View style={styles.container}>
         
         <View style={{justifyContent:'center', alignItems:'center', paddingTop: 10}}>
          <View style={{width: '95%'}}>
            
            <Searchbar
              placeholder="What's in mind today?"
              onChangeText={text => this.setState({ searchText: text })}
              value={this.state.searchText}
            />
          </View>
         </View>

          {renderIf(dataList === filteredData)(
            <View>
              <Text style={{paddingLeft: 10, paddingTop: 10, fontFamily:'latoR', color:'#808080'}}>Suggested filters:</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('filter')}
            style={styles.btnTab}
            >
              <Text style={{fontFamily:'latoR'}}>Halal</Text>
            </TouchableOpacity>
          </View>
          )}

          {renderIf(filteredData == '')(
            <View>
              <Text style={{padding: 20, fontFamily:'latoB', color:'#2f2f2f'}}>Ops! No results found</Text>
            </View>
          )}
          
            <FlatList
            data={shuffle(filteredData)}
            renderItem={this._renderItem}
            keyExtractor={(item, index)=> (index.toString())}
            numColumns={numColumns}
          />
          
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    
    container:{
      flex: 1,
 
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
      
    },
    itemText: {
      color: 'white',
      fontSize: 30
    },
    img:{
      resizeMode:'cover',
      width: '100%',
      height:'100%',
      overflow:'hidden',
      borderRadius: 10,
      
    },
    btnTab:{
      width: 70,
      flexDirection:'row',
      padding: 10,
      justifyContent:'center',
      backgroundColor:'white',
      borderRadius:30,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    }
  });
