import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import Home from './src/pages/home/home';

const image = './src/assets/images/background.jpeg';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require(image)} resizeMode="cover" style={styles.image}>
        <Home />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default App;
