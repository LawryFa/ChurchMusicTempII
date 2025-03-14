import { Tabs, useRouter } from 'expo-router';
import { Chrome as Home, Search, Library, HomeIcon, ArrowLeft, Music2Icon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 2 }}>

          <HomeIcon size={20} color="blue" />
          </TouchableOpacity>

        ),
        tabBarStyle: {
          backgroundColor: "#09b5e0",
          borderTopColor: '#282828',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#c0c0e0',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Songs',
          tabBarIcon: ({ size, color }) => <Music2Icon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Your Library',
          tabBarIcon: ({ size, color }) => <Library size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}