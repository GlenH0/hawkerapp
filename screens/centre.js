import * as React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, Image } from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
 
export default function Centre({navigation}) {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('North')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/amk.png')} style={styles.image}/>
                <Text style={styles.text}>NORTH</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('NorthE')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/Chomp-Chomp-1.jpg')} style={styles.image}/>
                <Text style={styles.text}>NORTH EAST</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Central')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/bugis.png')} style={styles.image}/>
                <Text style={styles.text}>CENTRAL</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('East')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/bed.png')} style={styles.image}/>
                <Text style={styles.text}>EAST</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('West')}>
            <View style={styles.responsiveBox}>                  
                <Image source={require('../assets/blhawk.png')} style={styles.image}/>
                <Text style={styles.text}>WEST</Text>
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
    height: heightPercentageToDP('19%'),
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 5, 
  },
  text: {
    position: 'absolute',
    color: 'white',
    textAlign:'center',
    top: '35%',
    left: 0,
    right: 0,
    fontSize: 32,
    fontFamily: 'jetbrains-var'
  },
  image:{
      width:'100%',
      height: '100%',
      opacity: 0.7,
      backgroundColor:'black',
  }
});