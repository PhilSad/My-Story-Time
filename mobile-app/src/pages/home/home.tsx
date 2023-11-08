import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonHome from '../../components/buttonHome/buttonHome';
const image = '../../../assets/images/background.jpeg';

const Home = ({ navigation }: any) => {
  const window = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    title: {
      color: "#fff",
      fontFamily: 'Agbalumo',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 45,
      margin: 25
    },
    settingButton: {
      position: "absolute",
      top: 35,
      right: 35,
      width: 43,
      height: 43,
      flexShrink: 0,
      borderRadius: 11,
      backgroundColor: "#FB8F67",
      justifyContent: "center",
    },
    setting: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    settingIcon: {
      margin: "auto",
    },

    meteoriteContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },

    containerNewStory: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    livre: {
      zIndex: 1,
      position: "absolute",
      height: 180,
      width: 180,
      resizeMode: 'contain',
      bottom: 40
    },
    meteoriteNewStory: {
      position: "absolute",
      height: 180,
      width: 180,
      bottom: -50,
    },
    containerStories: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: window.height,
    },
    stories: {
      zIndex: 1,
      position: "absolute",
      height: 140,
      width: 140,
      resizeMode: 'contain',
      bottom: 50
    },
    buttonHome: {
      zIndex: 2,
      position: "absolute",
      bottom: 20,
    },
    meteoriteStories: {
      position: "absolute",
      height: 180,
      width: 180,
      bottom: -50
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
    },
    image: {
      flex: 1,
    },
  });
  return (
    <ImageBackground source={require(image)} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>My Bedtime Story</Text>

          <TouchableOpacity style={styles.settingButton} onPress={() => navigation.push("Settings")}>
            <View style={styles.setting}>
              <Image
                style={styles.settingIcon}
                source={require('../../../assets/images/settings.png')}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.meteoriteContainer}>
            <TouchableOpacity style={styles.containerNewStory} onPress={() => navigation.push("Settings")}>
              <Image
                style={styles.livre}
                source={require('../../../assets/images/livre.png')}
              />
              <View style={styles.buttonHome}>
                <ButtonHome text={'Nouvelle histoire'} />
              </View>
              <Image
                style={styles.meteoriteNewStory}
                source={require('../../../assets/images/meteorite.webp')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerNewStory} onPress={() => navigation.push("Settings")}>
              <Image
                style={styles.stories}
                source={require('../../../assets/images/stories.png')}
              />
              <View style={styles.buttonHome}>
                <ButtonHome text={'Histoires enregistrées'} />
              </View>
              <Image
                style={styles.meteoriteStories}
                source={require('../../../assets/images/meteorite.webp')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerNewStory} onPress={() => navigation.push("Settings")}>
              <Image
                style={styles.martien}
                source={require('../../../assets/images/martien.png')}
              />
              <Image
                style={styles.meteoriteMartien}
                source={require('../../../assets/images/meteorite.webp')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground >
  )
}

export default Home;
