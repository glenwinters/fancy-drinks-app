import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './src/Auth';
import Home from './src/Home';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <View style={styles.container}>
      {isLoggedIn ? <Home /> : <Auth onLogin={() => {setIsLoggedIn(true)}}/>}
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
