import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Store, Friend, AvatarId, ParkingZone, SavedVehicle } from '../types';
import { MALL_GEOJSON, ICON_MAP, FLOORS, AVATAR_CONFIG } from '../constants';
import { Navigation, Plus, Minus, Activity, Scan, Maximize2, Minimize2 } from 'lucide-react-native';
import Logo from './Logo';

interface MapProps {
  stores: Store[];
  selectedStore: Store | null;
  isNavigating: boolean;
  currentFloor: string;
  onFloorChange: (floor: string) => void;
  onStoreSelect: (store: Store) => void;
  onStartGame: () => void;
  onOpenAR: () => void;
  friends?: Friend[];
  selectedFriend?: Friend | null; 
  userAvatar: AvatarId;
  parkingZones?: ParkingZone[];
  savedLocations?: SavedVehicle[];
  selectedZone?: ParkingZone | null;
  isDarkMode?: boolean;
  onToggleFullScreen?: () => void;
  isFullScreen?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Map: React.FC<MapProps> = ({ 
  stores, selectedStore, currentFloor, onFloorChange, onStoreSelect, onOpenAR, friends = [], selectedFriend, userAvatar, parkingZones = [], isDarkMode = true, onToggleFullScreen, isFullScreen = false
}) => {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showFloorList, setShowFloorList] = useState(false);

  const isParkingFloor = currentFloor === 'P1' || currentFloor === 'P2';

  const floorStores = useMemo(() => {
    if (isParkingFloor) return [];
    return stores.filter(s => s.floor === currentFloor);
  }, [stores, currentFloor, isParkingFloor]);

  const visibleFriends = useMemo(() => {
    return friends.filter(f => f.isSharing && f.floor === currentFloor);
  }, [friends, currentFloor]);

  const geoJsonToPath = (coordinates: number[][][]) => {
    return coordinates.map(ring => {
      return ring.map((point, i) => 
        `${i === 0 ? 'M' : 'L'}${point[0]},${point[1]}`
      ).join(' ') + ' Z';
    }).join(' ');
  };

  const getStoreForUnit = (coordinates: number[][][]): Store | undefined => {
    const points = coordinates[0];
    const cx = points.reduce((sum, p) => sum + p[0], 0) / points.length;
    const cy = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    return floorStores.find(s => {
      const dx = s.position.x - cx;
      const dy = s.position.y - cy;
      return Math.sqrt(dx*dx + dy*dy) < 50;
    });
  };

  const bgColor = isDarkMode ? '#111827' : '#F3F4F6';
  const boundaryFill = isParkingFloor ? (isDarkMode ? "#111827" : "#374151") : (isDarkMode ? "#1E1E1E" : "#ffffff");
  const boundaryStroke = isParkingFloor ? (isDarkMode ? "#374151" : "#4b5563") : (isDarkMode ? "#333" : "#e5e7eb");

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.mapContainer}>
        <Svg width={1000} height={1000} viewBox="0 0 1000 1000" style={{ transform: [{ scale }, { translateX }, { translateY }] }}>
          <Defs>
             {showHeatmap && <RadialGradient id="heat" cx="50%" cy="50%" rx="50%" ry="50%"><Stop offset="0" stopColor="red" stopOpacity="0.5"/><Stop offset="1" stopColor="red" stopOpacity="0"/></RadialGradient>}
          </Defs>

          {MALL_GEOJSON.features.filter(f => f.properties.type === 'boundary').map((feature, index) => (
             <Path 
                key={`boundary-${index}`}
                d={geoJsonToPath(feature.geometry.coordinates)}
                fill={boundaryFill}
                stroke={boundaryStroke}
                strokeWidth="20"
              />
          ))}
          
          {!isParkingFloor && MALL_GEOJSON.features.filter(f => f.properties.type === 'unit').map((feature, index) => {
              const storeInUnit = getStoreForUnit(feature.geometry.coordinates);
              const isSelected = selectedStore?.id === storeInUnit?.id;
              const fill = isSelected ? '#EC4899' : (storeInUnit ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') : 'transparent');
              
              return (
                  <Path
                    key={`unit-${index}`}
                    d={geoJsonToPath(feature.geometry.coordinates)}
                    fill={fill}
                    stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                    strokeWidth="1"
                    onPress={() => storeInUnit && onStoreSelect(storeInUnit)}
                  />
              );
          })}

          {/* Store Icons Overlay */}
          {!isParkingFloor && floorStores.map((store) => {
             const IconComponent = ICON_MAP[store.iconName] || ICON_MAP['default'];
             return (
                <View 
                  key={store.id}
                  style={{ position: 'absolute', left: store.position.x - 20, top: store.position.y - 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                >
                   <View style={{ backgroundColor: store.color, borderRadius: 20, padding: 5 }}>
                      <IconComponent size={20} color="#FFF" />
                   </View>
                </View>
             );
          })}
        </Svg>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
         <TouchableOpacity onPress={() => setShowFloorList(!showFloorList)} style={styles.floorBtn}>
            <Text style={styles.floorText}>{currentFloor === 'Ground' ? 'G' : currentFloor.split(' ')[0]}</Text>
         </TouchableOpacity>
         {showFloorList && (
            <View style={styles.floorList}>
               {FLOORS.slice().reverse().map(f => (
                  <TouchableOpacity key={f} onPress={() => { onFloorChange(f); setShowFloorList(false); }} style={styles.floorItem}>
                     <Text style={styles.floorItemText}>{f}</Text>
                  </TouchableOpacity>
               ))}
            </View>
         )}
         <TouchableOpacity onPress={() => setScale(s => Math.min(s + 0.5, 4))} style={styles.controlBtn}><Plus size={20} color="#000" /></TouchableOpacity>
         <TouchableOpacity onPress={() => setScale(s => Math.max(s - 0.5, 0.5))} style={styles.controlBtn}><Minus size={20} color="#000" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  mapContainer: { flex: 1 },
  controls: { position: 'absolute', right: 16, top: 100, alignItems: 'flex-end', gap: 8 },
  floorBtn: { width: 40, height: 40, backgroundColor: '#066CE4', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  floorText: { color: 'white', fontWeight: 'bold' },
  floorList: { backgroundColor: 'white', padding: 8, borderRadius: 12, position: 'absolute', right: 50, top: 0, elevation: 5 },
  floorItem: { padding: 8 },
  floorItemText: { color: 'black', fontSize: 12 },
  controlBtn: { width: 40, height: 40, backgroundColor: 'white', borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 2 },
});

export default Map;