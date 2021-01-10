import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity, Button } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useState } from 'react/cjs/react.development';
import {lunchData} from '../array/dataLunch';
import renderIf from 'render-if';
import { NavigationContainer } from '@react-navigation/native';

import { shuffle } from "lodash";

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
     
      return (
        <View style={{flex:1}}>
         
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
              <Image style={styles.img} source={item.image}/>
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={{paddingLeft:10}}>{item.key}</Text>
          <Image style={{marginLeft:9}} source={item['rating']} />

        </View>
      )
     
    }
  
    render(){
      const filteredData = this.state.searchText
      ? lunchData.filter(x =>
          x.key.toLowerCase().includes(this.state.searchText.toLowerCase())
        )
      : lunchData;

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

          {renderIf(lunchData === filteredData)(
            <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('filterLunch')}
            style={styles.btnTab}
            >
              <Text>Halal</Text>
            </TouchableOpacity>
          </View>
          )}

          {renderIf(filteredData == '')(
            <View>
              <Text style={{padding: 10}}>Ops! No results found</Text>
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
