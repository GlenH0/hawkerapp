import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useState } from 'react/cjs/react.development';
import {dataList} from '../array/data';
import Filter from '../filter/filter';

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
      return (
        <View style={{flex:1}}>
         
          <View>
            <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
              <Image style={styles.img} source={item.image}/>
            </TouchableOpacity>
          </View>

          <Text style={{paddingLeft:10}}>{item.key}</Text>
          <Image style={{marginLeft:9}} source={item.rating} />

        </View>
      )
    }
  
    render(){
      const filteredData = this.state.searchText
      ? dataList.filter(x =>
          x.key.toLowerCase().includes(this.state.searchText.toLowerCase())
        )
      : dataList;

      
      return (
        <View style={styles.container}>
         
         <Searchbar
          placeholder="Search..."
          
          onChangeText={text => this.setState({ searchText: text })}
            value={this.state.searchText}
        />
          {/* <Filter/> */}

            <FlatList
            data={filteredData}
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
      width: Dimensions.get('window').width/3.5,
      flexDirection:'row',
      borderWidth: 0.5,
      borderColor: '#ebebeb',
      padding: 10,
      justifyContent:'center'
    },
    btnTabActive:{
      backgroundColor:'red'
    }
  });
