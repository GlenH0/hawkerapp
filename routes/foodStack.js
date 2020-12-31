import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Food from "../screens/food";

import Header from '../shared/header';
import Break from '../screens/breakfastContent'

import MainTabScreen from './mainFood';

const { Navigator, Screen } = createStackNavigator();

// const HomeNavigator = () => (
//   <Navigator headerMode="screen">
 
//     <Screen name="Hawker Food" component={Food} 
//       options={{
//         title: 'HAWKER FOOD',
//         headerStyle: {
//           backgroundColor: '#FF4343',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//     />
//     <Screen name="Breakfast" component={ReviewDetails} />
//     <Screen name="Lunch/Dinner" component={ReviewDetails} />
//   </Navigator>
// );



export default FoodStack = () => {
  return (
    <Navigator>
      <Screen
        name="hawker food"
        component={Food}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} title = 'HAWKER FOOD' />,
            headerStyle: { backgroundColor: '#FF4343'},
            
          }
        }}
      />
      {/* <Screen
        name="Review Details"
        component={ReviewDetails}
        options={{
          title: "Review Details",
        }}
      /> */}

    <Screen name="Breakfast" component={MainTabScreen}
    
      options={{
        headerTitle: 'Our Local Delights',
        headerStyle: { backgroundColor: '#FF4343'},
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 26,
          fontFamily:"latoR"
        },
        headerTintColor:'white'
      }}
    />

    <Screen name="Lunch/Dinner" component={MainTabScreen}
      options={{
        headerTitle: 'Our Local Delights',
        headerStyle: { backgroundColor: '#FF4343'},
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 26,
          fontFamily:"latoR"
        },
        headerTintColor:'white'
      }}
    />

    <Screen name="Dessert" component={MainTabScreen}
      options={{
        headerTitle: 'Our Local Delights',
        headerStyle: { backgroundColor: '#FF4343'},
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 26,
          fontFamily:"latoR"
        },
        headerTintColor:'white'
      }}
    />

<Screen name="Drink" component={MainTabScreen}
      options={{
        headerTitle: 'Our Local Delights',
        headerStyle: { backgroundColor: '#FF4343'},
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 26,
          fontFamily:"latoR"
        },
        headerTintColor:'white'
      }}
    />

<Screen name="break" component={Break}
   options={{
    headerTitle: 'Details',
    headerStyle: { backgroundColor: '#FF4343'},
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 26,
      fontFamily:"latoR"
    },
    headerTintColor:'white'
  }}
/>

    </Navigator>
  );
}
