import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Centre from "../screens/centre";

import Header from '../shared/header';
import North from '../screens/north';

import MainCentreTabScreen from './mainCentre'
import West from '../screens/westContent'
import FoodtoCentre from '../screens/food2centre'

const { Navigator, Screen } = createStackNavigator();

export default CentreStack = () => {
  return (
    <Navigator>
      <Screen
        name="hawker centre"
        component={Centre}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} title = 'Hawker Centres' />,
            headerStyle: { backgroundColor: '#f23e65'}
          }
        }}
      />

      <Screen name="North" component={MainCentreTabScreen}
          
          options={{
            headerShown: false
          }}
        />

      <Screen name="NorthE" component={MainCentreTabScreen}
                
                options={{
                  headerShown: false
                }}
              />

      <Screen name="Central" component={MainCentreTabScreen}
                
                options={{
                  headerShown: false
                }}
              />

      <Screen name="East" component={MainCentreTabScreen}
                
                options={{
                  headerShown: false
                }}
              />

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