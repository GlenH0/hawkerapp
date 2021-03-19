import firebase from '../firebase/fb'
import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, ScrollView, InteractionManager } from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

import _ from 'lodash'

import {globalStyles} from '../styles/global';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default class FoodFilter extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchText: '',
      active: null,
      interactionsComplete: false,
      foodName: 'noodle',
      arrayFilter: []
    }
    this._isMounted = false;
  }

  _renderItem = ({ item, index }) => {

    return (
      <View key={item.key} style={{ flex: 1 }}>

        <View>
          <TouchableOpacity style={globalStyles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
            {/* potential fast loading solution for image */}
            <Image key={item.key} style={globalStyles.img} source={{ uri: item.image, cache: 'force-cache' }} transistion ={false} resizeMethod='resize'/>
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
            if(child.val().food_id == "1"){
              li.push({
                key: child.key,
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
        //   select noodle tab upon entering page
          this.setState({ list: this.state.inMemory.filter(x => x.foodtype === 'noodle')})
          this.setState({ active: 0 })
        })
      }, 300);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleHalal = () => {
    this.setState({ list: this.state.inMemory.filter(x => x.type === 'halal') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 1 })
    this.state.foodName = "halal"
  }

  handleFoodType = () => {
    // this.setState({list: this.state.inMemory, check: false})
    this.setState({ list: this.state.inMemory.filter(x => x.foodtype === 'noodle') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 0 })
    this.state.foodName = "noodle"
  }

  handleFoodRice = () => {
    // this.setState({list: this.state.inMemory, check: false})
    this.setState({ list: this.state.inMemory.filter(x => x.foodtype === 'rice') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 2 })
    this.state.foodName = "rice"
  }

  handleFoodTypeW = () => {
    // this.setState({list: this.state.inMemory, check: false})
    this.setState({ list: this.state.inMemory.filter(x => x.type === 'chicken') })
    // to scroll back up to the top
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ active: 3 })
    this.state.foodName = "chicken"
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
            {/* {
              renderIf(this.state.check == false)(
                <Searchbar
                  placeholder="What's in mind today?"
                  onChangeText={(text) => this.handleSearch(text)}
                  value={this.state.searchText}
                />
              )
            } */}
          </View>
        </View>

        {renderIf(this.state.searchText == '')(
          <View>
            <Text style={{ paddingLeft: 10, paddingTop: 10, fontFamily: 'latoR', color: '#808080' }}>Suggested filters:</Text>
            <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>

             
                <TouchableOpacity
                  onPress={this.handleFoodType}
                  style={this.state.active === 0 ? styles.btnActive : styles.btnTab }>
                  <Text style={this.state.active === 0 ? styles.textActive : styles.textNorm }>Noodle</Text>
                </TouchableOpacity>
            
             
                <TouchableOpacity
                  onPress={this.handleHalal}
                  style={this.state.active === 1 ? styles.btnActive : styles.btnTab }>
                  <Text style={this.state.active === 1 ? styles.textActive : styles.textNorm }>Halal</Text>
                </TouchableOpacity>
              
              
                <TouchableOpacity
                  onPress={this.handleFoodRice}
                  style={this.state.active === 2 ? styles.btnActive : styles.btnTab }
                >
                  <Text style={this.state.active === 2 ? styles.textActive : styles.textNorm }>Rice</Text>
                </TouchableOpacity>
             
              
                <TouchableOpacity
                  onPress={this.handleFoodTypeW}
                  style={this.state.active === 3 ? styles.btnActive : styles.btnTab }
                >
                  <Text style={this.state.active === 3 ? styles.textActive : styles.textNorm }>Chicken</Text>
                </TouchableOpacity>
            
            </ScrollView>
          </View>
        )}

        <View style={{flexDirection:'row', padding: 10}}> 
          <Text style={globalStyles.foodNum}>{this.state.list.length} {this.state.foodName}</Text>
          <Text style={globalStyles.foodNumText}>  food items available</Text>
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
          initialNumToRender={5}
          maxToRenderPerBatch={10}
        />
      </View>
    )
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
    height: WIDTH / numColumns,
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
    width: 90,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  btnActive: {
    width: 90,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ff5959',
    borderRadius: 30,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  textNorm: {
    fontFamily: 'latoB',
    color: 'black'
  },
  textActive: { 
    fontFamily: 'latoB',
    color: 'white'
  }
});
