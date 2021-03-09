import React from 'react';
import {BackHandler, Text, View} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../shared/header';

import BreakfastPage from '../screens/breakfast'
import LunchPage from '../screens/lunch'
import DessertPage from '../screens/dessert'
import DrinkPage from '../screens/drink'
import FilterDessert from '../filter/filterDessert'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();

const N = createStackNavigator();

function BreakfastP() {
  return (
    <N.Navigator>
      <N.Screen
        name="Breakfast"
        component={BreakfastPage}
        options={{ tabBarLabel: 'Breakfast' ,
        headerStyle: { backgroundColor: '#ff5959'}, 
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
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
        options={{ tabBarLabel: 'Lunch/Dinner',
        headerStyle: { backgroundColor: '#ff5959'}, 
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
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
        options={{ tabBarLabel: 'Dessert',
        headerStyle: { backgroundColor: '#ff5959'}, 
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
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
        options={{ tabBarLabel: 'Drinks',
        headerStyle: { backgroundColor: '#ff5959'}, 
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
      />
    </N.Navigator>
  );
}

function FoodP() {
  return (
    <N.Navigator>
      <N.Screen
        name="Food-o-miser"
        component={FilterDessert}
        options={{
         headerTitle: 'Food-o-miser',
         headerStyle: { backgroundColor: '#ff5959'},
         headerTitleStyle: {
           color: 'white',
           fontSize: 18,
           fontFamily:"sat"
         },
         headerTintColor:'white'
       }}
      />
    </N.Navigator>
  );
}

const MainTabScreen = ({route}) => (
    <Tab.Navigator
      initialRouteName={route.name}
      activeColor="#ff5959"
      inactiveColor="#d3d3d3"
      backBehavior = 'Hawker Food'
      style={{position: 'relative'}}
    >
      <Tab.Screen
        name="Breakfast"
        component={BreakfastP}
        // listeners={{ focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton)
        //               ,blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
        //   }}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11}}> Breakfast </Text>,
          tabBarColor: 'white',
          tabBarIcon: ({ color }) => (
            <Icon name="bread-slice" color={color} size={26} />
          ),
          
        }}
        
      />
      <Tab.Screen
        name= "Lunch/Dinner"
        component={LunchP}
        options={{
          tabBarLabel:<Text style={{ fontSize: 11}}> Lunch/Dinner </Text>,
          tabBarColor: 'white',
          tabBarIcon: ({ color }) => (
            <Icon name="noodles" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Food-o-miser"
        component={FoodP}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11}}> Food-o-miser </Text>,
          tabBarColor: 'white',
          tabBarIcon: ({ color }) => (
            <Icon name="dice-3" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Dessert"
        component={DessertP}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11}}> Dessert </Text>,
          tabBarColor: 'white',
          tabBarIcon: ({ color }) => (
            <Icon name="bowl-mix" color={color} size={26} />
          ),
        }}
      />

    <Tab.Screen
        name="Drink"
        component={DrinkP}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11}}> Drinks </Text>,
          tabBarColor: 'white',
          tabBarIcon: ({ color }) => (
            <Icon name="coffee" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

