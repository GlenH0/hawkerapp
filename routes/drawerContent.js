import * as React from 'react';
import { StyleSheet, View } from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import{Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props){
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section>
                    <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="food-fork-drink" 
                                color={color}
                                size={size}
                                />
                            )}
                            // activeTintColor="red"
                            // inactiveTintColor="blue"
                            label="Hawker Food"
                            onPress={() => {props.navigation.navigate('Hawker Food')}}
                        />

                    <DrawerItem 
                             icon={({color, size}) => (
                                <Icon 
                                name="home-map-marker" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Hawker Centres"
                            onPress={() => {props.navigation.navigate('Hawker Centres')}}
                        />    

                    <DrawerItem 
                             icon={({color, size}) => (
                                <Icon 
                                name="tooltip-account" 
                                color={color}
                                size={size}
                                />
                            )}

                            label="About"
                            onPress={() => {props.navigation.navigate('About')}}
                        /> 
                        
                                        
                    </Drawer.Section>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },  
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    }
  });