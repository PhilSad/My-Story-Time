import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const BackButton = ({ navigation }: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View>
        <Image
          style={styles.backIcon}
          source={require('../../../assets/images/back.png')}
        />
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  backIcon: {
    width: 30,
    height: 30,
    margin: 20
  }
});

export default BackButton;
