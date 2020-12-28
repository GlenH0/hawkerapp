import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Centre from "../screens/centre";
import ReviewDetails from "../screens/reviewDetails";
import Header from '../shared/header';

const { Navigator, Screen } = createStackNavigator();

export default CentreStack = () => {
  return (
    <Navigator>
      <Screen
        name="hawker centre"
        component={Centre}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} title = 'HAWKER CENTRES' />,
            headerStyle: { backgroundColor: '#FF4343'}
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
    </Navigator>
  );
}