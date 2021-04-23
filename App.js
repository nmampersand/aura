import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import ChatBot from 'react-native-chatbot-expo';

const steps = [
  {
    id: '0',
    message: 'Hello, I\'m Aura!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];

import {geocode} from './utils/api'

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationCoord, setLocationCoord] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    handleSubmit('London')
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleSubmit = async (location) => {
    const coord = await geocode(location)
    let text = JSON.stringify(coord)
    setLocationCoord(text)
    

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ChatBot steps={steps} />
        <Text style={styles.paragraph}>{locationCoord}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
