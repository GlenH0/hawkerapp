import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity, Button } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useState } from 'react/cjs/react.development';
import {dataList2} from '../array/dataCentre';
import renderIf from 'render-if';
import { NavigationContainer } from '@react-navigation/native';

const numColumns = 1
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
            <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('hawkerDetail', item)}>
              <Image style={styles.img} source={item.image}/>
            </TouchableOpacity>
          </View>

          <Text style={{paddingLeft:10, fontWeight:'bold'}}>{item.key}</Text>
          <Image style={{marginLeft:9}} source={item.rating} />

        </View>
      )
    }

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height:20,
            width: "100%",
          }}
        />
      );
    }
  
    render(){
      const filteredData = this.state.searchText
      ? dataList2.filter(x =>
          x.key.toLowerCase().includes(this.state.searchText.toLowerCase())
        )
      : dataList2;

      const {navigation} = this.props

      return (
        <View style={styles.container}>
         
         <View style={{justifyContent:'center', alignItems:'center', paddingTop: 10}}>
          <View style={{width: '95%'}}>
            
            <Searchbar
              placeholder="Search for Hawker..."
              onChangeText={text => this.setState({ searchText: text })}
              value={this.state.searchText}
              style={{marginBottom: 10}}
            />
          </View>
         </View>

          {renderIf(filteredData == '')(
            <View>
              <Text style={{padding: 10}}>Ops! No results found</Text>
            </View>
          )}
          
            <FlatList
            data={filteredData}
            renderItem={this._renderItem}
            keyExtractor={(item, index)=> (index.toString())}
            ItemSeparatorComponent = { this.FlatListItemSeparator }
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
      marginTop: 0,
      height: WIDTH/2,    
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
