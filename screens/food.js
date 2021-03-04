import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, Image, BackHandler,Alert } from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
 
export default function Food({navigation}) {
  
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to exit?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   // return () => backHandler.removeEventListener("hardwareBackPress", handleBackButton);
  // }, []);

    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Breakfast')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/bannerBreakfast.png')} style={styles.image}/>
                {/* <Text style={styles.text}>BREAKFAST</Text> */}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Lunch/Dinner')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/lunch.png')} style={styles.image}/>
                <Text style={styles.text}>LUNCH/DINNER</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Dessert')}>
            <View style={styles.responsiveBox }>                  
                <Image source={require('../assets/des.png')} style={styles.image}/>
                <Text style={styles.text}>DESSERT</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Drink')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/dri.png')} style={styles.image}/>
                <Text style={styles.text}>DRINKS</Text>
            </View>
          </TouchableOpacity>
        
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  responsiveBox: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('24%'),
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  text: {
    position: 'absolute',
    color: 'white',
    textAlign:'center',
    top: '45%',
    left: 0,
    right: 0,
    fontSize: 22,
    fontFamily: 'sat'
  },
  image:{
      width:'100%',
      height: '100%',
      backgroundColor:'black',
      // borderRadius: 10,
      // overflow: "hidden",
  }
});