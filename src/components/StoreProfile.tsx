import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Store } from '../types';
import { X } from 'lucide-react-native';

const StoreProfile = ({ store, onClose }: { store: Store, onClose: () => void }) => (
  <View style={styles.container}>
    <Image source={{ uri: store.image }} style={styles.image} />
    <TouchableOpacity onPress={onClose} style={styles.close}><X size={24} color="white" /></TouchableOpacity>
    <View style={styles.content}>
      <Text style={styles.name}>{store.name}</Text>
      <Text style={styles.desc}>{store.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  image: { width: '100%', height: 150 },
  close: { position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12, padding: 4 },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 14, color: '#666' }
});

export default StoreProfile;