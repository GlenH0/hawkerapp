import firebase from '../firebase/fb'
import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, Keyboard, InteractionManager } from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

import _ from 'lodash'

import {globalStyles} from '../styles/global';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const numColumns = 2

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchText: '',
      check: false,
      active: null,
      interactionsComplete: false,
      loaded: false,
      place: 'all'
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

  filter = () => {  
    if(this.state.place == 'west'){
     this.setState({ list: this.state.filterList.filter(x => x.key < 109), inMemory:  this.state.filterList.filter(x => x.key < 109)})
    }
    else if(this.state.place =='east'){
     this.setState({ list: this.state.filterList.filter(x => x.key > 109 && x.key < 195), inMemory:  this.state.filterList.filter(x => x.key > 109 && x.key < 195)})
    }
    else if(this.state.place =='all'){
     this.setState({ list: this.state.memoryList, inMemory: this.state.memoryList})
    }
    else if(this.state.place =='north'){
     this.setState({ list: this.state.filterList.filter(x => x.key > 195 && x.key < 222), inMemory: this.state.filterList.filter(x => x.key > 195 && x.key < 222) })
    }
    else if(this.state.place =='central'){
     this.setState({ list: this.state.filterList.filter(x =>  x.key > 223), inMemory:this.state.filterList.filter(x =>  x.key > 223) })
    }
}

  async componentDidMount() {
    
   await InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        firebase.database().ref('foodBreak').on('value', (snapshot) => {
          var li = []
          snapshot.forEach((child) => {
            if(child.val().food_id == "3"){
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
          this.setState({ list: li, inMemory: li, filterList: li, memoryList: li  })
          this.setState({interactionsComplete: true});
        })
      }, 300);
    });
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSearch = (text) => {
    
    const filter = this.state.inMemory.filter(
      list => {
        let title = list.title.toLowerCase()
        let search = text.toLowerCase()

        return title.indexOf(search) > -1
      }
    )
    this.setState({ list: filter, searchText: text})
 
  this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
}

  handleFilter = () => {
    this.setState({ check: true })
    if (this.state.check == true) {
      this.setState({ list: this.state.inMemory, check: false })
    }
    this.setState({ active: null })
  }

  handleHalal = () => {
    this.setState({ list: this.state.inMemory.filter(x => x.type === 'halal') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 1 })
  }

  handleFoodType = () => {
    // this.setState({list: this.state.inMemory, check: false})
    this.setState({ list: this.state.inMemory.filter(x => x.foodtype === 'noodle') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 0 })
  }

  handleFoodRice = () => {
    // this.setState({list: this.state.inMemory, check: false})
    this.setState({ list: this.state.inMemory.filter(x => x.foodtype === 'rice') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 2 })
  }

  handleFoodTypeW = () => {
    // this.setState({list: this.state.inMemory, check: false})
    this.setState({ list: this.state.inMemory.filter(x => x.foodtype === 'western') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 3 })
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
                  placeholder="What's in mind today?"
                  onChangeText={(text) => this.handleSearch(text)}
                  value={this.state.searchText}
                  style={{borderRadius: 20, width: "95%", alignSelf:'center', margin:5}}
                />
              )
            }
          </View>
        </View>

        {renderIf(this.state.searchText == '')(
          <View>
          <Text style={{ paddingLeft: 10, paddingTop: 10, fontFamily: 'latoR', color: '#808080' }}>Suggested filters:</Text>
          
          <View style={{flexDirection:"row", width:"100%"}}>
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
                style={{backgroundColor: 'white', width:120, alignSelf:'center', margin: 7.5, top:3}}
                itemStyle={{
                    justifyContent: 'flex-start', height: 40
                }}
                activeLabelStyle={{color:"#ff5959"}}
                labelStyle={{color: "black"}}
                dropDownStyle={{backgroundColor: 'white', width:120, alignSelf:'center'}}
                onChangeItem={(item) => this.setState({
                    place: item.value
                },this.filter)} 
                
            />
          </View>
        </View>
        )}

       

        <View style={{flexDirection:'row', padding: 10}}> 
          <Text style={globalStyles.foodNum}>{this.state.list.length}</Text>
          <Text style={globalStyles.foodNumText}> food items available</Text>
        </View>

        {renderIf(this.state.list == '')(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{ padding: 10 }}>Ops! No results found</Text>
            {/* <Image
        style={{width: "80%", height: "80%", resizeMode:'contain'}}
        source={{
          uri: 'https://www.buzzdine.com/img/not-found.png',
        }}
      /> */}
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
          initialNumToRender={4}
          maxToRenderPerBatch={8}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({

});
