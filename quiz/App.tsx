import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './src/components/Home';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <View className="flex-1 items-center bg-white">
        <Home />
      </View>
    </QueryClientProvider>
  );
}
