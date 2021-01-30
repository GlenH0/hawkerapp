import firebase from '../firebase/fb'
import React, {Component} from 'react';
import {View,Text, FlatList} from 'react-native';
export default class App extends Component{

 constructor(props){
 super(props);
 this.state={ 
 list:[],
 } }

  componentDidMount(){
    firebase.database().ref().on('value', (snapshot) =>{
      var li = []
      snapshot.forEach((child)=>{
       li.push({
        key: child.key,
        name:child.val().item1,
        na:child.val().item2
      })
    })
   this.setState({list:li})
  })
 }
 render(){
  return(
    <View style={{flex:1, alignSelf:'center', justifyContent:'center'}}>
       <FlatList style={{width:'100%'}}
          data={this.state.list}
          keyExtractor={(item)=>item.key}
          renderItem={({item})=>{
             return(
                <View>
                   <Text>{item.name} {item.na}</Text>
                </View>)
             }}/>
     </View>
  )}
}