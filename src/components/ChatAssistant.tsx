import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { Bot, X, Send, Sparkles } from 'lucide-react-native';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Store } from '../types';

interface ChatAssistantProps {
  onNavigate?: (store: Store) => void;
  showIcon?: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onNavigate, showIcon = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'init', role: 'model', text: 'Hello! I am your Amanora Mall assistant.' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    const response = await sendMessageToGemini(input);
    const modelMsg: ChatMessage = { id: (Date.now()+1).toString(), role: 'model', text: response.text, relatedStore: response.relatedStore };
    setMessages(prev => [...prev, modelMsg]);
  };

  return (
    <>
      {showIcon && !isOpen && (
        <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.fab}>
           <Bot size={24} color="white" />
        </TouchableOpacity>
      )}

      <Modal visible={isOpen} animationType="slide" transparent={true}>
         <View style={styles.modalContainer}>
            <View style={styles.chatWindow}>
               <View style={styles.header}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Bot size={20} color="white" />
                     <Text style={styles.headerTitle}>AI Assistant</Text>
                  </View>
                  <TouchableOpacity onPress={() => setIsOpen(false)}><X size={20} color="white" /></TouchableOpacity>
               </View>
               
               <ScrollView style={styles.messages} contentContainerStyle={{ padding: 16 }}>
                  {messages.map(msg => (
                     <View key={msg.id} style={[styles.msgBubble, msg.role === 'user' ? styles.userMsg : styles.modelMsg]}>
                        <Text style={[styles.msgText, msg.role === 'user' ? { color: 'black' } : { color: 'white' }]}>{msg.text}</Text>
                        {msg.relatedStore && onNavigate && (
                           <TouchableOpacity onPress={() => { setIsOpen(false); onNavigate(msg.relatedStore!); }} style={styles.navBtn}>
                              <Text style={styles.navBtnText}>Navigate to {msg.relatedStore.name}</Text>
                           </TouchableOpacity>
                        )}
                     </View>
                  ))}
               </ScrollView>

               <View style={styles.inputArea}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Type a message..." 
                    placeholderTextColor="#999"
                    value={input}
                    onChangeText={setInput}
                  />
                  <TouchableOpacity onPress={handleSend} style={styles.sendBtn}><Send size={20} color="white" /></TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#EC4899', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  chatWindow: { height: '60%', backgroundColor: '#1F2937', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#EC4899', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  headerTitle: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  messages: { flex: 1 },
  msgBubble: { padding: 12, borderRadius: 16, marginBottom: 8, maxWidth: '80%' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: 'white' },
  modelMsg: { alignSelf: 'flex-start', backgroundColor: '#374151' },
  msgText: { fontSize: 14 },
  navBtn: { marginTop: 8, backgroundColor: '#EC4899', padding: 8, borderRadius: 8 },
  navBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  inputArea: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: '#374151' },
  input: { flex: 1, backgroundColor: '#374151', borderRadius: 20, paddingHorizontal: 16, color: 'white' },
  sendBtn: { width: 40, height: 40, backgroundColor: '#EC4899', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }
});

export default ChatAssistant;