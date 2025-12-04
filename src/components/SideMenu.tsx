import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

const SideMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <Modal visible={isOpen} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={onClose} style={styles.close}><X size={24} color="black" /></TouchableOpacity>
        <Text style={styles.item}>Home</Text>
        <Text style={styles.item}>Profile</Text>
        <Text style={styles.item}>Settings</Text>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  menu: { width: '70%', height: '100%', backgroundColor: 'white', padding: 20 },
  close: { alignSelf: 'flex-end', marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 16, fontWeight: '500' }
});

export default SideMenu;