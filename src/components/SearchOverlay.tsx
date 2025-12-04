import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchOverlay = () => (
  <View style={styles.container}>
    <TextInput style={styles.input} placeholder="Search..." />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
  input: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8 }
});

export default SearchOverlay;