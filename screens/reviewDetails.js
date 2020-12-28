import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
// import {globalStyles, images} from '../styles/global';
// import Card from '../shared/card';



export default function ReviewDetails({ route, navigation }) {
    
  
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Hello!</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    rating: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 16,
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    text:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    view:{
      justifyContent:'center',
      alignItems: 'center',
      flex: 1
    }
  });
