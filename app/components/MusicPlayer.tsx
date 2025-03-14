import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Download } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { Song } from '../lib/supabase';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MusicPlayer({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }: MusicPlayerProps) {
  if (!currentSong) return null;

  const handleDownload = async () => {
    if (Platform.OS === 'web') {
      // For web, create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = currentSong.secure_url;
      link.download = `${currentSong.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.songInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPrevious}>
          <SkipBack size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
          {isPlaying ? (
            <Pause size={24} color="#fff" />
          ) : (
            <Play size={24} color="#fff" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onNext}>
          <SkipForward size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Download size={24} color="#1DB954" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: 'rgba(30, 27, 235, 0.67)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  songInfo: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(29, 185, 185, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    marginLeft: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    borderRadius: 20,
  },
});