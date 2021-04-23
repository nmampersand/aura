import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { GiftedChat } from 'react-native-gifted-chat'

import {geocode} from './utils/api'

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (location) => {
    const coord = await geocode(location)
    return JSON.stringify(coord)
  }

    // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, my name is Aura! I can help you discover a location\'s historical crime data. Where do you want to go?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Aura',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback(async (messages = []) => {
    console.log('messages', messages);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const coords = await handleSubmit(messages[0].text)
    console.log(coords)
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
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
