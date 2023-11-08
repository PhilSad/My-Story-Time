import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const ButtonHome = (props: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    border: "1px solid #000",
    borderRadius: 30,
  },
  text: {
    color: "#01357D",
    fontFamily: 'Agbalumo',
    fontSize: 18
  }

});

export default ButtonHome;
