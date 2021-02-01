import firebase from '../firebase/fb'
import React, {Component} from 'react';
import {View,Text, FlatList, Dimensions, TouchableOpacity,Image, StyleSheet} from 'react-native';

import { shuffle } from "lodash";
import { Searchbar } from 'react-native-paper';
import renderIf from 'render-if';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export default class App extends Component{

 constructor(props){
   super(props);
   this.state={ 
    list:[],
    searchText: '',
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
       if(child.val().cat == "drink"){
         li.push({
            title: child.val().title,
            image:child.val().image,
            video: child.val().video,
            subpage: child.val().subpage,
            subpageadd: child.val().subpageadd,
            subpageimg: child.val().subpageimg,
            subpagetime: child.val().subpagetime,
            subpagelat: child.val().subpagelat,
            subpagelong: child.val().subpagelong,
            subpagephone: child.val().subpagephone             
          })
       }
    })
   this.setState({list:li})
  })
 }

 componentWillUnmount() {
   this._isMounted = false;
 }

 searchData(searchText) {
  const newData = this.state.list.filter(item => 
    {
    const itemData = item.title.toUpperCase();
    const textData = searchText.toUpperCase();
    return itemData.indexOf(textData) > -1
  }
  );
    if(searchText){
      this.setState({
        list: newData,
        searchText: searchText
        })  
    }
    else{
      this.componentDidMount();
      this.setState({
        searchText:''
      })
    }
  }

  
 
 render(){

  //  const filteredData = this.state.searchText
  //  ? this.state.list.filter(x =>
  //      x.title.toLowerCase().includes(this.state.searchText.toLowerCase())
  //    )
  //  : this.state.list;

  

   const {navigation} = this.props

  return(
    <View style={styles.container}>

         <View style={{justifyContent:'center', alignItems:'center', paddingTop: 10}}>
          <View style={{width: '95%'}}>
            
            <Searchbar
              placeholder="What's in mind today?"
              onChangeText={searchText => this.searchData(searchText)}
              value={this.state.searchText}
            />
          </View>
         </View>

         {renderIf(this.state.searchText === '')(
            <View>
              <Text style={{paddingLeft: 10, paddingTop: 10, fontFamily:'latoR', color:'#808080'}}>Suggested filters:</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('filterDessert')}
            style={styles.btnTab}
            >
              <Text style={{fontFamily:'latoR'}}>Halal</Text>
            </TouchableOpacity>
          </View>
          )}

          {renderIf(this.state.list == '')(
            <View>
              <Text style={{padding: 10}}>Ops! No results found</Text>
            </View>
          )}


       <FlatList style={{width:'100%'}}
          data={shuffle(this.state.list)}
         //  keyExtractor={(item)=>item.key}
         //  renderItem={({item})=>{
         //     return(
         //        <View>
         //           <Text>{item.name} {item.na}</Text>
         //        </View>)
         //     }}
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
