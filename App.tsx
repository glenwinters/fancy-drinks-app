import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Auth from './src/Auth';
import Home from './src/Home';
import { ID_TOKEN_KEY } from './config';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then(rawSession => {
      if (rawSession) {
        const session = JSON.parse(rawSession);
        if (session.exp > Math.floor(new Date().getTime() / 1000)) {
          setIsLoggedIn(true);
        }
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      {isLoggedIn && <Home />}
        <Auth
        isLoggedIn={isLoggedIn}
          onLogin={() => {
            setIsLoggedIn(true);
          }}
          onLogout={() => {
            setIsLoggedIn(false)
          }}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
