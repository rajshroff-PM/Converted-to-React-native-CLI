import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ARView = ({ onClose }: { onClose: () => void }) => (
  <View style={styles.container}>
    <Text style={styles.text}>AR View Placeholder</Text>
    <Text onPress={onClose} style={styles.close}>Close</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white' },
  close: { color: 'red', marginTop: 20 }
});

export default ARView;