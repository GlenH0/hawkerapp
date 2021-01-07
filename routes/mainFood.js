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

import BreakfastPage from '../screens/breakfast'
import LunchPage from '../screens/lunch'
import DessertPage from '../screens/dessert'
import DrinkPage from '../screens/drink'

const Tab = createMaterialBottomTabNavigator();

const N = createStackNavigator();

function BreakfastP() {
  return (
    <N.Navigator>
      <N.Screen
        name="Breakfast"
        component={BreakfastPage}
        options={{ tabBarLabel: 'Breakfast' }}
      />
    </N.Navigator>
  );
}

function LunchP() {
  return (
    <N.Navigator>
      <N.Screen
        name="Lunch/Dinner"
        component={LunchPage}
        options={{ tabBarLabel: 'Lunch/Dinner' }}
      />
    </N.Navigator>
  );
}

function DessertP() {
  return (
    <N.Navigator>
      <N.Screen
        name="Dessert"
        component={DessertPage}
        options={{ tabBarLabel: 'Dessert' }}
      />
    </N.Navigator>
  );
}

function DrinkP() {
  return (
    <N.Navigator>
      <N.Screen
        name="Drinks"
        component={DrinkPage}
        options={{ tabBarLabel: 'Drinks' }}
      />
    </N.Navigator>
  );
}

const MainTabScreen = ({route}) => (
    <Tab.Navigator
      initialRouteName={route.name}
      activeColor="#fff"
      style={{ backgroundColor: 'tomato' }}
      backBehavior = 'Hawker Food'
    >
      <Tab.Screen
        name="Breakfast"
        component={BreakfastP}
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
        component={LunchP}
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
        component={DessertP}
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
        component={DrinkP}
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

