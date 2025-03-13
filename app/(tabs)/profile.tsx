import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Settings,
  Bell,
  User,
  Heart,
  Calendar,
  Users,
  Phone,
  Mail,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const menuItems = [
    {
      title: 'My Donations',
      icon: Heart,
      color: '#ec4899',
      count: '12',
    },
    {
      title: 'My Events',
      icon: Calendar,
      color: '#8b5cf6',
      count: '3',
    },
    {
      title: 'Prayer Group',
      icon: Users,
      color: '#06b6d4',
      count: '5',
    },
  ];

  const settingsItems = [
    {
      title: 'Account Settings',
      icon: User,
      color: '#6366f1',
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: '#f59e0b',
      toggle: true,
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      title: 'Email Updates',
      icon: Mail,
      color: '#10b981',
      toggle: true,
      value: emailUpdates,
      onValueChange: setEmailUpdates,
    },
    {
      title: 'Privacy',
      icon: Shield,
      color: '#6366f1',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#4f46e5']}
        style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Sarah Johnson</Text>
          <Text style={styles.role}>Worship Team Leader</Text>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Phone size={16} color="#fff" />
              <Text style={styles.contactText}>+1 (555) 123-4567</Text>
            </View>
            <View style={styles.contactItem}>
              <Mail size={16} color="#fff" />
              <Text style={styles.contactText}>sarah.j@email.com</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <item.icon size={24} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                {item.count && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.settingsItem, index === 0 && styles.settingsItemFirst]}>
                <View style={styles.settingsItemLeft}>
                  <View style={[styles.settingsIcon, { backgroundColor: `${item.color}15` }]}>
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text style={styles.settingsTitle}>{item.title}</Text>
                </View>
                {item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{ false: '#d1d5db', true: '#818cf8' }}
                    thumbColor={item.value ? '#6366f1' : '#f4f4f5'}
                  />
                ) : (
                  <ChevronRight size={20} color="#9ca3af" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 16,
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 14,
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  settingsItemFirst: {
    borderTopWidth: 0,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsTitle: {
    fontSize: 16,
    color: '#1f2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});