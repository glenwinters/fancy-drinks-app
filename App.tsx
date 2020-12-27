import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Auth from './src/Auth';
import Home from './src/Home';
import { ID_TOKEN_KEY } from './config';

export interface User {
  id: string;
  name: string;
  isNewUser: boolean;
}

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = (isNewUser = false) => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then((rawSession) => {
      if (rawSession) {
        const session = JSON.parse(rawSession);
        const { exp, token, id, name } = session;
        if (exp > Math.floor(new Date().getTime() / 1000)) {
          setToken(token);
          setUser({ id, name, isNewUser });
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      {token && user && <Home token={token} user={user} />}
      <Auth
        token={token}
        onLogin={handleLogin}
        onLogout={() => {
          setToken(null);
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
