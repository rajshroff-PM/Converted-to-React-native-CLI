import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = () => (
  <View style={styles.container}>
    <Text style={styles.text}>User Profile Placeholder</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  text: { fontSize: 20 }
});

export default UserProfile;