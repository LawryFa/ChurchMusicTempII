import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { supabase, Song } from '../../lib/supabase';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchSongs();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  async function searchSongs() {
    const { data, error } = await supabase
      .from('music')
      .select('*')
      .or(`title.ilike.%${searchQuery}%,artist.ilike.%${searchQuery}%`);

    if (error) {
      console.error('Error searching songs:', error);
      return;
    }

    setSearchResults(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#b3b3b3" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs or artists"
          placeholderTextColor="#b3b3b3"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.public_id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem}>
            <Image
              source={{ uri: 'https://media.giphy.com/media/EwKfD3kAzUghvQiTuw/giphy.gif?cid=790b7611byjf7p35vlwm5hy4jqnbljajejiszzmi92qkqa9o&ep=v1_gifs_search&rid=giphy.gif&ct=g' }}
              style={styles.albumArt}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery.length > 0 ? 'No results found' : 'Search for your favorite music'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 44,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#d6dfee',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'black',
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  songInfo: {
    marginLeft: 12,
    flex: 1,
  },
  songTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  songArtist: {
    color: 'black',
    fontSize: 14,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: 'grey',
    fontSize: 16,
  },
});