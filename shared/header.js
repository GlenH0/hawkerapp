import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

export default function Header({ title, navigation }) {

    const openMenu = () => {
        navigation.openDrawer()
    }
    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={32} onPress={openMenu} style={styles.icon}/>
            
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
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
        paddingRight: 40,
    },

    headerText: {
        fontFamily: 'sat',
        fontSize: 18,
        color: '#fff',
    },

    icon: {
        position: 'absolute',
        left: 0,
        color: '#fff'
    },
    headerTitle: {
        flexDirection:'row',

    }
});