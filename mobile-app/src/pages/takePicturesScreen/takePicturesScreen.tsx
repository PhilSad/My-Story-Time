import React from 'react'
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Image } from 'react-native';
import BackButton from '../../components/backButton/backButton';
import ValidationButton from '../../components/validationButton/validationButton';
const image = '../../../assets/images/background.jpeg';

const TakePicturesScreen = ({ navigation }: any) => {
  return (
    <ImageBackground source={require(image)} resizeMode="cover" style={styles.backgroundImage}>
      <SafeAreaView style={styles.container} >
        <BackButton navigation={navigation} />
        <View style={styles.containerFlex}>
          <View style={styles.row4}>
            <Text style={styles.title}>Add pictures of you</Text>

            <ValidationButton navigation={navigation} navigationScreen={"GenerationScreen"} />

          </View>
          <View style={styles.row2}>
            <Image
              style={styles.martien}
              source={require('../../../assets/images/martien.png')}
            />
            <Image
              style={styles.meteoriteMartien}
              source={require('../../../assets/images/meteorite.webp')}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
    flexDirection: "row"
  },
  row4: {
    flex: 4,
    margin: 25,
  },
  row2: {
    flex: 2
  },
  title: {
    fontFamily: "Agbalumo",
    fontSize: 30,
    color: "#fff"
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    color: "#fff"
  },
  containerNewStory: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  martien: {
    zIndex: 1,
    position: "absolute",
    height: 200,
    width: 200,
    resizeMode: 'contain',
    bottom: 50,
    right: 0
  },
  meteoriteMartien: {
    position: "absolute",
    height: 180,
    width: 180,
    bottom: -80,
    right: 0
  }
});

export default TakePicturesScreen;
