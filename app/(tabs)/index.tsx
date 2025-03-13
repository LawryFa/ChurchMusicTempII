import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Calendar, Users, BookOpen } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#4f46e5']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.churchName}>Grace Community Church</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActions}>
          <View style={styles.actionCard}>
            <Bell color="#6366f1" size={24} />
            <Text style={styles.actionText}>Announcements</Text>
          </View>
          <View style={styles.actionCard}>
            <Calendar color="#6366f1" size={24} />
            <Text style={styles.actionText}>Events</Text>
          </View>
          <View style={styles.actionCard}>
            <Users color="#6366f1" size={24} />
            <Text style={styles.actionText}>Members</Text>
          </View>
          <View style={styles.actionCard}>
            <BookOpen color="#6366f1" size={24} />
            <Text style={styles.actionText}>Newsletters</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <View style={styles.newsCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1438032005730-c779502df39b' }}
              style={styles.newsImage}
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>Sunday Service Highlights</Text>
              <Text style={styles.newsDate}>January 21, 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>25</Text>
              <Text style={styles.eventMonth}>JAN</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>Prayer Meeting</Text>
              <Text style={styles.eventTime}>7:00 PM - 8:30 PM</Text>
            </View>
          </View>
        </View>
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
    height: 200,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    opacity: 0.9,
  },
  churchName: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -40,
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 4,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    color: '#1f2937',
    fontSize: 14,
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
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  newsDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventDate: {
    alignItems: 'center',
    marginRight: 16,
  },
  eventDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  eventMonth: {
    fontSize: 14,
    color: '#6b7280',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eventTime: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});