import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Food from "../screens/food";

import Header from '../shared/header';
import Break from '../screens/breakfastContent'
import Filter from '../filter/filter'
import FilterLunch from '../filter/filterLunch'

import MainTabScreen from './mainFood';
import MainCentreTabScreen from './mainCentre';
import West from '../screens/westContent';
import FoodtoCentre from '../screens/food2centre'
import FilterDessert from "../filter/filterDessert";

const { Navigator, Screen } = createStackNavigator();

export default FoodStack = () => {
  return (
    <Navigator>
      <Screen
        name="hawker food"
        component={Food}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} title = 'Hawker Food' />,
            headerStyle: { backgroundColor: '#f23e65'},
            
          }
        }}
      />

    <Screen name="Breakfast" component={MainTabScreen}
    // backup for styling~ 
      // options={{
      //   headerTitle: 'Our Local Delights',
      //   headerStyle: { backgroundColor: '#FF4343'},
      //   headerTitleStyle: {
      //     color: 'white',
      //     fontWeight: 'bold',
      //     fontSize: 22,
      //     fontFamily:"latoR"
      //   },
      //   headerTintColor:'white'
      // }}
      options={{
        headerShown: false
      }}
    />

    <Screen name="Lunch/Dinner" component={MainTabScreen}
      options={{
        headerShown: false
      }}
    />

    <Screen name="Dessert" component={MainTabScreen}
      options={{
        headerShown: false
      }}
    />

<Screen name="Drink" component={MainTabScreen}
      options={{
        headerShown: false
      }}
    />

<Screen name="break" component={Break}
   options={{
    headerTitle: 'Details',
    headerStyle: { backgroundColor: '#f23e65'},
    headerTitleStyle: {
      color: 'white',
      fontSize: 22,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/>

<Screen name="filter" component={Filter}
   options={{
    headerTitle: 'Halal',
    headerStyle: { backgroundColor: '#f23e65'},
    headerTitleStyle: {
      color: 'white',
      fontSize: 22,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/>

<Screen name="filterLunch" component={FilterLunch}
   options={{
    headerTitle: 'Halal',
    headerStyle: { backgroundColor: '#f23e65'},
    headerTitleStyle: {
      color: 'white',
      fontSize: 22,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/>

<Screen name="filterDessert" component={FilterDessert}
   options={{
    headerTitle: 'Halal',
    headerStyle: { backgroundColor: '#f23e65'},
    headerTitleStyle: {
      color: 'white',
      fontSize: 22,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/>
{/* this is hawker centre path */}
<Screen name="West" component={MainCentreTabScreen}
                
                options={{
                  headerShown: false
                }}
              />

<Screen name="hawkerDetail" component={West}
        options={{
          headerTitle: 'Details',
          headerStyle: { backgroundColor: '#f23e65'},
          headerTitleStyle: {
            color: 'white',
            fontSize: 22,
            fontFamily:"sat"
          },
          headerTintColor:'white'
        }}
      />
<Screen name="food2centre" component={FoodtoCentre}
      options={{
        headerTitle: 'Details',
        headerStyle: { backgroundColor: '#f23e65'},
        headerTitleStyle: {
          color: 'white',
          fontSize: 22,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
/>
    </Navigator>
  );
}
