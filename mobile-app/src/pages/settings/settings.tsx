import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Settings = ({ navigation }: any) => {
  return (
    <View>
      <View>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Settings</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontFamily: 'Agbalumo',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 42,
    padding: 15
  }
});

export default Settings;
