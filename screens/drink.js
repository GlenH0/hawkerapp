import firebase from '../firebase/fb'
import React, {Component} from 'react';
import {View,Text, FlatList, Dimensions, TouchableOpacity,Image, StyleSheet, ScrollView} from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

import _ from 'lodash'

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default class App extends Component{

 constructor(props){
   super(props);
   this.state={ 
    list:[],
    searchText: '',
    check: false
  }
  
}

 _renderItem = ({item, index}) => {
     
   return (
     <View style={{flex:1}}>
      
       <View>
         <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('break', item)}>
           <Image style={styles.img} source={{uri: item.image}}/>
         </TouchableOpacity>
       </View>

       <Text numberOfLines={1} style={{paddingLeft:10}}>{item.title}</Text>
       <Image style={{marginLeft:9}} source={item['rating']} />

     </View>
   )
  
 }

  componentDidMount(){
    firebase.database().ref('drink').on('value', (snapshot) =>{
      var li = []
      snapshot.forEach((child)=>{
       if(child.val().food_id == "1"){
         li.push({
            title: child.val().title,
            image:child.val().image,
            image2:child.val().image2,
            video: child.val().video,
            subpage: child.val().subpage,
            subpageadd: child.val().subpageadd,
            subpageimg: child.val().subpageimg,
            subpagetime: child.val().subpagetime,
            subpagelat: child.val().subpagelat,
            subpagelong: child.val().subpagelong,
            subpagephone: child.val().subpagephone,
            rating: child.val().rating, 
            type: child.val().type,
            foodtype: child.val().foodtype            
          })
       }
    })
   this.setState({list:li, inMemory: li})
  })
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
 this.setState({list: filter, searchText:text})
}

handleFilter = () => {
  this.setState({check: true})
  if(this.state.check == true){
    this.setState({list: this.state.inMemory, check: false})
  }
}

handleHalal = () =>{
    this.setState({list: this.state.inMemory.filter(x => x.type === 'halal' && x.foodtype === 'noodle')})
    console.log(this.state.check)   
}

handleFoodType = () =>{  
    // this.setState({list: this.state.inMemory, check: false})
      this.setState({list: this.state.inMemory.filter(x => x.foodtype === 'noodle')})
      console.log(this.state.check)
}

handleFoodTypeW = () =>{  
  // this.setState({list: this.state.inMemory, check: false})
    this.setState({list: this.state.inMemory.filter(x => x.foodtype === 'western')})
    console.log(this.state.check)
}
 
 render(){
  return(
    <View style={styles.container}>

         <View style={{justifyContent:'center', alignItems:'center', paddingTop: 10}}>
          <View style={{width: '95%'}}>     
            {
              renderIf(this.state.check == false)(
                <Searchbar
              placeholder="What's in mind today?"
              onChangeText={(text)=>this.handleSearch(text)}
              value={this.state.searchText}
            />
              )
            }
          </View>
         </View>

         {renderIf(this.state.searchText == '')(
            <View>
              <Text style={{paddingLeft: 10, paddingTop: 10, fontFamily:'latoR', color:'#808080'}}>Suggested filters:</Text>
           <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={this.handleFilter}
                style={styles.btnTab}
              >
                {renderIf(this.state.check == true)(
                <Text style={{fontFamily:'latoR'}}>Back</Text>
                )}
                {renderIf(this.state.check == false)(
                  <Text style={{fontFamily:'latoR'}}>View Filters</Text>
                )}
              </TouchableOpacity>

              {renderIf(this.state.check == true)(
                <TouchableOpacity
                onPress={this.handleFoodType}
                style={styles.btnTab}
              >
                <Text style={{fontFamily:'latoR'}}>Noodle</Text>
              </TouchableOpacity>
              )}
              {renderIf(this.state.check == true)(
                <TouchableOpacity
                onPress={this.handleHalal}
                style={styles.btnTab}
              >
                <Text style={{fontFamily:'latoR'}}>Halal</Text>
              </TouchableOpacity>
              )}
               {renderIf(this.state.check == true)(
                <TouchableOpacity
                onPress={this.handleHalal}
                style={styles.btnTab}
              >
                <Text style={{fontFamily:'latoR'}}>Rice</Text>
              </TouchableOpacity>
              )}
               {renderIf(this.state.check == true)(
                <TouchableOpacity
                onPress={this.handleFoodTypeW}
                style={styles.btnTab}
              >
                <Text style={{fontFamily:'latoR'}}>Western</Text>
              </TouchableOpacity>
              )}
           </ScrollView>
          </View>
          )}

          {renderIf(this.state.list == '')(
            <View>
              <Text style={{padding: 10}}>Ops! No results found</Text>
            </View>
          )}


       <FlatList style={{width:'100%'}}
          data={shuffle(this.state.list)}
         renderItem={this._renderItem}
         keyExtractor={(item, index) => index.toString() }
         numColumns={numColumns}
             />
     </View>
  )}
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
      width: 100,
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
