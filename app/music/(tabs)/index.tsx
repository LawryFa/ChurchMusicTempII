import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { supabase, Song } from '../../lib/supabase';
import { MusicPlayer } from '../../components/MusicPlayer';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchSongs();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  async function fetchSongs() {
    const { data, error } = await supabase
      .from('music')
      .select('*');
    
    if (error) {
      console.error('Error fetching songs:', error);
      return;
    }

    setSongs(data);
  }

  async function handlePlayPause() {
    if (!sound || !currentSong) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  }

  async function playSong(song: Song) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.secure_url },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
        }
      });
    } catch (error) {
      console.error('Error playing song:', error);
    }
  }

  function handleNext() {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.public_id === currentSong.public_id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    playSong(nextSong);
  }

  function handlePrevious() {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.public_id === currentSong.public_id);
    const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    playSong(previousSong);
  }

  const renderSongItem = ({ item, index }: { item: Song; index: number }) => (
    <TouchableOpacity
      style={[
      styles.songItem,
      currentSong?.public_id === item.public_id && styles.activeSongItem
      ]}
      onPress={() => playSong(item)}>
      <Image
      source={{ uri: 'https://media.giphy.com/media/EwKfD3kAzUghvQiTuw/giphy.gif?cid=790b7611byjf7p35vlwm5hy4jqnbljajejiszzmi92qkqa9o&ep=v1_gifs_search&rid=giphy.gif&ct=g' }}
      style={styles.albumArt}
      />
      <View style={styles.songInfo}>
      <Text style={[
      styles.songTitle,
      currentSong?.public_id === item.public_id && styles.activeSongTitle
      ]}>
      {item.title}
      </Text>
      <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      {currentSong?.public_id === item.public_id && (
      <View style={styles.nowPlayingIndicator}>
      <Text style={styles.nowPlayingText}>Now Playing</Text>
      </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rainbow Music App</Text>
        <Text style={styles.subtitle}>{songs.length} songs</Text>
      </View>
      
      <FlatList
        data={songs}
        keyExtractor={(item) => item.public_id}
        renderItem={renderSongItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {currentSong && (
        <BlurView intensity={80} tint="light" style={styles.playerContainer}>
          <MusicPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4a6fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a6fff',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  songItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  activeSongItem: {
    backgroundColor: '#f8f9ff',
    borderColor: '#e6e8ff',
    borderWidth: 1,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    marginLeft: 16,
    flex: 1,
  },
  songTitle: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  activeSongTitle: {
    color: '#4a6fff',
  },
  songArtist: {
    color: '#666666',
    fontSize: 14,
    marginTop: 4,
  },
  separator: {
    height: 8,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  nowPlayingIndicator: {
    backgroundColor: '#4a6fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  nowPlayingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});