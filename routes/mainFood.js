import React from 'react';
import {BackHandler} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import Breakfast from '../screens/breakfast';
import Lunch from '../screens/lunch';
import Dessert from '../screens/dessert';
import Drink from '../screens/drink';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../shared/header';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({route}) => (
    <Tab.Navigator
      initialRouteName={route.name}
      activeColor="#fff"
      style={{ backgroundColor: 'tomato' }}
      backBehavior = 'Hawker Food'
    >
      <Tab.Screen
        name="Breakfast"
        component={Breakfast}
        // listeners={{ focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton)
        //               ,blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
        //   }}
        options={{
          tabBarLabel: 'Breakfast',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="bread-slice" color={color} size={26} />
          ),
          
        }}
        
      />
      <Tab.Screen
        name= "Lunch/Dinner"
        component={Lunch}
        options={{
          tabBarLabel: 'Lunch/Dinner',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="noodles" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Dessert"
        component={Dessert}
        options={{
          tabBarLabel: 'Dessert',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="bowl-mix" color={color} size={26} />
          ),
        }}
      />

    <Tab.Screen
        name="Drink"
        component={Drink}
        options={{
          tabBarLabel: 'Drinks',
          tabBarColor: '#FF4343',
          tabBarIcon: ({ color }) => (
            <Icon name="coffee" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

