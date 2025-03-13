import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Search, Bell, Settings } from 'lucide-react-native';

export default function ChatScreen() {
  const [message, setMessage] = useState('');

  const channels = [
    { id: 1, name: 'General', unread: 3 },
    { id: 2, name: 'Prayer Requests', unread: 1 },
    { id: 3, name: 'Announcements', unread: 0 },
    { id: 4, name: 'Youth Group', unread: 5 },
    { id: 5, name: 'Worship Team', unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      message: 'Looking forward to the prayer meeting tonight! 🙏',
      time: '2:30 PM',
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      },
      message: 'Can someone share the worship songs list for Sunday?',
      time: '2:25 PM',
    },
    {
      id: 3,
      user: {
        name: 'Emily Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      },
      message: 'The youth event was amazing! Thank you all for coming.',
      time: '2:20 PM',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient
        colors={['#6366f1', '#4f46e5']}
        style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Church Chat</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Search color="#6b7280" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#6b7280"
          />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.channelsContainer}>
          {channels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={[styles.channelButton, channel.id === 1 && styles.channelButtonActive]}>
              <Text
                style={[
                  styles.channelButtonText,
                  channel.id === 1 && styles.channelButtonTextActive,
                ]}>
                {channel.name}
              </Text>
              {channel.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{channel.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.messagesContainer}>
          {messages.map((msg) => (
            <View key={msg.id} style={styles.messageCard}>
              <Image source={{ uri: msg.user.avatar }} style={styles.avatar} />
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.userName}>{msg.user.name}</Text>
                  <Text style={styles.messageTime}>{msg.time}</Text>
                </View>
                <Text style={styles.messageText}>{msg.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#6b7280"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  content: {
    flex: 1,
  },
  channelsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  channelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelButtonActive: {
    backgroundColor: '#6366f1',
  },
  channelButtonText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '600',
  },
  channelButtonTextActive: {
    color: '#fff',
  },
  unreadBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#6366f1',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});