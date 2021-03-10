import React, {useState} from 'react';
import * as Font from 'expo-font';
import Food from './screens/food';
import AppLoading from 'expo-app-loading';
import  AppNavigator  from "./routes/drawer";
import 'react-native-gesture-handler';

const getFonts = () => Font.loadAsync({
    'jetbrains-ital': require('./assets/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf'),
    'jetbrains-var': require('./assets/fonts/JetBrainsMono-VariableFont_wght.ttf'),
    'latoR': require('./assets/fonts/Lato-Regular.ttf'),
    'latoB': require('./assets/fonts/Lato-Bold.ttf'),
    'lob': require('./assets/fonts/Lobster-Regular.ttf'),
    'sat': require('./assets/fonts/PoetsenOne-Regular.ttf'),
    'play': require('./assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'),
    'playB': require('./assets/fonts/MartelSans-Bold.ttf'),
  });


  export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
  
    if(fontsLoaded){
      return (
        <AppNavigator/>
      );
    }
    else {
      return (
        <AppLoading
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)}
        onError={console.warn}
      />
      );
    }
  
  }


