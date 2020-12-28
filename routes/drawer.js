import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
import{DrawerContent} from "./drawerContent";

import { AboutStack } from "./aboutStack";
import FoodStack from "./foodStack";
import CentreStack from "./centreStack";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Hawker Food"   
        drawerContentOptions={{
          activeBackgroundColor:'#ffb6c1',
          activeTintColor: '#4E1111',
        }}
        drawerStyle={{
          backgroundColor: '#fff',
          width: 230,
        }}
        // drawerContent={props => <DrawerContent {...props}/>}
      >
        <Drawer.Screen name="Hawker Food" component={FoodStack}
          options={{
            drawerLabel: 'Hawker Food',
            drawerIcon: (({focused}) => <Icon name="food-fork-drink" size={30} color="#4E1111" />)
            
          }}
          
        />
        <Drawer.Screen name="Hawker Centres" component={CentreStack} 
          options={{
            drawerLabel: 'Hawker Centres',
            drawerIcon: (({focused}) => <Icon name="home-map-marker" size={30} color="#4E1111" />)
            
          }}
        />
        <Drawer.Screen name="About" component={AboutStack} 
          options={{
            drawerLabel: 'About',
            drawerIcon: (({focused}) => <Icon name="tooltip-account" size={30} color="#4E1111" />)
            
          }}
        />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

