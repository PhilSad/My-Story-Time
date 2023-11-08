import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BackButton from '../../components/backButton/backButton';
const image = '../../../assets/images/background.jpeg';

const GenerationScreen = ({ navigation }: any) => {
  return (
    <ImageBackground source={require(image)} resizeMode="cover" style={styles.backgroundImage}>
      <SafeAreaView style={styles.container} >
        <BackButton navigation={navigation} />
        <View>
          <Text>Generation</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  container: {
    flex: 1,
  },
});

export default GenerationScreen;
