import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import renderIf from 'render-if';

export default function Header({ title, navigation }) {

    const openMenu = () => {
        navigation.openDrawer()
    }
    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={32} onPress={openMenu} style={styles.icon}/>
            
            {/* <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View> */}
            {
                renderIf(title !== 'About')(
                    <Image style={styles.logo} source={require('../assets/logo.png')}/>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('screen').width,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 25,
    },

    headerText: {
        fontFamily: 'sat',
        fontSize: 18,
        color: 'white',
        letterSpacing:-1
    },

    icon: {
        position: 'absolute',
        left: 0,
        color: '#fff'
    },
    headerTitle: {
        flexDirection:'row',

    },
    logo: {
        width: 55,
        height: 55,
        // position: 'absolute',
        
    }
});