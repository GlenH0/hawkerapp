import firebase from '../firebase/fb'
import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, Keyboard, InteractionManager } from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

import _ from 'lodash'

import {globalStyles} from '../styles/global';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchText: '',
      check: false,
      active: null,
      interactionsComplete: false,
      loaded: false
    }
    this._isMounted = false;
  }

  imageLoaded = () => {
    this.setState({ loaded: true })
  }

  _renderItem = ({ item, index }) => {

    return (
      <View key={item.key} style={{ flex: 1 }}>

        <View>
          <TouchableOpacity style={globalStyles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
            <Image key={item.key} style={globalStyles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto' onLoadStart={this.imageLoaded}/>
          </TouchableOpacity>
        </View>      
        <Text key={item.key} numberOfLines={1} style={globalStyles.foodTitle}>{item.title}</Text>
      </View>
    )
  }

  componentDidMount() {
    
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        firebase.database().ref('foodBreak').on('value', (snapshot) => {
          var li = []
          snapshot.forEach((child) => {
            if(child.val().food_id == "4"){
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
            }
          })
          this.setState({ list: li, inMemory: li })
          this.setState({interactionsComplete: true});
        })
      }, 300);
    });
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // this is for loading screen
    if (!this.state.interactionsComplete) {
      return(
        <View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <Image style={{width: 100, height: 100, justifyContent:'center', alignItems:'center'}} source={{uri: 'https://static.wixstatic.com/media/f54231_d3dd84d75266417783445703b5659914~mv2.gif'}}/>
        </View>
      )
    }
    const { navigation } = this.props
    return (
      <View style={globalStyles.container}>

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <View style={{ width: '95%' }}>
            {
              renderIf(this.state.check == false)(
                <Searchbar
                  placeholder="What are you craving?"
                  onChangeText={(text) => this.handleSearch(text)}
                  value={this.state.searchText}
                  style={{borderRadius: 20, width: "95%", alignSelf:'center', margin:5}}
                />
              )
            }
          </View>
        </View>

        <View style={{flexDirection:'row', padding: 10}}> 
          <Text style={globalStyles.foodNum}>{this.state.list.length}</Text>
          <Text style={globalStyles.foodNumText}> food items available</Text>
        </View>

        {renderIf(this.state.list == '')(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{ padding: 10 }}>Ops! No results found</Text>
          </View>
        )}


        <FlatList style={{ width: '100%' }}
          data={shuffle(this.state.list)}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return item.key;
          }}
          numColumns={numColumns}
          ref={(ref) => { this.flatListRef = ref; }}
          onScrollBeginDrag={Keyboard.dismiss}
          initialNumToRender={3}
          maxToRenderPerBatch={10}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({

  
});
