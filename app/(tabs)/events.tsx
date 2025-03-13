import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, Users } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'worship', name: 'Worship' },
    { id: 'prayer', name: 'Prayer' },
    { id: 'youth', name: 'Youth' },
    { id: 'community', name: 'Community' },
  ];

  const events = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: 'January 28, 2024',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      category: 'worship',
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b',
      attendees: 120,
    },
    {
      id: 2,
      title: 'Youth Night',
      date: 'January 29, 2024',
      time: '6:30 PM - 8:30 PM',
      location: 'Youth Center',
      category: 'youth',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94',
      attendees: 45,
    },
    {
      id: 3,
      title: 'Prayer Meeting',
      date: 'January 30, 2024',
      time: '7:00 PM - 8:00 PM',
      location: 'Prayer Room',
      category: 'prayer',
      image: 'https://images.unsplash.com/photo-1514894780887-121968d00567',
      attendees: 25,
    },
    {
      id: 4,
      title: 'Community Outreach',
      date: 'February 3, 2024',
      time: '9:00 AM - 2:00 PM',
      location: 'Downtown Area',
      category: 'community',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b',
      attendees: 75,
    },
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#4f46e5']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Church Events</Text>
          <Text style={styles.headerSubtitle}>Join us in worship and fellowship</Text>
        </View>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.eventsContainer}>
        {filteredEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.eventGradient}>
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Calendar size={16} color="#fff" />
                    <Text style={styles.eventDetailText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Clock size={16} color="#fff" />
                    <Text style={styles.eventDetailText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <MapPin size={16} color="#fff" />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Users size={16} color="#fff" />
                    <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
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
    height: 180,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 8,
  },
  categoriesContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  eventsContainer: {
    padding: 16,
  },
  eventCard: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  eventContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  eventTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    color: '#fff',
    fontSize: 14,
  },
});