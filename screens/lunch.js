import firebase from '../firebase/fb'
import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, ScrollView, InteractionManager } from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

import _ from 'lodash'

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default class App extends Component {

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
      <View style={{ flex: 1 }}>

        <View>
          <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
            <Image style={styles.img} source={{ uri: item.image }} />
          </TouchableOpacity>
        </View>      
        <Text numberOfLines={1} style={{ paddingLeft: 10 }}>{item.title}</Text>
        {/* <Image style={{ marginLeft: 9 }} source={item['rating']} /> */}
      </View>
    )
  }

  componentDidMount() {
    
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        firebase.database().ref('foodBreak').on('value', (snapshot) => {
          var li = []
          snapshot.forEach((child) => {
            if(child.val().food_id != "3"){
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
      <View style={styles.container}>

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <View style={{ width: '95%' }}>
            {
              renderIf(this.state.check == false)(
                <Searchbar
                  placeholder="What's in mind today?"
                  onChangeText={(text) => this.handleSearch(text)}
                  value={this.state.searchText}
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
                onPress={this.handleFilter}
                style={styles.btnTab}
              >
                {renderIf(this.state.check == true)(
                  <Text style={{ fontFamily: 'latoR' }}>Back</Text>
                )}
                {renderIf(this.state.check == false)(
                  <Text style={{ fontFamily: 'latoR' }}>View Filters</Text>
                )}
              </TouchableOpacity>

              {
                renderIf(this.state.check == false)(
                  <TouchableOpacity
                    onPress={() => navigation.navigate('filterLunch')}
                    style={styles.btnTab}
                  >
                    <Text style={{ fontFamily: 'latoR' }}>Food-o-miser</Text>
                  </TouchableOpacity>
                )
              }

              {renderIf(this.state.check == true)(
                <TouchableOpacity
                  onPress={this.handleFoodType}
                  style={this.state.active === 0 ? styles.btnActive : styles.btnTab }>
                
                  <Text style={this.state.active === 0 ? styles.textActive : styles.textNorm }>Noodle</Text>
                </TouchableOpacity>
              )}
              {renderIf(this.state.check == true)(
                <TouchableOpacity
                  onPress={this.handleHalal}
                  style={this.state.active === 1 ? styles.btnActive : styles.btnTab }>
                  <Text style={this.state.active === 1 ? styles.textActive : styles.textNorm }>Halal</Text>
                </TouchableOpacity>
              )}
              {renderIf(this.state.check == true)(
                <TouchableOpacity
                  onPress={this.handleFoodRice}
                  style={this.state.active === 2 ? styles.btnActive : styles.btnTab }
                >
                  <Text style={this.state.active === 2 ? styles.textActive : styles.textNorm }>Rice</Text>
                </TouchableOpacity>
              )}
              {renderIf(this.state.check == true)(
                <TouchableOpacity
                  onPress={this.handleFoodTypeW}
                  style={this.state.active === 3 ? styles.btnActive : styles.btnTab }
                >
                  <Text style={this.state.active === 3 ? styles.textActive : styles.textNorm }>Western</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}

        <View style={{flexDirection:'row', padding: 10}}> 
          <Text style={{fontWeight:'bold'}}>{this.state.list.length}</Text>
          <Text> food items available</Text>
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
    width: 110,
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
    width: 110,
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
    fontFamily: 'latoR',
    color: 'black'
  },
  textActive: { 
    fontFamily: 'latoR',
    color: 'white'
  }
});
