import React, {useState} from 'react'
import { render } from 'react-dom';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Button, Image} from 'react-native';
import {dataList} from '../array/data';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default class Filter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dataList
      };
    }

    // onPress=()=>{
    //     const newData = this.state.dataList.filter((item)=>{
    //       return item.rating == '3';
    //     })
    //     this.setState({
    //     dataList: newData
    //     });
    //   }

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
  
    render() {
      return (
        <View style={styles.container}>
         
         {/* <Button
          onPress={this.onPress}
          title="Click here to filter"
          color="#841584"
          /> */}
         
         <FlatList
            data={dataList.filter(data => data.status === 'Halal').map(filteredData =>(filteredData))}
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
        width: Dimensions.get('window').width / 3.5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor:'red',
        padding: 10,
        justifyContent: 'center'
    },
    btnTabActive:{
        backgroundColor: 'blue'
    }
})