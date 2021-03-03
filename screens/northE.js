import firebase from '../firebase/fb'
import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, InteractionManager } from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

import _ from 'lodash'

const numColumns = 1
const WIDTH = Dimensions.get("window").width;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchText: '',
      check: false,
      interactionsComplete: false
    }
    this._isMounted = false;
  }

  _renderItem = ({ item, index }) => {

    return (
      <View style={{ flex: 1 }}>

        <View>
          <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('hawkerDetail', item)}>
            <Image style={styles.img} source={{ uri: item.image }} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={{ paddingLeft: 10 }}>{item.title}</Text>
        <Image style={{ marginLeft: 9 }} source={item['rating']} />

      </View>
    )

  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        firebase.database().ref('hawker').on('value', (snapshot) => {
          
              var li = []
              snapshot.forEach((child) => {
                if(child.val().key > 27 && child.val().key <35){
                  li.push({
                    key: child.key,
                    title: child.val().title,
                    image: child.val().image,
                    add: child.val().add,
                    lat: child.val().lat,
                    long: child.val().long,
                    time: child.val().time,
                    place: child.val().place,
                    rating: child.val().rating
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
                  placeholder="Search for Hawker..."
                  onChangeText={(text) => this.handleSearch(text)}
                  value={this.state.searchText}
                />
              )
            }
          </View>
        </View>

        {renderIf(this.state.list == '')(
          <View>
            <Text style={{ padding: 10 }}>Ops! No results found</Text>
          </View>
        )}

        <FlatList style={{ width: '100%' }}
          data={this.state.list}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
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
    height: WIDTH / 2,
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
    width: 70,
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
  }
});
