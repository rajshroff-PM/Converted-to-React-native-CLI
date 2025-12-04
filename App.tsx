import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import Map from './src/components/Map';
import StoreList from './src/components/StoreList';
import ChatAssistant from './src/components/ChatAssistant';
import { MALL_STORES } from './src/constants';
import { Store } from './src/types';

const App = () => {
  const [currentFloor, setCurrentFloor] = useState("Ground");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isStoreSheetOpen, setIsStoreSheetOpen] = useState(false);

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
    setCurrentFloor(store.floor);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <Map 
          stores={MALL_STORES}
          selectedStore={selectedStore}
          currentFloor={currentFloor}
          onFloorChange={setCurrentFloor}
          onStoreSelect={handleStoreSelect}
          isNavigating={false}
          onStartGame={() => {}}
          onOpenAR={() => {}}
          userAvatar="glider"
        />
        
        <ChatAssistant onNavigate={handleStoreSelect} />
        
        {isStoreSheetOpen && (
           <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
              <StoreList 
                stores={MALL_STORES}
                onStoreSelect={handleStoreSelect}
                onNavigate={handleStoreSelect}
                onAddToTrip={() => {}}
                tripStoreIds={new Set()}
                isExpanded={true}
                onToggleExpand={() => setIsStoreSheetOpen(false)}
              />
           </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;