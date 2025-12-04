import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from './Logo';

const SplashScreen = () => (
  <View style={styles.container}>
    <Logo width={100} height={100} />
    <Text style={styles.text}>Paathner</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 20 }
});

export default SplashScreen;