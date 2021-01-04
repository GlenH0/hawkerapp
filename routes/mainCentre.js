import React from 'react';
import {BackHandler} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";


import North from '../screens/north';
import East from '../screens/east';
import West from '../screens/west';
import Central from '../screens/central';
import NorthE from '../screens/northE';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../shared/header';

const Tab = createMaterialBottomTabNavigator();
const N = createStackNavigator();
const NE = createStackNavigator();

function NorthSide() {
  return (
    <N.Navigator>
      <N.Screen
        name="North"
        component={North}
        options={{ tabBarLabel: 'North' }}
      />
    </N.Navigator>
  );
}

function NorthESide() {
  return (
    <NE.Navigator>
      <NE.Screen
        name="North East"
        component={NorthE}
        options={{ tabBarLabel: 'North East' }}
      />
    </NE.Navigator>
  );
}

function CentralSide() {
  return (
    <NE.Navigator>
      <NE.Screen
        name="Central"
        component={Central}
        options={{ tabBarLabel: 'Central' }}
      />
    </NE.Navigator>
  );
}

function EastSide() {
  return (
    <NE.Navigator>
      <NE.Screen
        name="East"
        component={East}
        options={{ tabBarLabel: 'North East' }}
      />
    </NE.Navigator>
  );
}



function WestSide() {
  return (
    <NE.Navigator>
      <NE.Screen
        name="West"
        component={West}
        options={{ tabBarLabel: 'North East' }}
      />
    </NE.Navigator>
  );
}

const MainCentreTabScreen = ({route}) => (
    <Tab.Navigator
      initialRouteName={route.name}
      activeColor="#fff"
      style={{ backgroundColor: 'tomato' }}
      backBehavior = 'Hawker Food'
    >
      <Tab.Screen
        name="North"
        component={NorthSide}
        // listeners={{ focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton)
        //               ,blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
        //   }}
        options={{
          tabBarLabel: 'North',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="alpha-n" color={color} size={26} />
            
          ),
        }}
        
      />
      <Tab.Screen
        name= "NorthE"
        component={NorthESide}
        options={{
          tabBarLabel: 'North East',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="alpha-n-circle-outline" color={color} size={26} />
          ),
          title: "hi"
        }}
      />
      
      <Tab.Screen
        name="Central"
        component={CentralSide}
        options={{
          tabBarLabel: 'Central',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="alpha-c" color={color} size={26} />
          ),
        }}
      />

    <Tab.Screen
        name="East"
        component={EastSide}
        options={{
          tabBarLabel: 'East',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="alpha-e" color={color} size={26} />
          ),
        }}
      />

    <Tab.Screen
        name="West"
        component={WestSide}
        options={{
          tabBarLabel: 'West',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="alpha-w" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainCentreTabScreen;

