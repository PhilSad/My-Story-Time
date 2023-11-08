import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import Home from './src/pages/home/home';
import Settings from './src/pages/settings/settings';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewStory from './src/pages/newStory/newStory';
import TakePicturesScreen from './src/pages/takePicturesScreen/takePicturesScreen';
import GenerationScreen from './src/pages/generationScreen/generationScreen';

const image = './assets/images/background.jpeg';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <ImageBackground source={require(image)} resizeMode="cover" style={styles.image}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="NewStory" component={NewStory} />
            <Stack.Screen name="TakePicturesScreen" component={TakePicturesScreen} />
            <Stack.Screen name="GenerationScreen" component={GenerationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
export default App;
