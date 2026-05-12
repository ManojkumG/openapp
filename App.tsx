import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { CormorantGaramond_400Regular_Italic } from '@expo-google-fonts/cormorant-garamond';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { type JSX } from 'react';
import { StyleSheet, View } from 'react-native';

import AuthScreen from './src/screens/AuthScreen';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_400Regular_Italic,
    JetBrainsMono_500Medium,
  });

  if (!fontsLoaded) {
    return <View style={styles.safeArea} />;
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar hidden />
      <AuthScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5efe3',
    flex: 1,
    height: '100%',
    minHeight: '100%',
  },
});
