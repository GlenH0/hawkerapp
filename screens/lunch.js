import firebase from '../firebase/fb'
import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, ScrollView, InteractionManager, Keyboard } from 'react-native';

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
      interactionsComplete: false
    }
    this._isMounted = false;
  }

  _renderItem = ({ item, index }) => {
    return (
      <View  key={item.key} style={{ flex: 1 }}>

        <View>
          <TouchableOpacity style={globalStyles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
            {/* solution for fast loading */}
            <Image style={globalStyles.img} source={{ uri: item.image, cache: 'force-cache' }} resizeMethod='auto'/>
          </TouchableOpacity>
        </View>      
        <Text numberOfLines={1} style={globalStyles.foodTitle}>{item.title}</Text>
        
      </View>
    )
  }
  // solution to faster loading
  async componentDidMount() {
    await InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        firebase.database().ref('foodBreak').on('value', (snapshot) => {
          var li = []
          snapshot.forEach((child) => {
            if(child.val().food_id != "3" && child.val().food_id != "4"){
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
    this.setState({ list: filter, searchText: text })
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
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
            <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('foodfilter')}
                style={globalStyles.button}
              >
                {/* to be replaced by another page to prevent confusion */}
                <Text style={globalStyles.buttonFilter}>Filters</Text>
                  <Image style={globalStyles.filterImg} source={require('../assets/filter.png')}/>
              </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate('filterLunch')}
                    style={styles.btnTab}
                  >
                    <Text style={{ fontFamily: 'latoR' }}>Food-o-miser</Text>
                  </TouchableOpacity> */}
            </ScrollView>
          </View>
        )}

        <View style={{flexDirection:'row', padding: 10}}> 
          <Text style={globalStyles.foodNum}>{this.state.list.length}</Text>
          <Text style={globalStyles.foodNumText}> food items available</Text>
        </View>

        {renderIf(this.state.list == '')(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            {/* <Text style={{ padding: 10 }}>Ops! No results found</Text> */}
            <Image
        style={{width: "80%", height: "80%", resizeMode:'contain'}}
        source={{
          uri: 'https://www.buzzdine.com/img/not-found.png',
        }}
      />
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
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({

});
