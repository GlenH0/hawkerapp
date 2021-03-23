import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import About from "../screens/about";
import Header from '../shared/header';


const { Navigator, Screen } = createStackNavigator();

export const AboutStack = () => {
    return (
        <Navigator screenOptions={{ animationEnabled: false }}>
          <Screen
            name="About"
            component={About}
            options={({ navigation, route }) => ({
                headerTitle: () => <Header navigation={navigation} title = 'About' />,
                headerStyle: { backgroundColor: '#ff5959'},
                headerShown: false
              })}/>
        </Navigator>
      )
}