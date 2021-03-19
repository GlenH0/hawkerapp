import React from "react";
import {Button} from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from "@react-navigation/stack";
import Food from "../screens/food";

import Header from '../shared/header';
import Break from '../screens/breakfastContent'

import MainTabScreen from './mainFood';
import MainCentreTabScreen from './mainCentre';
import West from '../screens/westContent';
import FoodtoCentre from '../screens/food2centre'
import FilterDessert from "../filter/filterDessert";
import FoodFilter from "../filter/foodFilter";
import Filter from "../filter/filter"

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
            headerStyle: { backgroundColor: '#ff5959'},
            
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
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    />

    <Screen name="Lunch/Dinner" component={MainTabScreen}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    />

    <Screen name="Dessert" component={MainTabScreen}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    />

<Screen name="Drink" component={MainTabScreen}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    />

<Screen name="break" component={Break}
   options={{
    headerTitle: 'Food Details',
    headerStyle: { backgroundColor: '#ff5959'},
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitleStyle: {
      color: 'white',
      fontSize: 18,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/>

<Screen name="filter" component={Filter}
   options={{
    headerTitle: 'Filter',
    headerStyle: { backgroundColor: '#ff5959'},
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    headerTitleStyle: {
      color: 'white',
      fontSize: 18,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/>

{/* <Screen name="filterLunch" component={FilterLunch}
   options={{
    headerTitle: 'Food-o-miser',
    headerStyle: { backgroundColor: '#ff5959'},
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    headerTitleStyle: {
      color: 'white',
      fontSize: 18,
      fontFamily:"sat"
    },
    headerTintColor:'white'
  }}
/> */}

<Screen name="filterDessert" component={FilterDessert}
   options={{
    headerTitle: 'Food-o-miser',
    headerStyle: { backgroundColor: '#ff5959'},
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    headerTitleStyle: {
      color: 'white',
      fontSize: 18,
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
          headerTitle: 'Hawker Details',
          headerStyle: { backgroundColor: '#ff5959'},
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitleStyle: {
            color: 'white',
            fontSize: 18,
            fontFamily:"sat"
          },
          headerTintColor:'white'
        }}
      />
<Screen name="food2centre" component={FoodtoCentre}
      options={{
        headerTitle: 'Food Details',
        headerStyle: { backgroundColor: '#ff5959'},
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
/>
<Screen name="foodfilter" component={FoodFilter}
      options={{
        headerTitle: 'Filter',
        headerStyle: { backgroundColor: '#ff5959'},
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
/>

{/* <Screen name="bfoodfilter" component={BFoodFilter}
      options={{
        headerTitle: 'Filter',
        headerStyle: { backgroundColor: '#ff5959'},
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontFamily:"sat"
        },
        headerTintColor:'white'
      }}
/> */}
    </Navigator>
  );
}
