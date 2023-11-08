import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ValidationButton = ({ navigation, navigationScreen }: any) => {
  return (
    <View style={styles.validationContainer}>
      <TouchableOpacity style={styles.validationButton} onPress={() => navigation.push(navigationScreen)}>
        <Text style={styles.validationText}>Valider</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  validationContainer: {
    flex: 1,
    width: 100,
    alignSelf: 'flex-end',
  },
  validationButton: {
    backgroundColor: "#208F2B",
    border: "1px solid #208F2B",
    borderRadius: 15,
    marginTop: 20,
  },
  validationText: {
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontFamily: "Agbalumo",
    fontSize: 18
  }
});

export default ValidationButton;
