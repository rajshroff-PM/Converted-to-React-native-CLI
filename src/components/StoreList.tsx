import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Store } from '../types';
import { ICON_MAP } from '../constants';
import { MapPin, Clock, Navigation, DoorOpen, LogOut, X, ChevronUp } from 'lucide-react-native';

interface StoreListProps {
  stores: Store[];
  onStoreSelect: (store: Store) => void;
  onNavigate: (store: Store) => void;
  onAddToTrip: (store: Store) => void;
  tripStoreIds: Set<string>;
  onFindNearest?: (type: 'entry' | 'exit') => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onStoreSelect, onNavigate, onFindNearest, isExpanded, onToggleExpand }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleExpand} style={styles.header}>
         <View style={styles.handle} />
         <View style={styles.headerContent}>
            <View>
               <Text style={styles.title}>Stores</Text>
               <Text style={styles.subtitle}>{stores.length} locations</Text>
            </View>
            {isExpanded ? (
               <TouchableOpacity onPress={onToggleExpand} style={styles.closeBtn}><X size={18} color="#666" /></TouchableOpacity>
            ) : (
               <View style={styles.expandHint}><Text style={styles.expandText}>View All</Text><ChevronUp size={12} color="#666" /></View>
            )}
         </View>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
         {stores.map((store) => {
            const IconComponent = ICON_MAP[store.iconName] || ICON_MAP['default'];
            return (
               <TouchableOpacity key={store.id} onPress={() => onStoreSelect(store)} style={styles.card}>
                  <View style={styles.cardHeader}>
                     <View style={[styles.iconContainer, { backgroundColor: store.color }]}>
                        <IconComponent size={24} color={store.color === '#FFFFFF' ? '#000' : '#FFF'} />
                     </View>
                     <View style={styles.cardInfo}>
                        <Text style={styles.storeName}>{store.name}</Text>
                        <Text style={styles.storeCategory}>{store.category}</Text>
                        <View style={styles.metaRow}>
                           <MapPin size={12} color="#066CE4" />
                           <Text style={styles.metaText}>{store.floor}</Text>
                           <Clock size={12} color="green" style={{ marginLeft: 8 }} />
                           <Text style={styles.metaText}>Open</Text>
                        </View>
                     </View>
                  </View>
                  <TouchableOpacity onPress={() => onNavigate(store)} style={styles.navBtn}>
                     <Navigation size={16} color="#066CE4" />
                     <Text style={styles.navText}>Navigate</Text>
                  </TouchableOpacity>
               </TouchableOpacity>
            );
         })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 16, backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  handle: { width: 40, height: 4, backgroundColor: '#DDD', borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  subtitle: { fontSize: 12, color: '#666' },
  closeBtn: { padding: 8, backgroundColor: '#F3F4F6', borderRadius: 16 },
  expandHint: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  expandText: { fontSize: 12, fontWeight: 'bold', color: '#666', marginRight: 4 },
  list: { padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EEE' },
  cardHeader: { flexDirection: 'row', marginBottom: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardInfo: { flex: 1 },
  storeName: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  storeCategory: { fontSize: 12, color: '#666', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#666', marginLeft: 4 },
  navBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF5FF', padding: 10, borderRadius: 12 },
  navText: { color: '#066CE4', fontWeight: 'bold', marginLeft: 8 }
});

export default StoreList;