import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Paathner</Text>
    <TouchableOpacity onPress={onLogin} style={styles.btn}>
      <Text style={styles.btnText}>Login</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827' },
  title: { fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 32 },
  btn: { backgroundColor: '#066CE4', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: 'bold' }
});

export default LoginScreen;